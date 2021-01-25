import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

export class Stats {
  constructor(
    public continent: string,
    public country: string,
    public day: Date,
    public time: number,
    public population: number,
    public cases: {
      M_pop: number;
      active: number;
      critical: number;
      new: number;
      recovered: number;
      total: number;
    }[],
    public deaths: {
      M_pop: number;
      new: number;
      total: number;
    }[],
    public tests: {
      M_pop: number;
      total: number;
    }[],
  ) {
  }
}


@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  stats!: Stats[];

  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.getStats();
  }

  headers = {	'x-rapidapi-key': 'a35db0fe3dmshdf09ff9a2276fa7p1dd30ejsn2ab68bdd5e5a',
              'x-rapidapi-host': 'covid-193.p.rapidapi.com',
              'useQueryString': 'true',
            };

  getStats(){
    this.httpClient.get<any>('https://covid-193.p.rapidapi.com/statistics', {headers: this.headers}).subscribe(
      response => {
        console.log(response);
        this.stats = response;
      }
    );
  }
}
