import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { RouterModule } from '@angular/router';
import { CountriesComponent } from './countries/countries.component';
import { IndexComponent } from './index/index.component';
import { HttpClientModule } from '@angular/common/http';
import { CountryDetailsComponent } from './country-details/country-details.component';


@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    CountriesComponent,
    IndexComponent,
    CountryDetailsComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: IndexComponent },
      { path: 'countries', component: CountriesComponent },
      { path: 'countries/:cca2', component: CountryDetailsComponent },
      
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
