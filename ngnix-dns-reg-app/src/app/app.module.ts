import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouteListComponent } from './route-list/route-list.component';
import { RouteAddComponent } from './route-add/route-add.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatTableModule,
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatListModule,
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import { MainpageComponent } from './mainpage/mainpage.component';


@NgModule({
  declarations: [
    AppComponent,
    RouteListComponent,
    RouteAddComponent,
    MainpageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTableModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatDividerModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
