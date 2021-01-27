import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

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


@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})

export class StatsComponent implements OnInit {

  stats!: Stats[];

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels = [] as string[];
  public barChartType = 'bar' as Chart.ChartType;
  public barChartLegend = true;

  public barChartData = [
    {data: [] as number[], label: 'Total Cases'}
  ];

  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.getStats();
  }

  ngDoCheck(): void {
    this.loadStats();
  };


  headers = {	'x-rapidapi-key': 'a35db0fe3dmshdf09ff9a2276fa7p1dd30ejsn2ab68bdd5e5a',
              'x-rapidapi-host': 'covid-193.p.rapidapi.com',
              'useQueryString': 'true',
  };

  getStats(){
    this.httpClient.get<any>('https://covid-193.p.rapidapi.com/statistics', {headers: this.headers}).subscribe(
      res => {
        this.stats = res.response; //get data from API
        this.stats.sort(this.sortData); //sort data by total cases to make usage easier
        console.log(this.stats)
      }
    );
  }

  sortData(a: { cases: { total: any; }; }, b: { cases: { total: any; }; }) {
    const firstPopulation = a.cases.total;
    const secondPopulation = b.cases.total;
  
    let comparison = 0;
    if (firstPopulation < secondPopulation) {
      comparison = 1;
    } else if (firstPopulation > secondPopulation) {
      comparison = -1;
    }
    return comparison;
  }

  loadStats() {

    let onlyCountries = this.stats.map(stat => stat.country);
    let onlyTotalCases = this.stats.map(stat => stat.cases.total);
    let continents = ['All', 'Europe', 'North-America', 'South-America', 'Africa', 'Asia']

    for( var i = 0; i < onlyCountries.length; i++){ 
      if ( continents.indexOf(onlyCountries[i]) !== -1 ) { 
        onlyCountries.splice(i, 1); 
        onlyTotalCases.splice(i, 1); 
        i--;
      }
    }

    this.barChartLabels = onlyCountries.slice(0,10);
    this.barChartData[0].data = onlyTotalCases.slice(0,10);
  }
}
