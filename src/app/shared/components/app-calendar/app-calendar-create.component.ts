import {Component, EventEmitter, Output, ViewChild} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { DayPilot, DayPilotModalComponent } from "daypilot-pro-angular";
import { CalendarService, CreateEventParams } from "src/app/core/services/calendar.service";

@Component({
  selector: 'app-calendar-create-dialog',
  templateUrl: './calendar-create/app-calendar-create.component.html',
  styleUrls: ['./calendar-create/app-calendar-create.component.scss']
})
export class AppCalendarCreateComponent {
  @ViewChild("modal", {static: false}) modal: DayPilotModalComponent;
  @Output() close = new EventEmitter();

  form: FormGroup;
  dateFormat = "dd/MM/yyyy h:mm tt";

  constructor(private fb: FormBuilder, private ds: CalendarService) {
    this.form = this.fb.group({
      name: ["", Validators.required],
      start: ["", this.dateTimeValidator(this.dateFormat)],
      end: ["", [Validators.required, this.dateTimeValidator(this.dateFormat)]]
    });
  }

  show(args: any) {
    args.name = "";
    this.form.setValue({
      start: args.start.toString(this.dateFormat),
      end: args.end.toString(this.dateFormat),
      name: ""
    });
    this.modal.show();
  }

  submit() {
    let data = this.form.getRawValue();

    let params: CreateEventParams = {
      start: DayPilot.Date.parse(data.start, this.dateFormat).toString(),
      end: DayPilot.Date.parse(data.end, this.dateFormat).toString(),
      text: data.name
    };

    this.ds.createEvent(params).subscribe(result => {
      params.id = result.id;
      this.modal.hide();
      this.close.emit(params);
    });
  }

  cancel() {
    this.modal.hide();
    this.close.emit();
  }

  closed() {
    this.close.emit();
  }

  dateTimeValidator(format: string) {
    return function (c: FormControl) {
      let valid = !!DayPilot.Date.parse(c.value, format);
      return valid ? null : {badDateTimeFormat: true};
    };
  }
}
