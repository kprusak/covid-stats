import { Component, OnInit } from '@angular/core';
import { Stats, StatsService } from '../stats.service';

@Component({
  selector: 'app-detailed-stats',
  templateUrl: './detailed-stats.component.html',
  styleUrls: ['./detailed-stats.component.css']
})
export class DetailedStatsComponent implements OnInit {

  constructor(private _stats: StatsService) { }

  stats!: Stats[];
  searchTerm: string = '';

  selectedContinent: string = 'All';
  selectContinentHandler (event: any) {
    this.selectedContinent = event.target.value;
  }

  ngOnInit(): void {
    this.showStats();
  }

  ngDoCheck(): void {
    this.showStats(); 
  };

  showStats() {
    let statsy: Stats[] = [];
    if(this.selectedContinent === 'All') {
      statsy = this._stats.statsToLoad;
    }
    if(this.selectedContinent === 'Asia') {
      statsy = this._stats.statsToLoad.filter(stat => stat.continent === 'Asia');
    }
    if(this.selectedContinent === 'Africa') {
      statsy = this._stats.statsToLoad.filter(stat => stat.continent === 'Africa');
    }
    if(this.selectedContinent === 'Europe') {
      statsy = this._stats.statsToLoad.filter(stat => stat.continent === 'Europe');
    }
    if(this.selectedContinent === 'North-America') {
      statsy = this._stats.statsToLoad.filter(stat => stat.continent === 'North-America');
    }
    if(this.selectedContinent === 'South-America') {
      statsy = this._stats.statsToLoad.filter(stat => stat.continent === 'South-America');
    }
    this.stats = statsy;
  }
  
}