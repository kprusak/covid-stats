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

  showStats() {
    let onlyCountries: string[] = [];
    let onlyTotalCases: number[] = [];

    if(this.selectedContinent === 'All') {
      onlyCountries = this._stats.statsToLoad.map(stat => stat.country);
      onlyTotalCases = this._stats.statsToLoad.map(stat => stat.cases.total);
    }
    else if(this.selectedContinent === this.selectedContinent) {
      onlyCountries = [];
      onlyTotalCases = [];
      for (var i = 0; i < this._stats.statsToLoad.length; i++) {
        if (this._stats.statsToLoad[i].continent == this.selectedContinent) {
          onlyCountries.push(this._stats.statsToLoad[i].country);
          onlyTotalCases.push(this._stats.statsToLoad[i].cases.total);
        }
      }
    }


    this.barChartLabels = onlyCountries.slice(0,10);
    this.barChartData[0].data = onlyTotalCases.slice(0,10);

  }
  
}
