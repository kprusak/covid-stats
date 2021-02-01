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

  ngOnInit(): void {
    this.showStats();
  }

  ngDoCheck(): void {
    this.showStats(); 
  };

  showStats() {
    let statsContainer: Stats[] = [];
    if(this.selectedContinent === 'All') {
      statsContainer = this._stats.statsToLoad;
    }
    else if(this.selectedContinent === this.selectedContinent) {
      statsContainer = this._stats.statsToLoad.filter(stat => stat.continent === this.selectedContinent);
    }
    this.stats = statsContainer;
  }
  
}