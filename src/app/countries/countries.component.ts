import { Component } from '@angular/core';
import { CountriesService } from '../countries.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent {

  countries!: Observable<{ flag: string }[]>;

  constructor(private countriesService: CountriesService){}

  ngOnInit(){
    //console.warn('Init', {});
    // this.countriesService.getCountries().subscribe(data => {
    //   //console.warn('Init', data);
    // });
    
    this.countries = this.countriesService.getCountries();
  }

  onClick(){
    
    //this.countries = this.countriesService.getCountries();

    //console.warn('Init', this.countries);
  }
}
