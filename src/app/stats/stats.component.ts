import { Component, OnInit } from '@angular/core';
import { StatsService } from '../stats.service';
import { Stats } from '../stats.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  constructor(private _stats: StatsService) { }

  stats!: Stats[];

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartData = [
    {data: [] as number[], label: 'Total Cases'}
  ];

  public barChartLabels = [] as string[];
  public barChartType = 'bar' as Chart.ChartType;
  public barChartLegend = true;

  ngOnInit(): void {
    this._stats.getAllStats(); //get stats
  }

  ngDoCheck(): void {
    this.stats=this._stats.statsToLoad;
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
    let notCountries = ['All', 'Europe', 'North-America', 'South-America', 'Africa', 'Asia'] //remove continents which are treated like countries in API

    for( var i = 0; i < onlyCountries.length; i++){ 
      if ( notCountries.indexOf(onlyCountries[i]) !== -1 ) { 
        onlyCountries.splice(i, 1); 
        onlyTotalCases.splice(i, 1); 
        i--;
      }
    }

    this.barChartLabels = onlyCountries.slice(0,10);
    this.barChartData[0].data = onlyTotalCases.slice(0,10);
  }
  
}
