import { Component } from '@angular/core';
import { NbCalendarDayCellComponent, NbCalendarSize, NbDateService } from '@nebular/theme';

@Component({
  selector: 'ngx-day-cell',
  templateUrl: 'day-cell.component.html',
  styleUrls: ['day-cell.component.scss'],
  host: { '[size]': 'size', '(click)': 'onClick()', 'class': 'day-cell' },
})
export class DayCellComponent extends NbCalendarDayCellComponent<Date> {
  size: NbCalendarSize;
  constructor(protected dateService: NbDateService<Date>) {
    super(dateService);
    this.size = NbCalendarSize.LARGE;
  }
}
