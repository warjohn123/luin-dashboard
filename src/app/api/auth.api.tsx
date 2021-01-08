import axios from "axios";

export class LuinAuth {
  private basePath = "self/account/";

  authenticate(username: string, password: string) {
    return axios.post(`${this.basePath}authenticate`, { username, password });
  }

  authorize(token: string) {
    return axios.post(`${this.basePath}authorize`, {
      authorizationToken: token,
    });
  }
}
