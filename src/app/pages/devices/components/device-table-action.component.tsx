import { Space } from "antd";
import { ReactComponent as Trash } from "../../../../assets/icons/trash.svg";
import { ReactComponent as Edit } from "../../../../assets/icons/edit.svg";

import styles from "../devices.module.scss";
import React, { useState } from "react";
import { LuinDeleteDeviceModal } from "../modals/delete-device.modal";
import { Device } from "../../../models/Device";
import { LuinSaveDeviceModal } from "../modals/save-device.modal";

interface LuinDeviceTableActionType {
  device: Device;
}

export const LuinDeviceTableAction: React.FunctionComponent<LuinDeviceTableActionType> = ({
  device,
}) => {
  const [isDeleteDeviceModalOpen, setIsDeleteDeviceModalOpen] = useState<
    boolean
  >(false);
  const [isSaveDeviceModalOpen, setIsSaveDeviceModalOpen] = useState<boolean>(
    false
  );

  return (
    <Space size="small">
      <Edit
        className={styles.cursorPointer}
        onClick={(event) => {
          setIsSaveDeviceModalOpen(true);
        }}
      ></Edit>
      <Trash
        className={styles.cursorPointer}
        onClick={() => setIsDeleteDeviceModalOpen(true)}
      ></Trash>
      <LuinDeleteDeviceModal
        visible={isDeleteDeviceModalOpen}
        setIsDeleteDeviceModalOpen={setIsDeleteDeviceModalOpen}
        device={device}
      ></LuinDeleteDeviceModal>
      <LuinSaveDeviceModal
        visible={isSaveDeviceModalOpen}
        setIsSaveDeviceModalOpen={setIsSaveDeviceModalOpen}
        device={device}
      ></LuinSaveDeviceModal>
    </Space>
  );
};
