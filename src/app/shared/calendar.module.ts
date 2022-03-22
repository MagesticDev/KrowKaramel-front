import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {DayPilotModule} from "daypilot-pro-angular";
import {HttpClientModule} from "@angular/common/http";
import { AppCalendarComponent } from "./components/app-calendar/app-calendar.component";
import { AppCalendarCreateComponent } from "./components/app-calendar/app-calendar-create.component";
import { CalendarService } from "../core/services/calendar.service";

@NgModule({
  imports: [
    HttpClientModule,
    DayPilotModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppCalendarComponent,
    AppCalendarCreateComponent
  ],
  exports: [AppCalendarComponent],
  providers: [CalendarService],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppCalendarModule {
}
