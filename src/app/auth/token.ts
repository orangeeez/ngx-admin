import { NbAuthJWTToken } from "@nebular/auth";

export class AuthJWTToken extends NbAuthJWTToken {
  protected accessTokenPayload: any;

  protected parsePayload(): void {
    super.parsePayload();
    this.parseAccessTokenPayload();
  }

  protected parseAccessTokenPayload(): any {
    this.accessTokenPayload = this.payload.roles;
  }

  getAccessTokenPayload(): any {
    return this.accessTokenPayload;
  }
}
