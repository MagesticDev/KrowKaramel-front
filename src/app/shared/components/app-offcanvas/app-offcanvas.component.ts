import { Component, Input, OnInit} from "@angular/core";


@Component({
    selector: 'app-offcanvas',
    templateUrl: './app-offcanvas.component.html',
    styleUrls: ['./app-offcanvas.component.scss']
})

export class AppOffcanvasComponent implements OnInit {
    @Input() public options;
    ngOnInit() {} 
}