import { Space } from "antd";
import { ReactComponent as Trash } from "../../../../assets/icons/trash.svg";
import { ReactComponent as Edit } from "../../../../assets/icons/edit.svg";

import styles from "../schedules.module.scss";
import React, { useState } from "react";
import { LuinDeleteScheduleModal } from "../modals/delete-schedule.modal";
import { Schedule } from "../../../models/Schedule";
import { LuinSaveScheduleModal } from "../modals/save-schedule.modal";

interface LuinScheduleTableActionType {
  schedule: Schedule;
}

export const LuinScheduleTableAction: React.FunctionComponent<LuinScheduleTableActionType> = ({
  schedule,
}) => {
  const [isDeleteScheduleModalOpen, setIsDeleteScheduleModalOpen] = useState<
    boolean
  >(false);
  const [isSaveScheduleModalOpen, setIsSaveScheduleModalOpen] = useState<
    boolean
  >(false);
  return (
    <Space size="small">
      <Edit
        className={styles.cursorPointer}
        onClick={(event) => {
          setIsSaveScheduleModalOpen(true);
        }}
      ></Edit>
      {/* <Trash
        className={styles.cursorPointer}
        onClick={(event) => {
          setIsDeleteScheduleModalOpen(true);
        }}
      ></Trash> */}
      {/* <LuinDeleteScheduleModal
        visible={isDeleteScheduleModalOpen}
        setIsDeleteScheduleModalOpen={setIsDeleteScheduleModalOpen}
        schedule={schedule}
      ></LuinDeleteScheduleModal> */}
      <LuinSaveScheduleModal
        visible={isSaveScheduleModalOpen}
        setIsSaveScheduleModalOpen={setIsSaveScheduleModalOpen}
        schedule={schedule}
      ></LuinSaveScheduleModal>
    </Space>
  );
};
