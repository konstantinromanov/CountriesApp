import { Component } from '@angular/core';
import { CountriesService } from '../countries.service';
import { Observable } from 'rxjs';
import { Country } from '../models/country.model';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent {

  countries!: Observable<Country[]>;

  constructor(private countriesService: CountriesService){}

  ngOnInit(){
    //console.warn('Init', {});
    // this.countriesService.getCountries().subscribe(data => {
    //   data.forEach(el => console.log(el.flag));
    //   // console.warn('Init', data.);
    // });
    
    this.countries = this.countriesService.getCountries();
  }

  onClick(){
    
    //this.countries = this.countriesService.getCountries();

    //console.warn('Init', this.countries);
  }
}
