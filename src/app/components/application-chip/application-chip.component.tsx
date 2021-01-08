import React from "react";
import { LuinApplicationInitial } from "../application-initial/application-initial.component";
import styles from "./application-chip.module.css";

interface ApplicationChipProps {
  title: string;
  chipClick?: any;
}

export const LuinApplicationChip = (props: ApplicationChipProps) => {
  return (
    <div className={styles.ApplicationChip} onClick={props.chipClick}>
      {props.title && (
        <LuinApplicationInitial title={props.title}></LuinApplicationInitial>
      )}
      <span className={styles.ApplicationTitle}>{props.title}</span>
    </div>
  );
};
