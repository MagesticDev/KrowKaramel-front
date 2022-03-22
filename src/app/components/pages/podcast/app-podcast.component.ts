import { Component, OnInit, Injectable, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { PodcastService } from 'src/app/core/services/podcast.service';

@Component({
    templateUrl: './app-podcast.component.html',
    styleUrls: ['./app-podcast.component.scss']
})

export class PodcastComponent implements OnInit {
    constructor(private podcastService: PodcastService){}
    ngOnInit() {
        this.podcastService.podcastList().subscribe(val => {
            // // console.log((val);
        })
    } 
}