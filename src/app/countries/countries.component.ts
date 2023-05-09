import { Component } from '@angular/core';
import { CountriesService } from '../countries.service';
import { Observable } from 'rxjs';
import { Country } from '../models/country.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent {

  filterTermName!: string;
  filterTermRegion: string = "";
  countries$!: Observable<Country[]>;
  filter_form: FormGroup;
  
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
      });
    }

  ngOnInit(){   
    this.filterTermName = this.countriesService.lastSearchTerm;  
    this.filterTermRegion = this.countriesService.lastRegionTerm;
    this.countries$ = this.countriesService.getCountriesBySearch(this.filterTermName, this.filterTermRegion);  
    
  }

  filterByName(countryName: string): void {
    this.filterTermName = countryName;
    this.countries$ = this.countriesService.getCountriesBySearch(this.filterTermName, this.filterTermRegion);     
  }

  filterByRegion(countryRegion: string){
    this.filterTermRegion = countryRegion;
    this.countries$ = this.countriesService.getCountriesBySearch(this.filterTermName, this.filterTermRegion);   
  }

  goToDetails(countryCode: string){
    this.router.navigate(['/countries', countryCode]);
  }
}
