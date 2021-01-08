import { Button, Modal } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { LuinAccount } from "../../../api/account.api";
import { User } from "../../../models/User";
import { loadUsers, loadUsersCount } from "../../../states/user";
import {
  openSuccessNotification,
  openErrorNotification,
} from "../../../states/toaster";

interface LuinDeleteUserModalType {
  user: User;
  setIsDeleteUserModalOpen: any;
  visible: boolean;
}

export const LuinDeleteUserModal: React.FunctionComponent<LuinDeleteUserModalType> = ({
  user,
  visible,
  setIsDeleteUserModalOpen,
}) => {
  const dispatch = useDispatch();
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const deleteUser = async () => {
    setIsSaving(true);
    try {
      await new LuinAccount().deleteAccount(user.accountId);
      setIsSaving(false);
      setIsDeleteUserModalOpen(false);
      dispatch(openSuccessNotification());
      dispatch(loadUsers());
      dispatch(loadUsersCount());
      //   window.location.pathname = `${result.data.data.applicationId}/overview`;
    } catch (e) {
      dispatch(openErrorNotification());
      setIsSaving(false);
    }
  };

  return (
    <Modal
      title="Delete Confirmation"
      onCancel={() => {
        setIsDeleteUserModalOpen(false);
      }}
      footer={[
        <Button onClick={() => setIsDeleteUserModalOpen(false)}>Cancel</Button>,
        <Button
          type="primary"
          key="submit"
          onClick={deleteUser}
          loading={isSaving}
          htmlType="submit"
        >
          Ok
        </Button>,
      ]}
      visible={visible}
    >
      <Text>Delete {user.username} user?</Text>
    </Modal>
  );
};
