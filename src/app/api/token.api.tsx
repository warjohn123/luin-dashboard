import Cookies from "universal-cookie";
import { LuinAuth } from "./auth.api";
const cookies = new Cookies();

export class LuinToken {
  private tokenKey = "LuinAccessToken";
  private usernameKey = "LuinUsername";

  saveAccessToken(token: string) {
    cookies.set(this.tokenKey, token);
  }

  saveUsername(username: string) {
    cookies.set(this.usernameKey, username);
  }

  getAccessToken(): string {
    return cookies.get(this.tokenKey);
  }

  getUsername(): string {
    return cookies.get(this.usernameKey);
  }

  getTokenData(token: string) {
    return new LuinAuth().authorize(token);
  }

  deleteAccessToken() {
    cookies.remove(this.tokenKey);
  }

  deleteUsername() {
    cookies.remove(this.usernameKey);
  }
}
