import java.text.SimpleDateFormat
import groovy.json.JsonSlurper

pipeline{

agent none
  environment {
    def mybuildverison = getBuildVersion(env.BUILD_NUMBER)
    def projektname = "ngnix-dns-reg-app"
    def registry = "192.168.233.1:5000/ngnix-dns-reg-app"
    def dns = "ngdns-app.youthclubstage.de"
    def dnsblue = "ngdns-app-blue.youthclubstage.de"
    def port = "80"
  }


stages{
       stage('docker build')
       {
          agent {
               label 'master'
           }
           steps{
            script{
                if (env.BRANCH_NAME == 'master') {
               dockerImage = docker.build registry + ":$mybuildverison"
               dockerImage.push()
               }
              }
           }
       }

       stage('Docker deploy'){
                 agent {
                      label 'master'
                  }
                  steps{



                   script{
                      if (env.BRANCH_NAME == 'master') {
                        dockerDeploy(mybuildverison,projektname,dns,dnsblue,port)
                      }

                     }
                   }
       }
   }
     post {
       failure {
         script{
           sh "docker stack rm $projektname-$mybuildverison"
         }
       }
     }
}

def getBuildVersion(String buildnr){
    def dateFormat = new SimpleDateFormat("yyyyMMddHHmm")
    def date = new Date()
    return dateFormat.format(date)+buildnr
}

def dockerDeploy(String mybuildverison, String projektname, String dns, String dnsblue, String port){
                      sh "mkdir -p target"
                      sh "cat docker-compose-template.yml | sed -e 's/{version}/"+"$mybuildverison"+"/g' >> target/docker-compose.yml"
                      def version = sh (
                          script: 'docker stack ls |grep '+projektname+'| cut -d \" \" -f1',
                          returnStdout: true
                      ).trim()
                      //sh "docker stack rm "+version
                      sh "docker stack deploy --compose-file target/docker-compose.yml "+projektname+"-"+"$mybuildverison"

                      sleep 240 // second

                      //sh "curl -d \'{\"source\": \""+dnsblue+"\",\"target\": \""+projektname+"-$mybuildverison"+":80\"}\' -H \"Content-Type: application/json\" -X POST http://192.168.233.1:9099/v1/dns"
                      def id = health(dnsblue,projektname+"-$mybuildverison"+":80")
                      sleep 10 // second

                      //Health blue

                      retry (3) {
                          sleep 5
                          httpRequest url:"https://$dnsblue", validResponseCodes: '200'
                      }


                      //Green
                      sh "curl -d \'{\"source\": \""+dns+"\",\"target\": \""+projektname+"-$mybuildverison"+":80\"}\' -H \"Content-Type: application/json\" -X POST http://192.168.233.1:9099/v1/dns"
                      sleep 10 // second

                      //Health green2

                      retry (3) {
                          sleep 5
                          httpRequest url:"https://$dns", validResponseCodes: '200'
                      }

                      if(version != "")
                      {
                        sh "docker stack rm "+version
                      }
}

def health(url, target){
  def context = """
    {"source": "$url",
    "target": "$target"}
  """
   
   retry (3) {
    sleep 5
    def response = httpRequest acceptType: 'APPLICATION_JSON_UTF8', contentType: 'APPLICATION_JSON_UTF8', httpMode: 'POST', requestBody: context, url: "http://192.168.233.1:9099/v1/dns", validResponseCodes: '200'
       def json = new JsonSlurper().parseText(response.content)
       echo "Status: ${response.status}"
       echo "ID: ${json}"
       return json.id
   }

}