import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SchedulesResponse, Schedule } from "../../../models/Schedule";
import { RootState } from "../../../states/rootReducer";
import { loadSchedules } from "../../../states/schedule";
import { LuinSaveScheduleModal } from "../modals/save-schedule.modal";
import { config } from "./schedules-table.config";

export function LuinSchedulesListTable() {
  const dispatch = useDispatch();

  const [selectedSchedule, setSelectedSchedule] = useState<Schedule>();
  const [isSaveScheduleModalOpen, setIsSaveScheduleModalOpen] = useState<
    boolean
  >(false);

  const schedules: SchedulesResponse = useSelector(
    (state: RootState) => state.schedule.schedules || []
  );

  const isLoadingSchedules: boolean = useSelector(
    (state: RootState) => state.schedule.isLoadingSchedules || false
  );

  const searchKey: string = useSelector(
    (state: RootState) => state.user.usersSearch || ""
  );
  let allSchedules: Schedule[] = schedules.data;
  let displayedSchedules: Schedule[] = schedules.data;

  if (searchKey) {
    displayedSchedules = allSchedules.filter((schedule) =>
      schedule.syntax.toLowerCase().includes(searchKey.toLowerCase())
    );
  } else {
    displayedSchedules = allSchedules;
  }

  useEffect(() => {
    dispatch(loadSchedules());
  }, [dispatch]);

  return (
    <>
      <Table
        loading={isLoadingSchedules}
        dataSource={displayedSchedules}
        onRow={(record, rowIndex) => {
          return {
            onMouseEnter: () => {},
            onMouseLeave: () => {},
          };
        }}
        columns={config}
      />
      <LuinSaveScheduleModal
        schedule={selectedSchedule}
        setIsSaveScheduleModalOpen={setIsSaveScheduleModalOpen}
        visible={isSaveScheduleModalOpen}
      ></LuinSaveScheduleModal>
    </>
  );
}
