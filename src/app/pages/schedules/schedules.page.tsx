import { Button, Card, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ScheduleCount } from "../../models/Schedule";
import { RootState } from "../../states/rootReducer";
import { loadSchedulesCount, setSchedulesSearch } from "../../states/schedule";
import { ReactComponent as Filter } from "../../../assets/icons/filters.svg";
import { ReactComponent as Search } from "../../../assets/icons/search.svg";
import { LuinSchedulesListTable } from "./components/schedules-list-table.component";
import styles from "./schedules.module.scss";
import { LuinSaveScheduleModal } from "./modals/save-schedule.modal";

export function LuinSchedules() {
  const dispatch = useDispatch();

  const [isSaveScheduleModalOpen, setIsSaveScheduleModalOpen] = useState<
    boolean
  >(false);

  const schedulesCount: ScheduleCount = useSelector(
    (state: RootState) => state.schedule.schedulesCount || 0
  );

  const isLoadingScheduleCount: boolean = useSelector(
    (state: RootState) => state.schedule.isLoadingSchedulesCount || false
  );

  const searchKey: string = useSelector(
    (state: RootState) => state.schedule.schedulesSearch || ""
  );

  const addSchedule = () => {
    setIsSaveScheduleModalOpen(true);
  };

  const handleSearchChange = (e: any) => {
    dispatch(setSchedulesSearch(e.target.value));
  };

  useEffect(() => {
    dispatch(loadSchedulesCount());
  }, [dispatch]);

  return (
    <Card>
      <div className={styles.filtersContainer}>
        <div>
          <Input
            className={styles.input}
            value={searchKey}
            onChange={handleSearchChange}
            prefix={<Search style={{ marginRight: "10px" }}></Search>}
            placeholder="Search schedule name"
          ></Input>
          <Filter className={styles.svg}></Filter>
        </div>

        {!isLoadingScheduleCount && (
          <div>
            <div className={styles.totalText}>
              {schedulesCount.count} total schedules added
            </div>
            <Button
              onClick={addSchedule}
              type="primary"
              className={styles.addBtn}
            >
              Add Schedule
            </Button>
            <LuinSaveScheduleModal
              setIsSaveScheduleModalOpen={setIsSaveScheduleModalOpen}
              visible={isSaveScheduleModalOpen}
            ></LuinSaveScheduleModal>
          </div>
        )}
      </div>
      <LuinSchedulesListTable></LuinSchedulesListTable>
    </Card>
  );
}
