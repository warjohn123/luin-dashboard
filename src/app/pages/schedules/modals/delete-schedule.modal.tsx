import { Button, Modal } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { LuinSchedule } from "../../../api/schedule.api";
import { Schedule, ScheduleStatus } from "../../../models/Schedule";
import { loadSchedules, loadSchedulesCount } from "../../../states/schedule";
import {
  openSuccessNotification,
  openErrorNotification,
} from "../../../states/toaster";

interface LuinDeleteScheduleModalType {
  schedule: Schedule;
  setIsDeleteScheduleModalOpen: any;
  visible: boolean;
}

export const LuinDeleteScheduleModal: React.FunctionComponent<LuinDeleteScheduleModalType> = ({
  schedule,
  visible,
  setIsDeleteScheduleModalOpen,
}) => {
  const dispatch = useDispatch();
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const deleteSchedule = async () => {
    setIsSaving(true);
    try {
      await new LuinSchedule().updateSchedule(schedule, {
        status: ScheduleStatus.cancelled,
      });
      setIsSaving(false);
      dispatch(openSuccessNotification());
      setIsDeleteScheduleModalOpen(false);
      dispatch(loadSchedules());
      dispatch(loadSchedulesCount());
    } catch (e) {
      console.log("e", e);
      setIsSaving(false);
      dispatch(openErrorNotification());
    }
  };

  return (
    <Modal
      title="Cancel Confirmation"
      onCancel={() => {
        setIsDeleteScheduleModalOpen(false);
      }}
      footer={[
        <Button onClick={() => setIsDeleteScheduleModalOpen(false)}>
          Cancel
        </Button>,
        <Button
          type="primary"
          key="submit"
          onClick={deleteSchedule}
          loading={isSaving}
          htmlType="submit"
        >
          Ok
        </Button>,
      ]}
      visible={visible}
    >
      <Text>Cancel {schedule.taskId} schedule?</Text>
    </Modal>
  );
};
