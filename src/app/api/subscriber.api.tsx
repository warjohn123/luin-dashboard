import Axios from "axios";
import { SubscriberCount, SubscribersResponse } from "../models/Subscriber";
import { LuinToken } from "./token.api";

export class LuinSubscriber {
  createSubscriber(subscriptionEmail: string) {
    return Axios.post("public/leads/subscription", {
      ownerId: new LuinToken().getUsername(),
      subscriptionEmail,
    }).then((response) => response.data);
  }

  getSubscribers(): Promise<SubscribersResponse> {
    return Axios.get("admin/leads/subscription").then(
      (response) => response.data as SubscribersResponse
    );
  }

  countSubscribers(): Promise<SubscriberCount> {
    return Axios.get("admin/leads/subscription", {
      params: {
        countOnly: true,
      },
    }).then((response) => response.data as SubscriberCount);
  }
}
