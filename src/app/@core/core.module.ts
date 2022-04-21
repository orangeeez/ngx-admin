import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { MAT_RIPPLE_GLOBAL_OPTIONS } from "@angular/material/core";
import { NbAuthModule, NbAuthJWTToken } from "@nebular/auth";
import { NbSecurityModule, NbRoleProvider } from "@nebular/security";
import { throwIfAlreadyLoaded } from "./module-import-guard";
import {
  AnalyticsService,
  LayoutService,
  PlayerService,
  SeoService,
  StateService,
} from "./utils";
import { UserData } from "./data/users";
import { ElectricityData } from "./data/electricity";
import { SmartTableData } from "./data/smart-table";
import { UserActivityData } from "./data/user-activity";
import { OrdersChartData } from "./data/orders-chart";
import { ProfitChartData } from "./data/profit-chart";
import { TrafficListData } from "./data/traffic-list";
import { EarningData } from "./data/earning";
import { OrdersProfitChartData } from "./data/orders-profit-chart";
import { TrafficBarData } from "./data/traffic-bar";
import { ProfitBarAnimationChartData } from "./data/profit-bar-animation-chart";
import { TemperatureHumidityData } from "./data/temperature-humidity";
import { SolarData } from "./data/solar";
import { TrafficChartData } from "./data/traffic-chart";
import { StatsBarData } from "./data/stats-bar";
import { CountryOrderData } from "./data/country-order";
import { StatsProgressBarData } from "./data/stats-progress-bar";
import { VisitorsAnalyticsData } from "./data/visitors-analytics";
import { SecurityCamerasData } from "./data/security-cameras";

import { UserService } from "./mock/users.service";
import { ElectricityService } from "./mock/electricity.service";
import { SmartTableService } from "./mock/smart-table.service";
import { UserActivityService } from "./mock/user-activity.service";
import { OrdersChartService } from "./mock/orders-chart.service";
import { ProfitChartService } from "./mock/profit-chart.service";
import { TrafficListService } from "./mock/traffic-list.service";
import { EarningService } from "./mock/earning.service";
import { OrdersProfitChartService } from "./mock/orders-profit-chart.service";
import { TrafficBarService } from "./mock/traffic-bar.service";
import { ProfitBarAnimationChartService } from "./mock/profit-bar-animation-chart.service";
import { TemperatureHumidityService } from "./mock/temperature-humidity.service";
import { SolarService } from "./mock/solar.service";
import { TrafficChartService } from "./mock/traffic-chart.service";
import { StatsBarService } from "./mock/stats-bar.service";
import { CountryOrderService } from "./mock/country-order.service";
import { StatsProgressBarService } from "./mock/stats-progress-bar.service";
import { VisitorsAnalyticsService } from "./mock/visitors-analytics.service";
import { SecurityCamerasService } from "./mock/security-cameras.service";
import { RippleService } from "./utils/ripple.service";
import { MockDataModule } from "./mock/mock-data.module";
import { NgxAuthModule } from "../auth/auth.module";
import { RoleProvider } from "../security/role.provider";
import { NgxPasswordAuthStrategy } from "../auth/strategies/password-strategy";
import { TELEGRAM_BOT_OPTIONS } from "../auth/auth.options";
import { environment } from "../../environments/environment";
import { LanguageService } from "./utils/language.service";

const socialLinks = [
  {
    url: "https://twitter.com/akveo_inc",
    target: "_blank",
    icon: "telegram",
    pack: "fab",
  },
];

const DATA_SERVICES = [
  { provide: UserData, useClass: UserService },
  { provide: ElectricityData, useClass: ElectricityService },
  { provide: SmartTableData, useClass: SmartTableService },
  { provide: UserActivityData, useClass: UserActivityService },
  { provide: OrdersChartData, useClass: OrdersChartService },
  { provide: ProfitChartData, useClass: ProfitChartService },
  { provide: TrafficListData, useClass: TrafficListService },
  { provide: EarningData, useClass: EarningService },
  { provide: OrdersProfitChartData, useClass: OrdersProfitChartService },
  { provide: TrafficBarData, useClass: TrafficBarService },
  {
    provide: ProfitBarAnimationChartData,
    useClass: ProfitBarAnimationChartService,
  },
  { provide: TemperatureHumidityData, useClass: TemperatureHumidityService },
  { provide: SolarData, useClass: SolarService },
  { provide: TrafficChartData, useClass: TrafficChartService },
  { provide: StatsBarData, useClass: StatsBarService },
  { provide: CountryOrderData, useClass: CountryOrderService },
  { provide: StatsProgressBarData, useClass: StatsProgressBarService },
  { provide: VisitorsAnalyticsData, useClass: VisitorsAnalyticsService },
  { provide: SecurityCamerasData, useClass: SecurityCamerasService },
  { provide: MAT_RIPPLE_GLOBAL_OPTIONS, useExisting: RippleService },
];

export const NB_CORE_PROVIDERS = [
  NgxAuthModule,
  ...MockDataModule.forRoot().providers,
  ...DATA_SERVICES,
  ...NbAuthModule.forRoot({
    strategies: [
      NgxPasswordAuthStrategy.setup({
        name: "email",
        baseEndpoint: "api/v1/auth/",
        token: {
          class: NbAuthJWTToken,
          key: "token",
        },
        login: {
          defaultErrors: ["auth.common.errors.smth_wrong"],
          defaultMessages: ["auth.common.messages.success_login"],
        },
        register: {
          defaultErrors: ["auth.common.errors.smth_wrong"],
          defaultMessages: ["auth.common.messages.success_register"],
        },
        logout: {
          defaultErrors: ["auth.common.errors.smth_wrong"],
          defaultMessages: ["auth.common.messages.logout"],
        },
        refreshToken: {
          defaultErrors: ["auth.common.errors.smth_wrong"],
          defaultMessages: ["auth.common.messages.refresh_token"],
        },
        requestPass: {
          endpoint: "forgot-password",
          defaultErrors: ["auth.common.errors.smth_wrong"],
          defaultMessages: ["auth.common.messages.request_password"],
        },
        resetPass: {
          endpoint: "reset-password",
          method: "post",
          redirect: {
            success: "/auth/login",
          },
          defaultErrors: ["auth.common.errors.smth_wrong"],
          defaultMessages: ["auth.common.messages.reset_password"],
        },
      }),
    ],
    forms: {
      login: {
        socialLinks: socialLinks,
        redirectDelay: 500,
      },
      register: {
        socialLinks: socialLinks,
      },
      requestPassword: {
        redirectDelay: 5000,
      },
      resetPassword: {
        redirectDelay: 5000,
      },
      validation: {
        firstName: {
          required: true,
          minLength: 4,
          maxLength: 20,
        },
        lastName: {
          required: true,
          minLength: 4,
          maxLength: 20,
        },
      },
    },
  }).providers,

  NbSecurityModule.forRoot({
    accessControl: {
      customer: {
        view: "*",
      },
      provider: {
        parent: "customer",
        create: "*",
        edit: "*",
        remove: "*",
      },
    },
  }).providers,

  {
    provide: NbRoleProvider,
    useClass: RoleProvider,
  },
  {
    provide: TELEGRAM_BOT_OPTIONS,
    useValue: {
      botName: environment.botName,
    },
  },
  AnalyticsService,
  LayoutService,
  PlayerService,
  SeoService,
  StateService,
  LanguageService,
  NgxPasswordAuthStrategy,
];

@NgModule({
  imports: [CommonModule],
  exports: [NbAuthModule],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, "CoreModule");
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [...NB_CORE_PROVIDERS],
    };
  }
}
