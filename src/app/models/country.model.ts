
export interface Country {
    name: Names;
    tld: string[];
    cca2: string;
    ccn3: string;
    cca3: string;
    independent: boolean;
    status: string;
    unMember: boolean;
    currencies: Currencies;
    idd: Idd;
    capital: string[];   
    region: string;
    subregion: string;
    languages: Language;    
    latlng: number[];
    landlocked: boolean;
    borders: string[];
    area: number;    
    flag: string;
    maps: Map;
    population: number;   
    fifa: string;    
    continents: string[];
    flags: Flag;
    startOfWeek: string;
    car: Car;
    capitalInfo: CapitalInfo;
}

export interface Idd {
    root: string;
    suffixes: string[];
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
    alt: string;
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
    eng: Demonym;
    fra: Demonym;
}

export interface Demonym {
    f: string;
    m: string;
}

export interface Map {
    googleMaps: string;
    openStreetMaps: string;
}