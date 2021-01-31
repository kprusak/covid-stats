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

  selectedContinent: string = 'All';
  selectContinentHandler (event: any) {
    this.selectedContinent = event.target.value;
  }


  ngOnInit(): void {
    this._stats.getAllStats(); //get stats
  }

  ngDoCheck(): void {
    this.stats=this._stats.statsToLoad;
    this._stats.statsToLoad.sort(this.sortStats); //sort data by total cases to make usage easier
    this.showStats(); //
  };

  sortStats(a: { cases: { total: any; }; }, b: { cases: { total: any; }; }) {
    const first = a.cases.total;
    const second = b.cases.total;
  
    let comparison = 0;
    if (first < second) {
      comparison = 1;
    } else if (first > second) {
      comparison = -1;
    }
    return comparison;
  }


  removeContinents(onlyCountries: string[], onlyTotalCases: number[]) {
    let notCountries = ['All', 'Europe', 'North-America', 'South-America', 'Africa', 'Asia'] //remove continents which are treated like countries in API
    for( var i = 0; i < onlyCountries.length; i++){ 
      if ( notCountries.indexOf(onlyCountries[i]) !== -1 ) { 
        onlyCountries.splice(i, 1); 
        onlyTotalCases.splice(i, 1); 
        i--;
      }
    }
  }

  showStats() {
    let onlyCountries: string[] = this._stats.statsToLoad.map(stat => stat.country);
    let onlyTotalCases: number[] = this._stats.statsToLoad.map(stat => stat.cases.total);
    this.removeContinents(onlyCountries, onlyTotalCases)

    if(this.selectedContinent === 'All') {
      this.barChartLabels = onlyCountries.slice(0,10);
      this.barChartData[0].data = onlyTotalCases.slice(0,10);
    }

    if(this.selectedContinent === 'Africa') {
      onlyCountries = [];
      onlyTotalCases = [];
      for (var i = 0; i < this._stats.statsToLoad.length; i++) {
        if (this._stats.statsToLoad[i].continent == 'Africa') {
          onlyCountries.push(this._stats.statsToLoad[i].country);
          onlyTotalCases.push(this._stats.statsToLoad[i].cases.total);
        }
      }
      this.barChartLabels = onlyCountries.slice(1,11);
      this.barChartData[0].data = onlyTotalCases.slice(1,11);
    }

    if(this.selectedContinent === 'Asia') {
      onlyCountries = [];
      onlyTotalCases = [];
      for (var i = 0; i < this._stats.statsToLoad.length; i++) {
        if (this._stats.statsToLoad[i].continent == 'Asia') {
          onlyCountries.push(this._stats.statsToLoad[i].country);
          onlyTotalCases.push(this._stats.statsToLoad[i].cases.total);
        }
      }
      this.barChartLabels = onlyCountries.slice(1,11);
      this.barChartData[0].data = onlyTotalCases.slice(1,11);
    }

    if(this.selectedContinent === 'Europe') {
      onlyCountries = [];
      onlyTotalCases = [];
      for (var i = 0; i < this._stats.statsToLoad.length; i++) {
        if (this._stats.statsToLoad[i].continent == 'Europe') {
          onlyCountries.push(this._stats.statsToLoad[i].country);
          onlyTotalCases.push(this._stats.statsToLoad[i].cases.total);
        }
      }
      this.barChartLabels = onlyCountries.slice(1,11);
      this.barChartData[0].data = onlyTotalCases.slice(1,11);
    }

    if(this.selectedContinent === 'North-America') {
      onlyCountries = [];
      onlyTotalCases = [];
      for (var i = 0; i < this._stats.statsToLoad.length; i++) {
        if (this._stats.statsToLoad[i].continent == 'North-America') {
          onlyCountries.push(this._stats.statsToLoad[i].country);
          onlyTotalCases.push(this._stats.statsToLoad[i].cases.total);
        }
      }
      this.barChartLabels = onlyCountries.slice(1,11);
      this.barChartData[0].data = onlyTotalCases.slice(1,11);
    }
    
    if(this.selectedContinent === 'South-America') {
      onlyCountries = [];
      onlyTotalCases = [];
      for (var i = 0; i < this._stats.statsToLoad.length; i++) {
        if (this._stats.statsToLoad[i].continent == 'South-America') {
          onlyCountries.push(this._stats.statsToLoad[i].country);
          onlyTotalCases.push(this._stats.statsToLoad[i].cases.total);
        }
      }
      this.barChartLabels = onlyCountries.slice(1,11);
      this.barChartData[0].data = onlyTotalCases.slice(1,11);
    }
  }
  
}
