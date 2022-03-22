import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-progress',
    templateUrl: './app-progress.component.html',
    styleUrls: ['./app-progress.component.scss']
})
export class ProgressComponent implements OnInit {
    @Input() progress = 0;
    constructor() { }

    ngOnInit() { }
}
