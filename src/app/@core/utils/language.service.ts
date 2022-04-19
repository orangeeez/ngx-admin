import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { BehaviorSubject, Observable, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LanguageService {
  protected menu$ = new BehaviorSubject([]);

  public LANGUAGE_MENU = [
    {
      title: "language.english",
      data: "en-US",
      icon: { icon: "us", pack: "flags" },
    },
    {
      title: "language.russian",
      data: "ru-RU",
      icon: { icon: "ru", pack: "flags" },
    },
  ];
  constructor(public translate: TranslateService) {
    for (const language of this.LANGUAGE_MENU) {
      this.translate.stream(language.title).subscribe((res) => {
        language.title = res;
        this.changeMenu(this.LANGUAGE_MENU);
      });
    }
  }

  changeMenu(menu: any): any {
    this.menu$.next(menu);
  }

  onMenuChanged(): Observable<any> {
    return this.menu$.asObservable();
  }

  onLanguageMenuClick(item: any) {
    localStorage.setItem("language", item.data);
    this.translate.use(item.data);
  }
}
