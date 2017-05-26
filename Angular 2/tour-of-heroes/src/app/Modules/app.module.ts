// imports Angular Dependencies
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // < ---- NgModel lives here
import { HttpModule } from '@angular/http';


// Until there is a webserver that can handle the requests for data,
// the HTTP client will fetch and save data from a mock service (the in-memory web API)
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from '../Services/in-memory-data.service';


import { AppRoutingModule } from './app-routing.module'

// imports Components so that their selectors can be resolved
import { HeroDetailComponent } from '../Components/hero-detail.component';
import { HeroesComponent } from '../Components/heroes.component';
import { AppComponent }  from '../Components/app.component';
import { DashboardComponent } from '../Components/dashboard.component';
import { HeroSearchComponent } from '../Components/hero-search.component';



// imports Service because its data is used throughout the application
import { HeroService } from '../Services/hero.service';


// @NgModule has an imports array that contains the list of external Modules used.
@NgModule({
  imports:      [
  	BrowserModule, // < ----- Every application needs to import this to run in a browser
  	FormsModule, // < ---- import the FormsModule before binding with [(ngModel)]
    AppRoutingModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    ],
  declarations: [ 
  	AppComponent,
    DashboardComponent,
  	HeroesComponent,
  	HeroDetailComponent,    // < ---- The applications components/directives/pipe are declared here
  	HeroSearchComponent,
    ],
  bootstrap:    [ AppComponent ],// < ----- The root component that Angular creates and inserts into the index.html host web page
  providers: [HeroService], // < -- Defined in module because it will be used in every view
})

export class AppModule { }

