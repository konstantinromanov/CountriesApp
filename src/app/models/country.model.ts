
export interface Country {
    name: Names;
    //tld: string[];
    // cca2: string;
    // ccn3: string;
    // cca3: string;
    // independent: boolean;
    // status: string;
    // unMember: boolean;
    currencies: Currencies;
    // idd: string;
    capital: string[];
    // altSpelling: string[];
    region: string;
    subregion: string;
    languages: Language;
    // translations: Translations;
    latlng: number[];
    landlocked: boolean;
    borders: string[];
    area: number;
    // demonyms: Demonyms;
    flag: string;
    maps: Map;
    population: number;
    // //gini: Gini;
    // fifa: string;
    // //car: 
     continents: string[];
     flags: Flag;
    // startOfWeek: string;
    car: Car;
    capitalInfo: CapitalInfo;

}

export interface CapitalInfo {
    latlng: number[];
}
export interface Car {
    signs: string[];
    side: string;
}

export interface Flag {
    png: string;
    svg: string;
}
export interface Gini {
    [key: string]: number;
}

export interface Names {
    common: string;
    official: string;
    //nativeName: NativeNames;
}

export interface NativeNames{
    official: string;
    common: string;
}

export interface Currencies{
    [key: string]: Currency;
}

export interface Currency{
    name: string;
    symbol: string;
}

export interface Language {
    [key: string]: string;
}

export interface Translations {
    ara: Translation;
    bre: Translation;
    ces: Translation;
    cym: Translation;
    deu: Translation;
    est: Translation;
    fin: Translation;
    fra: Translation;
    hrv: Translation;
    hun: Translation;
    ita: Translation;
    jpn: Translation;
    kor: Translation;
    nld: Translation;
    per: Translation;
    pol: Translation;
    por: Translation;
    rus: Translation;
    slk: Translation;
    spa: Translation;
    srp: Translation;
    swe: Translation;
    tur: Translation;
    urd: Translation;
    zho: Translation;
}

export interface Translation {
    official: string;
    common: string;
}

export interface Demonyms {
    [key: string]: Demonym;
}

export interface Demonym {
    f: string;
    m: string;
}

export interface Map {
    googleMaps: string;
    openStreetMaps: string;
}