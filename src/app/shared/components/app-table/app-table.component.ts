import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { URL_API } from 'src/app/core/const/api.constants';
import { IPage } from 'src/app/core/models/pagesBuilder/page.model';


@Component({
    selector: 'app-table',
    templateUrl: './app-table.component.html',
    styleUrls: ['./app-table.component.scss']
})
export class AppTableComponent implements OnInit {
    
    @Input() public columns: [];
    @Input() public filterColumns: [];
    @Input() public attrColumn: [];
    @Input() public btnActions: boolean;
    @Input() public currentUrl: string;

    public apiUrl = URL_API;
    public dataFilter: [];
    public _data: IPage[];
    get data(): IPage[] {
        return this._data;
    }
    @Input() set data(value: IPage[]) {
        this._data = value;
        this.getData(this._data);
    }

    public pages = this.data;

    constructor(private datePipe: DatePipe) {
       
    }

    getData(data) {
        this.dataFilter = data;
    }

    created_date(value) {
        return this.datePipe.transform(value);
    }

    is_published(value) {
        if (value == 1) {
            return '<div class="bg-success p-2 text-nowrap text-white d-bloc text-center">Publié</div>';
        }

        return '<div class="bg-danger p-2 text-nowrap text-white d-block text-center" style="width:200px;">Non publié</div>';
    }


    filteredColumn(data, dataColumn) {
        if (this.attrColumn.indexOf(dataColumn as never) == -1) {
            return data;
        }
    }

    compare(a: number | string, b: number | string, isAsc: boolean) {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }

    ngOnInit() {
        
    }
}