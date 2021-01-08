import Axios from "axios";
import { User, UserCount, UsersResponse } from "../models/User";

export class LuinAccount {
  getAccounts(): Promise<UsersResponse> {
    return Axios.get("admin/account").then(
      (response) => response.data as UsersResponse
    );
  }

  countAccounts(): Promise<UserCount> {
    return Axios.get("admin/account", {
      params: {
        countOnly: true,
      },
    }).then((response) => response.data as UserCount);
  }

  createAccount(account: User): Promise<LuinAccount> {
    return Axios.post(`self/account`, account);
  }

  deleteAccount(accountId: string) {
    return Axios.delete(`self/account/${accountId}`);
  }

  updateSelfAccount(data: any) {
    return Axios.put(`self/account`, data);
  }

  updateUserAccount(account: User, data: any) {
    return Axios.put(`group/account/${account?.accountId}`, data);
  }

  register(account: any) {
    return Axios.post(`self/account`, account);
  }

  getAccount(): Promise<User> {
    return Axios.get("self/account").then(
      (response) => response.data.data as User
    );
  }
}
