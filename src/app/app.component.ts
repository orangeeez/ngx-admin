/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { NbIconLibraries } from '@nebular/theme';
import { AnalyticsService } from './@core/utils/analytics.service';
import { SeoService } from './@core/utils/seo.service';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(
    private analytics: AnalyticsService, 
    private seoService: SeoService,
    private iconsLibrary: NbIconLibraries) {
      iconsLibrary.registerFontPack('fa', { packClass: 'fa', iconClassPrefix: 'fa' });
      iconsLibrary.registerFontPack('far', { packClass: 'far', iconClassPrefix: 'fa' });
      iconsLibrary.registerFontPack('fab', { packClass: 'fab', iconClassPrefix: 'fa' });
      iconsLibrary.registerFontPack('fad', { packClass: 'fad', iconClassPrefix: 'fa' });
      iconsLibrary.registerFontPack('fal', { packClass: 'fal', iconClassPrefix: 'fa' });
      iconsLibrary.registerFontPack('fas', { packClass: 'fas', iconClassPrefix: 'fa' });
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
    this.seoService.trackCanonicalChanges();
  }
}
