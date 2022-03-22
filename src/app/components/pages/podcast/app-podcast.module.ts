import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NEWS_ROUTE } from './app-podcast.route';
import { PodcastComponent } from './app-podcast.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [RouterModule.forChild(NEWS_ROUTE), CommonModule],
  declarations: [PodcastComponent]
})
export class PodcastModule {} 