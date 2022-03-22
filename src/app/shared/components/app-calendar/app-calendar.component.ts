import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {DayPilot, DayPilotCalendarComponent} from "daypilot-pro-angular";
import { CalendarService, MoveEventParams } from 'src/app/core/services/calendar.service';
import {AppCalendarCreateComponent} from "./app-calendar-create.component";

@Component({
  selector: 'app-calendar-component',
  templateUrl: './calendar/app-calendar.component.html',
  styleUrls: ['./calendar/app-calendar.component.scss']
})
export class AppCalendarComponent implements OnInit, AfterViewInit {
  @ViewChild("calendar", {static: false}) calendar: DayPilotCalendarComponent;
  @ViewChild("create", {static: false}) create: AppCalendarCreateComponent;

  events: any[];

  

  navigatorConfig = {
    selectMode: "week",
    showMonths: 3,
    skipMonths: 3,
    locale: "fr-fr"
  };

  calendarConfig = {
    locale: "fr-fr",
    startDate: DayPilot.Date.today(),
    viewType: "Week",
    eventDeleteHandling: "Update",
    onEventDeleted: args => {
      this.ds.deleteEvent(args.e.id()).subscribe(result => this.calendar.control.message("Deleted"));
    },
    onEventMoved: args => {
      let params: MoveEventParams = {
        id: args.e.id(),
        newStart: args.newStart,
        newEnd: args.newEnd
      };
      this.ds.moveEvent(params).subscribe(result => this.calendar.control.message("Moved"));
    },
    onEventResized: args => {
      let params: MoveEventParams = {
        id: args.e.id(),
        newStart: args.newStart,
        newEnd: args.newEnd
      };
      this.ds.moveEvent(params).subscribe(result => this.calendar.control.message("Resized"));
    },
    onTimeRangeSelected: args => {
      this.create.show(args);
    }
  };

  constructor(private ds: CalendarService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    //this.ds.getEvents(this.calendar.control.visibleStart(), this.calendar.control.visibleEnd()).subscribe(result => this.events = result);
  }

  viewChange() {
    this.ds.getEvents(this.calendar.control.visibleStart(), this.calendar.control.visibleEnd()).subscribe(result => this.events = result);

  }

  createClosed(result) {
    if (result) {
      this.events.push(result);
    }
    this.calendar.control.clearSelection();
  }

}
