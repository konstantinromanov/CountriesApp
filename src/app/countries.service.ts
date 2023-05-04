import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  //items: Country[] = [];
  constructor(private http: HttpClient) { }

  getCountries(): Observable<{ flag: string }[]> {
    //return this.items;
    let result = this.http.get<{ flag: string }[]>('https://restcountries.com/v3.1/all?fields=flag');
    //console.log("result: ", result);
    return result;
  }
}
