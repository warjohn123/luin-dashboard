import React, { useState } from "react";
import { Col, Row } from "antd";
import { ReactComponent as Plus } from "../../../assets/icons/circle-plus.svg";
import { LuinSaveApplicationModal } from "../modals/save-application";
import { useDispatch } from "react-redux";
import { loadCurrentApplication } from "../../states/application";
import { Application } from "../../models/Application";
import { LuinApplicationChip } from "../application-chip/application-chip.component";
import styles from "./applications-bar.module.css";
interface LuinApplicationsBarType {
  isLoadingApplications: boolean;
  applications: Application[];
}

export const LuinApplicationsBar: React.FunctionComponent<LuinApplicationsBarType> = ({
  isLoadingApplications,
  applications,
}) => {
  const dispatch = useDispatch();

  const [isSaveApplicationOpen, setIsSaveApplicationOpen] = useState<boolean>(
    false
  );

  function selectApplication(application: Application) {
    dispatch(loadCurrentApplication(application));
  }

  const handleApplicationChipClick = (applicationId: string) => {
    window.location.pathname = `${applicationId}/overview`;
  };

  return (
    <React.Fragment>
      <div className={styles.ApplicationBarContainer}>
        <Row>
          {!isLoadingApplications &&
            applications.map((item) => (
              <Col
                key={item.applicationId}
                onClick={() => selectApplication(item)}
              >
                <LuinApplicationChip
                  chipClick={() =>
                    handleApplicationChipClick(item.applicationId || "")
                  }
                  title={item.name}
                ></LuinApplicationChip>
              </Col>
            ))}
          <Col>
            <div
              className={`${styles.ApplicationItem} ${styles.CreateApplication}`}
              onClick={() => setIsSaveApplicationOpen(true)}
            >
              <Plus style={{ verticalAlign: "middle" }}></Plus>

              <span className={styles.title} style={{ color: "#2C80FF" }}>
                Create New Application
              </span>
            </div>
            <LuinSaveApplicationModal
              visible={isSaveApplicationOpen}
              setIsSaveApplicationOpen={setIsSaveApplicationOpen}
            ></LuinSaveApplicationModal>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};
