import Axios from "axios";
import { Application, ApplicationsResponse } from "../models/Application";

export class LuinApplication {
  listApplication(): Promise<ApplicationsResponse> {
    return Axios.get("admin/application").then(
      (response) => response.data as ApplicationsResponse
    );
  }

  getApplication(applicationId: string) {
    return Axios.get(`admin/application/${applicationId}`).then(
      (response) => response.data
    );
  }

  updateApplication(applicationId: string, data: any): Promise<Application> {
    return Axios.put(`admin/application/${applicationId}`, data);
  }

  deleteApplication(applicationId: string) {
    return Axios.delete(`admin/application/${applicationId}`);
  }

  createApplication(application: Application) {
    return Axios.post(`admin/application`, application);
  }

  getCurrentAppIdFromPath(): string {
    const path = window.location.pathname;
    const pathArr = path.split("/");
    const applicationId = pathArr[1];
    return applicationId;
  }

  getCurrentAppTab(): string {
    const path = window.location.pathname;
    const pathArr = path.split("/");
    const currentTab = "/" + pathArr[2];
    return currentTab;
  }
}
