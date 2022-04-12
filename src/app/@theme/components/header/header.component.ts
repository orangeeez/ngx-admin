import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  NbMenuItem,
  NbMenuService,
  NbSidebarService,
  NbThemeService,
} from "@nebular/theme";

import { LayoutService } from "../../../@core/utils";
import { filter, map, takeUntil } from "rxjs/operators";
import { Subject, Observable } from "rxjs";
import { NbAuthService, NbAuthToken, NbTokenService } from "@nebular/auth";
import { Router } from "@angular/router";

@Component({
  selector: "ngx-header",
  styleUrls: ["./header.component.scss"],
  templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public readonly materialTheme$: Observable<boolean>;
  userPictureOnly: boolean = true;
  isThemeChecked: boolean;
  user: any;

  themes = [
    {
      value: "default",
      name: "Light",
    },
    {
      value: "dark",
      name: "Dark",
    },
    {
      value: "cosmic",
      name: "Cosmic",
    },
    {
      value: "corporate",
      name: "Corporate",
    },
    {
      value: "material-light",
      name: "Material Light",
    },
    {
      value: "material-dark",
      name: "Material Dark",
    },
  ];

  userMenu = [
    {
      title: "Profile",
      data: "profile",
      link: "profile",
      icon: "person-outline",
    },
    { title: "Log out", data: "logout", icon: "log-out-outline" },
  ];

  public constructor(
    private authService: NbAuthService,
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private layoutService: LayoutService,
    public tokenService: NbTokenService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.onTokenChange().subscribe((token: NbAuthToken) => {
      if (token.isValid()) {
        this.user = token.getPayload();
      }
    });

    this.themeService
      .onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$)
      )
      .subscribe((themeName) => {
        var currentTheme = localStorage.getItem("theme");
        if (currentTheme === "cosmic") {
          this.isThemeChecked = true;
          this.themeService.changeTheme(currentTheme);
        }
      });

    this.menuService
      .onItemClick()
      .pipe(
        filter(({ tag }) => tag === "header-menu"),
        map(({ item: item }) => item)
      )
      .subscribe((item) => this.onContextMenuClick(item));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleTheme() {
    var theme = this.isThemeChecked ? "cosmic" : "default";

    localStorage.setItem("theme", theme);
    this.themeService.changeTheme(theme);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, "menu-sidebar");
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  onProfileClick(item: NbMenuItem) {
    this.router.navigateByUrl("/pages/profile");
  }

  onLogoutClick() {
    this.tokenService.clear().subscribe(() => {
      this.router.navigate(["auth/login"]);
    });
  }

  private onContextMenuClick(item: NbMenuItem) {
    switch (item.data) {
      case "profile":
        this.onProfileClick(item);
        break;

      case "logout":
        this.onLogoutClick();
        break;

      default:
        break;
    }
  }
}
