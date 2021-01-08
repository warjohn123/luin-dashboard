import React, { useState } from "react";
import { Card } from "antd";
import styles from "../device-item.module.scss";
import { DeviceIntegration } from "../../../../models/Device";
import moment from "moment";
import { ReactComponent as Trash } from "../../../../../assets/icons/trash.svg";
import { LuinDeleteDeviceIntegrationModal } from "../../modals/delete-device-integration.modal";
import { LuinSaveIntegrationModal } from "../../modals/save-integration.modal";

interface DeviceIntegrationItemType {
  integration: DeviceIntegration;
}

export const LuinDeviceIntegrationItem: React.FunctionComponent<DeviceIntegrationItemType> = ({
  integration,
}) => {
  const [
    isOpenDeleteDeviceIntegrationModal,
    setIsOpenDeleteDeviceIntegrationModal,
  ] = useState<boolean>(false);
  const [
    isOpenSaveDeviceIntegrationModal,
    setIsOpenSaveDeviceIntegrationModal,
  ] = useState<boolean>(false);

  return (
    <>
      <LuinSaveIntegrationModal
        integration={integration}
        setSaveIntegrationModalOpen={setIsOpenSaveDeviceIntegrationModal}
        visible={isOpenSaveDeviceIntegrationModal}
      ></LuinSaveIntegrationModal>
      <Card
        onClick={(e) => {
          e.stopPropagation();
          setIsOpenSaveDeviceIntegrationModal(true);
        }}
        className={styles.deviceIntegrationItem}
      >
        <Trash
          style={{ float: "right", cursor: "pointer" }}
          onClick={(e) => {
            e.stopPropagation();
            setIsOpenDeleteDeviceIntegrationModal(true);
          }}
        ></Trash>
        <LuinDeleteDeviceIntegrationModal
          integration={integration}
          setIsDeleteDeviceIntegrationModalOpen={
            setIsOpenDeleteDeviceIntegrationModal
          }
          visible={isOpenDeleteDeviceIntegrationModal}
        ></LuinDeleteDeviceIntegrationModal>
        <div>{integration.integrationId}</div>
        <div style={{ marginTop: 7, color: "#aaa" }}>
          Added last{" "}
          {moment(integration.dateCreated).format("MMMM DD, yyyy hh:mm a")}
        </div>
      </Card>
    </>
  );
};
