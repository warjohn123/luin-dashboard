import Axios from "axios";
import { Schedule, ScheduleCount, SchedulesResponse } from "../models/Schedule";

export class LuinSchedule {
  listSchedules(): Promise<SchedulesResponse> {
    return Axios.get("self/schedule").then(
      (response) => response.data as SchedulesResponse
    );
  }

  createSchedule(schedule: Schedule) {
    return Axios.post(`self/schedule`, schedule);
  }

  countSchedules(): Promise<ScheduleCount> {
    return Axios.get("self/schedule", {
      params: {
        countOnly: true,
      },
    }).then((response) => response.data as ScheduleCount);
  }

  deleteSchedule(scheduleId: string) {
    return Axios.delete(`self/schedule/${scheduleId}`);
  }

  updateSchedule(schedule: Schedule, data: any) {
    return Axios.put(`self/schedule/${schedule.taskId}`, data);
  }
}
