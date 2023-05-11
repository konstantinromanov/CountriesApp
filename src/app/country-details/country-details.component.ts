import { Component } from '@angular/core';
import { CountriesService } from '../countries.service';
import { ActivatedRoute } from '@angular/router';
import { Country } from '../models/country.model';
import { Observable } from 'rxjs';
import { ScrollService } from '../scroll.service';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.css'],
})
export class CountryDetailsComponent {

  country$!: Observable<Country>;

  constructor(
    private route: ActivatedRoute,
    private countriesService: CountriesService,
    private scrollService: ScrollService
  ) { }

  ngOnInit(){

    this.scrollService.init();
    const routeParams = this.route.snapshot.paramMap;
    const countryIdFromRoute = routeParams.get('cca2') as string;
    const country = this.countriesService.getCountryByCode(countryIdFromRoute);
    this.country$ = country;    
  }

  currenciesToString(currencies: { [key: string]: any }): string {

    const result = Object.keys(currencies).map(key => {

      const currency = currencies[key];

      return `${currency.name} (${currency.symbol || key})`;
      
    }).join(', ');

    return result;
  }

  languagesToString(languages: { [key: string]: any }): string {

    const result = Object.keys(languages).map(key => {
      const language = languages[key];
      return `${language}`;      
    }).join(', ');

    return result;
  }

  handleIddClick() {
    
    this.country$.subscribe(country => {
      const suffixes = country.idd.suffixes.join(", ");
      const message = `root: ${country.idd.root}\n suffixes: ${suffixes}`;
      alert(message);
    });
  }
}
