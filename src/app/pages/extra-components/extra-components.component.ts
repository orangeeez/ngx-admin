import { Component } from '@angular/core';

@Component({
  selector: 'ngx-components',
  template: `
    <router-outlet></router-outlet>
  `,
  styles: [
    ':host { width: 100%; height: 100% }'
  ]
})
export class ExtraComponentsComponent {
}
