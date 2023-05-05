import { Component } from '@angular/core';
import { CountriesService } from '../countries.service';
import { ActivatedRoute } from '@angular/router';
import { Country } from '../models/country.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.css']
})
export class CountryDetailsComponent {

  country$!: Observable<Country>;

  constructor(
    private route: ActivatedRoute,
    private countriesService: CountriesService
  ) { }

  ngOnInit(){

    const routeParams = this.route.snapshot.paramMap;
    const countryIdFromRoute = routeParams.get('cca2') as string;
    const country = this.countriesService.getCountryByCode(countryIdFromRoute);
    this.country$ = country;    
  }
}
