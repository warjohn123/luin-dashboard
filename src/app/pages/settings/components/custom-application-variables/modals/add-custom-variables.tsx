import { Button, Form, Input, Modal, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import { Option } from "antd/lib/mentions";
import React, { useState } from "react";
import ReactJson from "react-json-view";
import { Application } from "../../../../../models/Application";
import { LuinApplication } from "../../../../../api/application.api";

interface LuinAddCustomVariablesType {
  visible: boolean;
  application: Application;
  setIsAddCustomVariableOpen: any;
}

export const LuinAddCustomVariablesModal: React.FunctionComponent<LuinAddCustomVariablesType> = ({
  visible,
  application,
  setIsAddCustomVariableOpen,
}) => {
  const [form] = useForm();

  const [isSaving, setIsSaving] = useState<boolean>(false);

  const handleOnModalOk = async () => {
    setIsSaving(true);

    // const applicationObj: Application = {
    //   ...application,
    //   custom: {
    //     ...application?.custom,
    //   }
    // };

    application.custom[form.getFieldValue("propertyName")] = resource;

    let custom = application.custom;

    console.log(
      'form.getFieldValue("propareyag")',
      form.getFieldValue("propertyName")
    );
    console.log("resource", resource);
    console.log("custom", custom);

    await new LuinApplication().updateApplication(
      application?.applicationId || "",
      { custom: custom }
    );

    setIsSaving(false);

    setIsAddCustomVariableOpen(false);
  };

  const dataTypes = ["Number", "String", "Map"];
  const [dataType, setDataType] = useState<any>();
  const [resource, setResource] = useState<any>();

  return (
    <Modal
      title="Add Custom Variables"
      onCancel={() => {
        setIsAddCustomVariableOpen(false);
      }}
      footer={[
        <Button onClick={() => setIsAddCustomVariableOpen(false)}>
          Cancel
        </Button>,
        <Button
          type="primary"
          form="variableForm"
          key="submit"
          loading={isSaving}
          htmlType="submit"
        >
          Ok
        </Button>,
      ]}
      visible={visible}
    >
      <Form
        id="variableForm"
        layout="vertical"
        form={form}
        onFinish={handleOnModalOk}
      >
        <Form.Item name="propertyName" label="Custom Variable Name">
          <Input placeholder="Enter custom variable name" />
        </Form.Item>
        <Form.Item name="dataType" label="Data Type">
          <Select
            placeholder="Select data type"
            onChange={(value) => {
              setDataType(value);
            }}
          >
            {dataTypes.map((dataType) => (
              <>
                <Option value={dataType}>{dataType}</Option>
              </>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="value" label="Value">
          {!dataType && <Input placeholder="Enter value" disabled></Input>}
          {(dataType === "Number" || dataType === "String") && (
            <Input
              placeholder="Enter value"
              onChange={($event) => {
                let value =
                  dataType === "Number"
                    ? parseInt($event.target.value)
                    : $event.target.value;
                setResource(value);
              }}
              type={dataType === "Number" ? "number" : "text"}
            ></Input>
          )}
          {dataType === "Map" && (
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
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
};
