import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
  NbAuthResult,
  NbAuthStrategyClass,
  NbPasswordAuthStrategy,
} from "@nebular/auth";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import {
  NgxPasswordAuthStrategyOptions,
  passwordStrategyOptions,
} from "./password-strategy-options";
@Injectable()
export class NgxPasswordAuthStrategy extends NbPasswordAuthStrategy {
  protected defaultOptions: NgxPasswordAuthStrategyOptions =
    passwordStrategyOptions;

  static setup(
    options: NgxPasswordAuthStrategyOptions
  ): [NbAuthStrategyClass, NgxPasswordAuthStrategyOptions] {
    return [NgxPasswordAuthStrategy, options];
  }

  tgLogin(type: string, data?: any): Observable<NbAuthResult> {
    const module = "telegram";
    const method = this.getOption(`${module}.method`);
    const url = this.getActionEndpoint(module) + type;
    const requireValidToken = this.getOption(`${module}.requireValidToken`);
    return this.http
      .request(method, url, { body: data, observe: "response" })
      .pipe(
        map((res) => {
          if (this.getOption(`${module}.alwaysFail`)) {
            throw this.createFailResponse(data);
          }
          return res;
        }),
        map((res) => {
          return new NbAuthResult(
            true,
            res,
            this.getOption(`${module}.redirect.success`),
            [],
            this.getOption("messages.getter")(module, res, this.options),
            this.createToken(
              this.getOption("token.getter")(module, res, this.options),
              requireValidToken
            )
          );
        }),
        catchError((res) => {
          return this.handleResponseError(res, module);
        })
      );
  }
}
