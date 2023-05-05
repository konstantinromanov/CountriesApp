import { Component } from '@angular/core';
import { CountriesService } from '../countries.service';
import { Observable } from 'rxjs';
import { Country } from '../models/country.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent {

  searchTerm!: string;
  countries$!: Observable<Country[]>;

  constructor(private countriesService: CountriesService, private activatedRoute: ActivatedRoute){}

  ngOnInit(){   
    this.searchTerm = this.countriesService.searchTerm;
    this.countries$ = this.countriesService.getCountries();
  }

  filterByName(countryName: string): void {

    this.searchTerm = countryName;

    if (countryName.trim().length > 0 || countryName.trim().length == 0) {            
      this.countries$ = this.countriesService.getCountriesBySearch(countryName);
    }       
  }
}
