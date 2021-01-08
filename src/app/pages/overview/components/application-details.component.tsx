import { Col, Row } from "antd";
import React, { useState, useEffect } from "react";
import { LuinApplication } from "../../../api/application.api";
import { defaultDateTimeFormat } from "../../../helpers";
import { LuinSaveApplicationModal } from "../../../components/modals/save-application";
import { Application } from "../../../models/Application";

export function LuinApplicationDetails() {
  const [application, setApplication] = useState<Application>();
  const [isSaveApplicationModalOpen, setIsSaveApplicationModalOpen] = useState<
    boolean
  >(false);

  useEffect(() => {
    const applicationdId = new LuinApplication().getCurrentAppIdFromPath();
    new LuinApplication().getApplication(applicationdId).then((result: any) => {
      setApplication(result["data"][0]);
    });
  }, []);

  return (
    <>
      <Row>
        <Col span={8}>
          <p className="label">Application Name</p>
          <p className="value">{application?.name}</p>
        </Col>

        <Col span={12}>
          <p className="label">Description</p>
          <p className="value">{application?.description}</p>
        </Col>

        <Col span={4}>
          <p className="label">Date Created</p>
          {application?.dateCreated && (
            <p className="value">
              {defaultDateTimeFormat(application?.dateCreated)}
            </p>
          )}
        </Col>
      </Row>
      <p
        className="edit-details"
        onClick={() => setIsSaveApplicationModalOpen(true)}
      >
        Edit Details
      </p>
      <LuinSaveApplicationModal
        visible={isSaveApplicationModalOpen}
        setApplication={setApplication}
        application={application}
        setIsSaveApplicationOpen={setIsSaveApplicationModalOpen}
      ></LuinSaveApplicationModal>
    </>
  );
}
