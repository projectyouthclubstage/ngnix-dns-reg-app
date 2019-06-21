import java.text.SimpleDateFormat
import groovy.json.JsonSlurper

pipeline{

agent none
  environment {
    def mybuildverison = getBuildVersion(env.BUILD_NUMBER)
    def projektname = env.JOB_NAME.replace("/master","").replace("projectyouthclubstage/","")
    def registry = "192.168.233.1:5000/${projektname}"
    def dns = "${projektname}.youthclubstage.de"
    def dnsblue = "${projektname}-blue.youthclubstage.de"
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
                      def id = registerUrl(dnsblue,projektname+"-$mybuildverison"+":80")
                      //Health blue
                      health("https://$dnsblue")
                      deleleUrl(id)

                      //Green
                      registerUrl(dns,projektname+"-$mybuildverison"+":80")
                      health("https://$dns")

                      if(version != "")
                      {
                        sh "docker stack rm "+version
                      }
}

def registerUrl(url, target){
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

def health(url){
  retry (3) {
    sleep 5
    httpRequest url:url, validResponseCodes: '200'
  }  

}

def deleleUrl(id){
   retry (3) {
    sleep 5
    httpRequest httpMode: 'DELETE', url: "http://192.168.233.1:9099/v1/dns/${id}", validResponseCodes: '201'
   }
}