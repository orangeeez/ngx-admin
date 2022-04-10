import { NbPasswordAuthStrategyOptions } from "@nebular/auth";

export class NgxPasswordAuthStrategyOptions extends NbPasswordAuthStrategyOptions {
  telegram?: any = {
    alwaysFail: false,
    endpoint: "telegram",
    method: "post",
    requireValidToken: false,
    redirect: {
      success: "/",
      failure: null,
    },
    defaultErrors: ["Something went wrong, please try again."],
    defaultMessages: ["You have been successfully logged in."],
  };
}

export const passwordStrategyOptions: NgxPasswordAuthStrategyOptions =
  new NgxPasswordAuthStrategyOptions();
