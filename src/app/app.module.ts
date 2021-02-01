import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';
import { StatsService } from './stats.service';
import { StatsComponent } from './stats/stats.component';
import { DetailedStatsComponent } from './detailed-stats/detailed-stats.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

import { CountryFilterPipe } from './detailed-stats/country-filter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    StatsComponent,
    DetailedStatsComponent,
    CountryFilterPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ChartsModule,
    MatGridListModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule
  ],
  providers: [StatsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
