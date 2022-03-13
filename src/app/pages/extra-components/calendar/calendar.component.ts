import { animate, keyframes, query, stagger, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { NbCalendarSize, NbDateService, NbMediaBreakpointsService, NbThemeService } from '@nebular/theme';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { DayCellComponent } from './day-cell/day-cell.component';

enum DatePickerState {
  SHOW = 'show',
  HIDE = 'hide',
  SHOW_H = 'showH',
  HIDE_H = 'hideH',
  SHOW_V = 'showV',
  HIDE_V = 'hideV',
}
@Component({
  selector: 'ngx-calendar',
  templateUrl: 'calendar.component.html',
  styleUrls: ['calendar.component.scss'],
  entryComponents: [DayCellComponent],
  animations: [
    trigger('timePicker', [
      state('hideH', style({
        transform: 'translateX(-100%)',
      })),
      state('hideV', style({
        transform: 'translateY(-100%)',
      })),
      transition('hideH => showH',
        animate('200ms', keyframes([
          style({transform: 'translateX(-100%)'}),
          style({transform: 'translateX(0%)'}),
        ]),
      )),
      transition('hideV => showV',
        animate('200ms', keyframes([
          style({transform: 'translateY(-100%)'}),
          style({transform: 'translateY(0%)'}),
        ]),
      )),
    ]),
  ],
})

export class CalendarComponent implements OnInit {
  private destroy$: Subject<void> = new Subject<void>();
  private _timePickerState: DatePickerState;
  size: NbCalendarSize;
  date: Date;
  isTimePickerHorizontal: boolean;
  dayCellComponent = DayCellComponent;

  constructor(
      protected dateService: NbDateService<Date>,
      private breakpointService: NbMediaBreakpointsService,
      private themeService: NbThemeService) {
    this.size = NbCalendarSize.LARGE;
  }

  get timePickerState(): string {
    return this.isTimePickerHorizontal
      ? this._timePickerState + 'H'
      : this._timePickerState + 'V';
  }

  set timePickerState(value: string) {
    this._timePickerState = value === DatePickerState.HIDE
      ? DatePickerState.HIDE
      : DatePickerState.SHOW;
  }

  ngOnInit() {
    const { md } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < md),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanMd: boolean) => {
        this.isTimePickerHorizontal = !isLessThanMd;
        this.timePickerState = DatePickerState.HIDE;
      });
  }

  showTimePicker() {
    this._timePickerState = DatePickerState.SHOW;
  }

  onDateChanged(): void {
    if (this._timePickerState === DatePickerState.HIDE)
      this.showTimePicker();
  }
}
