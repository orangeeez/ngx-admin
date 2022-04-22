import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { BehaviorSubject, Observable, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LanguageService {
  protected language$ = new BehaviorSubject([]);
  protected userMenu$ = new BehaviorSubject([]);

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

  public USER_MENU = [
    {
      title: "header.user_menu.profile",
      data: "profile",
      link: "profile",
      icon: "person-outline",
    },
    {
      title: "header.user_menu.logout",
      data: "logout",
      icon: "log-out-outline",
    },
  ];

  constructor(public translate: TranslateService) {
    for (const language of this.LANGUAGE_MENU) {
      this.translate.stream(language.title).subscribe((res) => {
        language.title = res;
        this.changeLanguage(this.LANGUAGE_MENU);
      });
    }

    for (const menu of this.USER_MENU) {
      this.translate.stream(menu.title).subscribe((res) => {
        menu.title = res;
        this.changeUserMenu(this.USER_MENU);
      });
    }
  }

  changeLanguage(language: any): any {
    this.language$.next(language);
  }

  onLanguageChanged(): Observable<any> {
    return this.language$.asObservable();
  }

  changeUserMenu(menu: any): any {
    this.userMenu$.next(menu);
  }

  onUserMenuChanged(): Observable<any> {
    return this.userMenu$.asObservable();
  }

  onLanguageMenuClick(item: any) {
    localStorage.setItem("language", item.data);
    this.translate.use(item.data);
  }

  setLanguage() {
    var language = this.getLanguage();
    localStorage.setItem("language", language);
    this.translate.setDefaultLang(language);
    this.translate.use(language);
  }

  private getLanguage() {
    return localStorage.getItem("language") || navigator.language || "en-US";
  }
}
