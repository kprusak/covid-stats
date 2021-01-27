import { Component, OnInit } from '@angular/core';
import { StatsService } from '../stats.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

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

  constructor(private _stats: StatsService) { }

  ngOnInit(): void {
    this._stats.getAllStats(); //get stats
  }

  ngDoCheck(): void {
    this._stats.statsToLoad.sort(this.sortStats); //sort data by total cases to make usage easier
    this.showStats(); //
  };

  sortStats(a: { cases: { total: any; }; }, b: { cases: { total: any; }; }) {
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

  showStats() {
    let onlyCountries = this._stats.statsToLoad.map(stat => stat.country);
    let onlyTotalCases = this._stats.statsToLoad.map(stat => stat.cases.total);
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
