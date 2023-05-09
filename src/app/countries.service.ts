import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Country, Currencies, Currency, Language } from './models/country.model';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  apiUrl = "https://restcountries.com/v3.1/all";
  apiUrlByCode = "https://restcountries.com/v3.1/alpha/";
  apiUrlByName = "https://restcountries.com/v3.1/name/";
  
  countries!: Country[];
  lastSearchTerm: string = "";
  lastRegionTerm: string = "";
  isAscending = true;

  constructor(private http: HttpClient) { }

  getCountries(): Observable<Country[]> {
        
    if (this.countries) {     

      return of(this.countries);

    } else {      
      
      const result = this.http.get<any[]>(this.apiUrl).pipe(
        map(response => this.mapResponseToCountries(response)),
        tap(countries => this.countries = countries.sort((a, b) => a.name.common.localeCompare(b.name.common)))
      );

      return result;
    }    
  }

  sortByNameAscending(): void {
    this.countries.sort((a, b) => a.name.common < b.name.common ? -1 : 1);
    this.isAscending = false;    
  }

  sortByNameDescending(): void {
    this.countries.sort((a, b) => a.name.common > b.name.common ? -1 : 1);
    this.isAscending = true;    
  }

  getCountriesBySearch(countryName: string, countryRegion: string): Observable<Country[]> {
    
    this.lastSearchTerm = countryName.trim().toLowerCase();
    this.lastRegionTerm = countryRegion.trim().toLowerCase();

    const result = this.getCountries().pipe(
      map(countries => countries.filter(country =>
        (country.name.common.toLowerCase().includes(this.lastSearchTerm)
        || country.name.official.toLowerCase().includes(this.lastSearchTerm))
        && country.region.toLowerCase().includes(this.lastRegionTerm)
      ))
    );

    return result;
  }

  getCountryByCode(cca2: string): Observable<Country> {

    const cachedCountry = this.countries?.find(c => c.cca2 === cca2);
  
    if (cachedCountry) {
      return of(cachedCountry);
    } else {
      return this.http.get<any[]>(`${this.apiUrlByCode}/${cca2}`).pipe(
        map(response => this.mapResponseToCountries(response)[0])
      );
    }
  } 

  private mapResponseToCountries(response: any[]): Country[] {
   
    const countries = response.map((country) => {
      
      const languages = country.languages;
      const formattedLanguages: Language = {};

      for (const key in languages) {
        const language = languages[key];
        formattedLanguages[key] = language;
      }
                
      const currencies = country.currencies;
      const formattedCurrencies: Currencies = {};

      for (const key in currencies) {
        const currency = currencies[key];
        formattedCurrencies[key] = {
          name: currency.name as string,
          symbol: currency.symbol as string
        }
      }
      
      return {
        flag: country.flag,
        name: {
          common: country.name.common,
          official: country.name.official,               
        },
        currencies: currencies,
        capital: country.capital,
        population: country.population,
        continents: country.continents,
        flags: country.flags,
        area: country.area,
        languages: languages,
        region: country.region,
        subregion: country.subregion,
        maps: {
          googleMaps: country.maps.googleMaps,
          openStreetMaps: country.maps.openStreetMaps
        },
        latlng: country.latling,
        landlocked: country.landlocked,
        borders: country.borders,
        car: {
          signs: country.car.signs,
          side: country.car.side
        },
        capitalInfo: country.capitalInfo,    
        tld: country.tld,
        cca2: country.cca2,
        ccn3: country.ccn3,
        cca3: country.cca3,
        cioc: country.cioc,
        idd: {
          root: country.idd.root,
          suffixes: country.idd.suffixes
        },
        independent: country.independent,
        status: country.status,
        unMember: country.unMember,       
        fifa: country.fifa,
        startOfWeek: country.startOfWeek,

      };
    });
   
    return countries;
  }  
}
