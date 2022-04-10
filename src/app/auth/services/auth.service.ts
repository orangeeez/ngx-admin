import { Observable, of as observableOf } from "rxjs";
import { Inject, Injectable } from "@angular/core";
import {
  NbAuthResult,
  NbAuthService,
  NbAuthToken,
  NbTokenService,
  NB_AUTH_STRATEGIES,
} from "@nebular/auth";
import { map, switchMap } from "rxjs/operators";
import { NgxPasswordAuthStrategy } from "../strategies/password-strategy";

@Injectable({
  providedIn: "root",
})
export class AuthService extends NbAuthService {
  constructor(
    protected tokenService: NbTokenService,
    @Inject(NB_AUTH_STRATEGIES) protected strategies
  ) {
    super(tokenService, strategies);
  }

  tgLogin(
    strategyName: string,
    type: string,
    data?: any
  ): Observable<NbAuthResult> {
    var strategy = this.getStrategy(strategyName) as NgxPasswordAuthStrategy;
    return strategy.tgLogin(type, data).pipe(
      switchMap((result: NbAuthResult) => {
        return this.processAuthResult(result);
      })
    );
  }

  private processAuthResult(result: NbAuthResult) {
    if (result.isSuccess() && result.getToken()) {
      return this.tokenService.set(result.getToken()).pipe(
        map((token: NbAuthToken) => {
          return result;
        })
      );
    }

    return observableOf(result);
  }
}
