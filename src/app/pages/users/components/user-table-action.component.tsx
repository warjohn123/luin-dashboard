import { Space } from "antd";
import { ReactComponent as Trash } from "../../../../assets/icons/trash.svg";
import { ReactComponent as Edit } from "../../../../assets/icons/edit.svg";

import styles from "../users.module.scss";
import React, { useState } from "react";
import { LuinDeleteUserModal } from "../modals/delete-user.modal";
import { User } from "../../../models/User";
import { LuinSaveUserModal } from "../modals/save-user.modal";

interface LuinUserTableActionType {
  user: User;
}

export const LuinUserTableAction: React.FunctionComponent<LuinUserTableActionType> = ({
  user,
}) => {
  const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] = useState<boolean>(
    false
  );
  const [isSaveUserModalOpen, setIsSaveUserModalOpen] = useState<boolean>(
    false
  );
  return (
    <Space size="small">
      <Edit
        className={styles.cursorPointer}
        onClick={(event) => {
          setIsSaveUserModalOpen(true);
        }}
      ></Edit>
      <Trash
        className={styles.cursorPointer}
        onClick={() => setIsDeleteUserModalOpen(true)}
      ></Trash>
      <LuinDeleteUserModal
        visible={isDeleteUserModalOpen}
        setIsDeleteUserModalOpen={setIsDeleteUserModalOpen}
        user={user}
      ></LuinDeleteUserModal>
      <LuinSaveUserModal
        visible={isSaveUserModalOpen}
        setIsSaveUserModalOpen={setIsSaveUserModalOpen}
        user={user}
      ></LuinSaveUserModal>
    </Space>
  );
};
