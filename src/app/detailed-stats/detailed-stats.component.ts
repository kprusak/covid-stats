import { Component, OnInit } from '@angular/core';
import { StatsService } from '../stats.service';
import { Stats } from '../stats.service';

@Component({
  selector: 'app-detailed-stats',
  templateUrl: './detailed-stats.component.html',
  styleUrls: ['./detailed-stats.component.css']
})
export class DetailedStatsComponent implements OnInit {

  constructor(private _stats: StatsService) { }

  stats!: Stats[];

  ngOnInit(): void {
    this.stats=this._stats.statsToLoad;
  }
  
}