import { Component } from '@angular/core';
import { CountriesService } from '../countries.service';
import { Observable } from 'rxjs';
import { Country } from '../models/country.model';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faCoffee, faCaretUp, faCaretDown, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent {

  filterTermName: string = "";
  filterTermRegion: string = "";
  filterTermSubRegion: string = "";
  filterTermContinent: string = "";
  countries$!: Observable<Country[]>;
  filter_form: FormGroup;
  faCoffee = faCoffee;
  faCaretUp = faCaretUp;
  faCaretDown = faCaretDown;
  faTimes = faTimes;
  isAscendingName = true;
  isAscendingRegion = true;
  isAscendingSubRegion = true;
  isAscendingContinent = true;
  
  constructor(
    private countriesService: CountriesService,     
    private router: Router,
    private fb: FormBuilder){

      this.filter_form = fb.group({
        'countryName': [
          null, Validators.compose(
            [
              Validators.maxLength(15),
              Validators.pattern('^[a-zA-Z ]*$')
            ])
        ],     
        'countryRegion': [
          null, Validators.compose(
            [
              Validators.maxLength(15),
              Validators.pattern('^[a-zA-Z ]*$')
            ])
        ],    
        'countrySubRegion': [
          null, Validators.compose(
            [
              Validators.maxLength(15),
              Validators.pattern('^[a-zA-Z ]*$')
            ])
        ],   
        'countryContinent': [
          null, Validators.compose(
            [
              Validators.maxLength(15),
              Validators.pattern('^[a-zA-Z ]*$')
            ])
        ],       
      });

      this.filter_form.get('countryName')?.setValue(this.countriesService.lastNameTerm);
      this.filter_form.get('countryRegion')?.setValue(this.countriesService.lastRegionTerm);
      this.filter_form.get('countrySubRegion')?.setValue(this.countriesService.lastSubRegionTerm);
      this.filter_form.get('countryContinent')?.setValue(this.countriesService.lastContinentTerm);
    }

  ngOnInit(){   

    this.filterTermName = this.countriesService.lastNameTerm;  
    this.filterTermRegion = this.countriesService.lastRegionTerm;
    this.filterTermSubRegion = this.countriesService.lastSubRegionTerm;
    this.filterTermContinent = this.countriesService.lastContinentTerm;
    this.countries$ = this.countriesService.getCountriesBySearch(this.filterTermName, this.filterTermRegion, this.filterTermSubRegion, this.filterTermContinent);      
  }

  sortByName(){

    if(this.isAscendingName){
      this.countriesService.sortByNameAscending();
    } else {
      this.countriesService.sortByNameDescending();
    }
    
    this.countries$ = this.countriesService.getCountriesBySearch(this.filterTermName, this.filterTermRegion, this.filterTermSubRegion, this.filterTermContinent);  
    this.isAscendingName = this.countriesService.isAscendingName;
  }

  sortByRegion() {

    if(this.isAscendingRegion){
      this.countriesService.sortByRegionAscending();
    } else {
      this.countriesService.sortByRegionDescending();
    }
    
    this.countries$ = this.countriesService.getCountriesBySearch(this.filterTermName, this.filterTermRegion, this.filterTermSubRegion, this.filterTermContinent);  
    this.isAscendingRegion = this.countriesService.isAscendingRegion;
  }

  sortBySubRegion() {

    if(this.isAscendingSubRegion){
      this.countriesService.sortBySubRegionAscending();
    } else {
      this.countriesService.sortBySubRegionDescending();
    }
    
    this.countries$ = this.countriesService.getCountriesBySearch(this.filterTermName, this.filterTermRegion, this.filterTermSubRegion, this.filterTermContinent);  
    this.isAscendingSubRegion = this.countriesService.isAscendingSubRegion;
  }

  sortByContinent() {

    if (this.isAscendingContinent) {
      this.countriesService.sortByContinentAscending();
    } else {
      this.countriesService.sortByContinentDescending();
    }
    
    this.countries$ = this.countriesService.getCountriesBySearch(this.filterTermName, this.filterTermRegion, this.filterTermSubRegion, this.filterTermContinent);  
    this.isAscendingContinent = this.countriesService.isAscendingContinent;
  }

  filterByName(countryName: string): void {
    this.filterTermName = countryName;
    this.countries$ = this.countriesService.getCountriesBySearch(this.filterTermName, this.filterTermRegion, this.filterTermSubRegion, this.filterTermContinent);
  }

  filterByRegion(countryRegion: string){
    console.log("reg: ");
    this.filterTermRegion = countryRegion;
    this.countries$ = this.countriesService.getCountriesBySearch(this.filterTermName, this.filterTermRegion, this.filterTermSubRegion, this.filterTermContinent);   
  }

  filterBySubRegion(countrySubRegion: string){
    this.filterTermSubRegion = countrySubRegion;
    this.countries$ = this.countriesService.getCountriesBySearch(this.filterTermName, this.filterTermRegion, this.filterTermSubRegion, this.filterTermContinent);   
  }

  filterByContinent(countryContinent: string){
    this.filterTermContinent = countryContinent;
    this.countries$ = this.countriesService.getCountriesBySearch(this.filterTermName, this.filterTermRegion, this.filterTermSubRegion, this.filterTermContinent);   
  }

  clearAllFilters(){
    this.filterTermName = "";
    this.filterTermRegion = "";
    this.filterTermSubRegion = "";
    this.filterTermContinent = "";
    this.filter_form.reset();
    this.countries$ = this.countriesService.getCountriesBySearch(this.filterTermName, this.filterTermRegion, this.filterTermSubRegion, this.filterTermContinent);       
  }

  goToDetails(countryCode: string){
    this.router.navigate(['/countries', countryCode]);
  } 
}
