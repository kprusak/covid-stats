import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class Stats {
  continent!: string;
  country!: string;
  day!: string;
  time!: string;
  population!: number;
  cases!: {
    M_pop: number;
    active: number;
    critical: number;
    new: string;
    recovered: number;
    total: number;
  };
  deaths!: {
    M_pop: number;
    new: number;
    total: number;
  };
  tests!: {
    M_pop: number;
    total: number;
  };
}



@Injectable({
  providedIn: 'root'
})
export class StatsService {

  statsToLoad!: Stats[];

  constructor(private _http: HttpClient) { }

  headers = {	'x-rapidapi-key': 'a35db0fe3dmshdf09ff9a2276fa7p1dd30ejsn2ab68bdd5e5a',
              'x-rapidapi-host': 'covid-193.p.rapidapi.com',
              'useQueryString': 'true' };

  getAllStats(){
    this._http.get<any>('https://covid-193.p.rapidapi.com/statistics', {headers: this.headers}).subscribe(
      res => {
        this.statsToLoad = res.response; //get data from API
      }
    );
  }


}
