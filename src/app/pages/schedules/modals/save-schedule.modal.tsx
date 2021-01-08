import { Button, Form, Input, Modal, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Schedule, SyntaxType } from "../../../models/Schedule";
import ReactJson from "react-json-view";

import { loadSchedules, loadSchedulesCount } from "../../../states/schedule";
import { LuinSchedule } from "../../../api/schedule.api";
import { methods, statuses, syntaxes } from "./schedule-values";
import {
  openSuccessNotification,
  openErrorNotification,
} from "../../../states/toaster";

interface LuinSaveScheduleModalType {
  schedule?: Schedule;
  setIsSaveScheduleModalOpen: any;
  visible: boolean;
}

export const LuinSaveScheduleModal: React.FunctionComponent<LuinSaveScheduleModalType> = ({
  schedule,
  visible,
  setIsSaveScheduleModalOpen,
}) => {
  const [form] = useForm();
  const dispatch = useDispatch();
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [resource, setResource] = useState<any>();
  const [payload, setPayload] = useState<any>();
  const [syntax, setSyntax] = useState<any>();

  const saveSchedule = async () => {
    setIsSaving(true);
    try {
      let scheduleObj: Schedule = {
        ...form.getFieldsValue(),
        payload: payload,
        resource: resource,
      };

      if (schedule) {
        await new LuinSchedule().updateSchedule(schedule, scheduleObj);
      } else {
        await new LuinSchedule().createSchedule(scheduleObj);
      }
      dispatch(loadSchedules());
      dispatch(openSuccessNotification());
      setIsSaving(false);
      setIsSaveScheduleModalOpen(false);
      dispatch(loadSchedulesCount());
      //   window.location.pathname = `${result.data.data.applicationId}/overview`;
    } catch (e) {
      setIsSaving(false);
      dispatch(openErrorNotification());
    }
  };

  useEffect(() => {
    setSyntax(schedule?.syntax);
    setResource(schedule?.resource);
    setPayload(schedule?.payload);
  }, [schedule]);

  return (
    <Modal
      title={schedule ? "Edit Schedule" : "Add Schedule"}
      onCancel={() => {
        setIsSaveScheduleModalOpen(false);
      }}
      footer={[
        <Button onClick={() => setIsSaveScheduleModalOpen(false)}>
          Cancel
        </Button>,
        <Button
          type="primary"
          key="submit"
          form="scheduleForm"
          loading={isSaving}
          htmlType="submit"
        >
          Ok
        </Button>,
      ]}
      visible={visible}
    >
      <Form
        id="scheduleForm"
        layout="vertical"
        initialValues={schedule}
        form={form}
        onFinish={saveSchedule}
      >
        <Form.Item
          name="syntax"
          label="Syntax"
          key="syntax"
          rules={[
            {
              required: true,
              message: "Please select syntax",
            },
          ]}
        >
          <Select
            placeholder="Select syntax"
            onChange={(value) => setSyntax(value)}
          >
            {syntaxes.map((syntax) => (
              <>
                <Select.Option key={syntax.value} value={syntax.value}>
                  {syntax.label}
                </Select.Option>
              </>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="expressionValue"
          key="expressionValue"
          label="Expression Value"
          rules={[
            {
              required: true,
              message: "Please input expression value",
            },
          ]}
        >
          <Input
            placeholder="Input value"
            type={
              syntax === SyntaxType.cron
                ? "text"
                : syntax === SyntaxType.scheduleDate
                ? "datetime-local"
                : syntax === SyntaxType.timeout
                ? "number"
                : ""
            }
            disabled={!syntax}
          ></Input>
        </Form.Item>
        <Form.Item
          name="method"
          key="method"
          label="Method"
          rules={[
            {
              required: true,
              message: "Please select a method",
            },
          ]}
        >
          <Select placeholder="Select method">
            {methods.map((method) => (
              <>
                <Select.Option key={method.value} value={method.value}>
                  {method.label}
                </Select.Option>
              </>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="status"
          key="status"
          label="Status"
          rules={[
            {
              required: true,
              message: "Please select a status",
            },
          ]}
        >
          <Select placeholder="Select a status">
            {statuses.map((status) => (
              <>
                <Select.Option key={status.value} value={status.value}>
                  {status.label}
                </Select.Option>
              </>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Resource" key="resource">
          <ReactJson
            src={resource}
            onAdd={(value) => {
              setResource(value.updated_src);
            }}
            onEdit={(value) => {
              setResource(value.updated_src);
            }}
            onDelete={(value) => {
              setResource(value.updated_src);
            }}
          />
        </Form.Item>
        <Form.Item label="Payload" key="payload">
          <ReactJson
            src={payload}
            onAdd={(value) => {
              setPayload(value.updated_src);
            }}
            onEdit={(value) => {
              setPayload(value.updated_src);
            }}
            onDelete={(value) => {
              setPayload(value.updated_src);
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
