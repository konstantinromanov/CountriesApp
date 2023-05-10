import { Component } from '@angular/core';
import { CountriesService } from '../countries.service';
import { Observable } from 'rxjs';
import { Country } from '../models/country.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faCoffee, faCaretUp, faCaretDown, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent {

  filterTermName!: string;
  filterTermRegion: string = "";
  filterTermSubRegion: string = "";
  filterTermContinent: string = "";
  countries$!: Observable<Country[]>;
  filter_form: FormGroup;
  faCoffee = faCoffee;
  faCaretUp = faCaretUp;
  faCaretDown = faCaretDown;
  faTimes = faTimes;
  isAscending = true;
  
  constructor(
    private countriesService: CountriesService, 
    private activatedRoute: ActivatedRoute,
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
    this.countries$ = this.countriesService.getCountriesBySearch(this.filterTermName, this.filterTermRegion, this.filterTermSubRegion, this.filterTermContinent);  
    
  }

  clearFilter(){

  }

  sortByName(){

    if(this.isAscending){
      this.countriesService.sortByNameAscending();
    } else {
      this.countriesService.sortByNameDescending();
    }
    
    this.countries$ = this.countriesService.getCountriesBySearch(this.filterTermName, this.filterTermRegion, this.filterTermSubRegion, this.filterTermContinent);  
    this.isAscending = this.countriesService.isAscending;
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


  goToDetails(countryCode: string){
    this.router.navigate(['/countries', countryCode]);
  }
}
