/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LanguageInterceptorService } from './language-interceptor.service';

describe('Service: LanguageInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LanguageInterceptorService]
    });
  });

  it('should ...', inject([LanguageInterceptorService], (service: LanguageInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
