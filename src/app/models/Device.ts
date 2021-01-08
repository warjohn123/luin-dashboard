export interface Device {
  apiKey: string;
  attributeNames: string[];
  avatar: string;
  custom: any;
  dateCreated: number;
  dateUpdated: number;
  description: string;
  deviceId: string;
  enableStorage: boolean;
  isPrivate: boolean;
  name: string;
  ownerId: string;
}

export interface DeviceCount {
  Count: number;
}

export interface DevicesResponse {
  lastEvaluatedKey: string;
  Count: DeviceCount;
  data: Device[];
}

export interface DeviceIntegration {
  deviceId: string;
  integrationId?: string;
  dateCreated?: number;
  dateUpdated?: number;
}

export interface DeviceIntegrationsResponse {
  lastEvaluatedKey: string;
  data: DeviceIntegration[];
}

export interface DeviceStorage {
  id: string;
  deviceId: string;
  dateCreated: number;
  data: any;
  dataType: any;
}

export interface DeviceStorageResponse {
  lastEvaluatedKey: string;
  data: DeviceStorage[];
}
