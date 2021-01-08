export interface Subscriber {}

export interface SubscriberCount {
  Count: number;
}

export interface SubscribersResponse {
  lastEvaluatedKey: string;
  Count: SubscriberCount;
  data: Subscriber[];
}
