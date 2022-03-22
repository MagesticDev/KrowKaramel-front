import { DatePipe } from '@angular/common';
import { Component, OnInit, Output, ViewEncapsulation, EventEmitter, ElementRef, Input } from '@angular/core';
import { IAttempts_hack, IHistory, IHistoryList } from 'src/app/core/models/history/history.model';
import { UserService } from 'src/app/core/services/user.service';


export interface Update {
    type?: string;
    status?: string;
    enum?: string;
}


@Component({
    templateUrl: './app-account-history.component.html',
    styleUrls: ['../app-account.component.scss', './app-account-history.component.scss']
})
export class AccountHistoryComponent implements OnInit {
    public allHistory: IHistory;
    public historyList: IHistoryList[];
    public attempts_hackList: IAttempts_hack[];
    public isMasterSel:boolean;
    private checkedCategoryList: IHistoryList[];
    public hasCheckedHistory: boolean;
    public Date = new Date();
    public oldDate;
    public deleteHistory: IHistoryList[];

    constructor(public userService: UserService, private datePipe: DatePipe){
        this.isMasterSel = false;
    }

    ngOnInit() {
        this.userService.getHistory().subscribe(result => {
            this.allHistory = result;
            this.historyList = this.allHistory.history;
            this.attempts_hackList = this.allHistory.attempts_hack; 
            this.daysBetween(new Date());
        });
        this.getCheckedItemList();
       
    }

    checkUncheckAllHistory(historySelected = null, position = null) {
        for (var i = 0; i < this.historyList.length; i++) {
            const dateListItem = this.datePipe.transform(this.historyList[i].date, "yyyy-MM-dd");
            const dateSelectedItem = this.datePipe.transform(historySelected, "yyyy-MM-dd");
            if(dateListItem === dateSelectedItem){
                this.historyList[i].isSelected = this.isMasterSel;
            }
        }

        this.isMasterSel = false;
        this.getCheckedItemList();
        
    }
       
    isAllSelectedHistory() {
        this.isMasterSel = this.historyList.every(function(item:any) {
            return item.isSelected == true;
        })
        this.getCheckedItemList();
    }
      
    getCheckedItemList(){
        this.checkedCategoryList = [];
        this.hasCheckedHistory = false;
        for (var i = 0; i < this.historyList?.length; i++) {
          if(this.historyList[i].isSelected)
          this.checkedCategoryList.push(this.historyList[i]);
        }
        
        if(this.checkedCategoryList?.length > 0){
            this.hasCheckedHistory = true;
        } 

        this.checkedCategoryList = this.checkedCategoryList;
    }

    // calculateDiff(dateStr){
    //     const dateHistory = new Date(dateStr); 
    //     let date = new Date();
    //     date.setHours(0);
    //     date.setMinutes(0);
    //     date.setSeconds(0)
    //     const Difference_In_Time = date.getTime() - dateHistory.getTime(); 
    //     const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    //     this.oldDate = parseInt(Difference_In_Days.toString());

    //     return parseInt(Difference_In_Days.toString());
    // }

    daysBetween(date) {
        const first = new Date();
        const historyDate = new Date(date);
        // Copy date parts of the timestamps, discarding the time parts.
        var one = new Date(first.getFullYear(), first.getMonth(), first.getDate());
        var two = new Date(historyDate.getFullYear(), historyDate.getMonth(), historyDate.getDate());
    
        // Do the math.
        var millisecondsPerDay = 1000 * 60 * 60 * 24;
        var millisBetween = two.getTime() - one.getTime();
        var days = Math.floor(millisBetween / millisecondsPerDay);
    
        const daysResult = days.toString().replace('-','')
        this.oldDate = daysResult;
        // Round down.
        return daysResult;
    }

    deleteHistoryDay(){
        this.checkedCategoryList.forEach(history => {
            this.userService.delHistory(history.historyID).subscribe(val => {
                this.allHistory = val;
                this.historyList = this.allHistory.history;
            })
        })
    }
}