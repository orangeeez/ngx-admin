import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      Created with 
      <nb-icon
        icon="heart"
        pack="fa">
      </nb-icon>
    </span>
    <div class="socials">
      <ng-container *ngFor="let link of links">
        <a
          *ngIf="link.url"
          [attr.href]="link.url"
          [attr.target]="link.target"
          [attr.class]="link.icon"
          [class.with-icon]="link.icon">
          <nb-icon
            *ngIf="link.icon; else title"
            [icon]="link.icon"
            [pack]="link.pack"></nb-icon>
        </a>
      </ng-container>
    </div>
  `,
})
export class FooterComponent {
  links = [
    {
      url: 'https://telegram.com',
      target: '_blank',
      icon: 'telegram',
      pack: 'fab'
    },
    {
      url: 'https://facebook.com',
      target: '_blank',
      icon: 'facebook',
      pack: 'fab'
    },
    {
      url: 'https://twitter.com',
      target: '_blank',
      icon: 'twitter',
      pack: 'fab'
    }
  ];
}
