/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbIconLibraries, NbThemeService } from '@nebular/theme';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { AnalyticsService } from './@core/utils/analytics.service';
import { SeoService } from './@core/utils/seo.service';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  
  constructor(
    private analytics: AnalyticsService, 
    private seoService: SeoService,
    private iconsLibrary: NbIconLibraries,
    private themeService: NbThemeService) {
      iconsLibrary.registerFontPack('fa', { packClass: 'fa', iconClassPrefix: 'fa' });
      iconsLibrary.registerFontPack('far', { packClass: 'far', iconClassPrefix: 'fa' });
      iconsLibrary.registerFontPack('fab', { packClass: 'fab', iconClassPrefix: 'fa' });
      iconsLibrary.registerFontPack('fad', { packClass: 'fad', iconClassPrefix: 'fa' });
      iconsLibrary.registerFontPack('fal', { packClass: 'fal', iconClassPrefix: 'fa' });
      iconsLibrary.registerFontPack('fas', { packClass: 'fas', iconClassPrefix: 'fa' });
  }
  
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
    this.seoService.trackCanonicalChanges();

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => {
        var currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'cosmic') {
          this.themeService.changeTheme(currentTheme);
        }
      });
  }
}
