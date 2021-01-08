import { Avatar, Button } from "antd";
import React, { createRef } from "react";
import { LuinCreateApplicationModal } from "../modals/create-application.modal";
import styles from "./empty-application-placeholder.module.css";

export const LuinEmptyApplicationPlaceholder = () => {
  const createAppModalRef = createRef<LuinCreateApplicationModal>();

  return (
    <div className={styles.emptyApplicationPlaceholder}>
      <LuinCreateApplicationModal
        ref={createAppModalRef}
      ></LuinCreateApplicationModal>

      <Avatar className={styles.avatarPlaceholder}></Avatar>
      <h2>No application yet in your account</h2>
      <Button
        onClick={() => createAppModalRef.current?.showModal()}
        className={styles.createAppButton}
      >
        + Create your first application
      </Button>
    </div>
  );
};
