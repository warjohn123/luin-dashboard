import Axios from "axios";
import {
  Device,
  DeviceCount,
  DeviceIntegration,
  DeviceIntegrationsResponse,
  DevicesResponse,
} from "../models/Device";

export class LuinDevice {
  getAdminDevices(): Promise<DevicesResponse> {
    return Axios.get("admin/device").then(
      (response) => response.data as DevicesResponse
    );
  }

  countAdminDevices(): Promise<DeviceCount> {
    return Axios.get("admin/device", {
      params: {
        countOnly: true,
      },
    }).then((response) => response.data as DeviceCount);
  }

  createDevice(device: Device): Promise<LuinDevice> {
    return Axios.post(`self/device`, device);
  }

  deleteDevice(deviceId: string) {
    return Axios.delete(`self/device/${deviceId}`);
  }

  updateDevice(device: Device, data: any) {
    return Axios.put(`self/device/${device.deviceId}`, data);
  }

  getDeviceByid(deviceId: string) {
    return Axios.get(`self/device/${deviceId}`);
  }

  createDeviceIntegration(integration: DeviceIntegration) {
    return Axios.post(`/self/integration/device`, integration);
  }

  listDeviceIntegrations(
    deviceId: string
  ): Promise<DeviceIntegrationsResponse> {
    return Axios.get(`self/integration/device/${deviceId}`).then(
      (response) => response.data as DeviceIntegrationsResponse
    );
  }

  listDeviceStorage(deviceId: string, username: string): Promise<any> {
    return Axios.get(`admin/storage/user/${username}/device/${deviceId}`).then(
      (result) => result.data as any
    );
  }
}
