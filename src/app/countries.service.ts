import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from './models/country.model';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  apiUrl = "https://restcountries.com/v3.1/all";
  countries!: Country[];
  constructor(private http: HttpClient) { }

  // getCountries(): Observable<Country[]> {
       
  //   const result  = this.http.get<any[]>(this.apiUrl).pipe(
  //     map(response => {
  //       const countries = response.map((country) => { 
  //         return {
  //           flag: country.flag,
  //           name: {
  //             common: country.common,
  //             official: country.official,
  //             //nativeName: country.nativeName
  //           }
  //         }
  //       });
  //       this.countries = countries;
  //       return countries;
  //       }),
  //       );
        
  //   return result;
  // }

  getCountries(): Observable<Country[]> {
    
    const result  = this.http.get<any[]>(this.apiUrl).pipe(
      map(response => {
        const countries = response.map(({ flag, name: { common, official } }) => ({ flag, name: { common, official } }));
        this.countries = countries;
        return countries;
        }));
        
    return result;

    // const result  = this.http.get<any[]>(this.apiUrl).pipe(
    //   map(response => {
    //     const countries = response.map((country) => { 
    //       return {
    //         flag: country.flag,
    //         name: {
    //           common: country.common,
    //           official: country.official,
    //           nativeName: country.nativeName
    //         }
    //       }
    //     });
    //     this.countries = countries;
    //     return countries;
    //     }));
        
    // return result;
  }
}
