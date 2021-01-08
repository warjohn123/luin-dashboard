import { Button, Form, Input, Modal } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { Component } from "react";
import { LuinApplication } from "../../api/application.api";
import { Application } from "../../models/Application";

interface FormFields {
  name: string;
  description: string;
}

export class LuinCreateApplicationModal extends Component {
  state: any;

  constructor(props: any) {
    super(props);

    this.state = {
      visible: props.visible,
      isSaving: false,
    };
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleFormFinish = (form: any) => {
    this.createApplication(form);
  };

  handleFormFinishFailed = (form: any) => {
    console.log(form);
  };

  private createApplication(form: FormFields) {
    this.setState({ isSaving: true });

    let application: Application = {
      isSandbox: false,
      name: form.name,
      description: form.description,
    };

    new LuinApplication()
      .createApplication(application)
      .then((result) => {
        window.location.pathname = `${result.data.data.applicationId}/overview`;
      })
      .catch((error) => {
        alert(JSON.stringify(error));
      });
  }

  render() {
    return (
      <Modal
        title="Create new application"
        visible={this.state.visible}
        onCancel={this.handleCancel}
        footer={[
          <Button key="cancel" onClick={this.handleCancel}>
            Cancel
          </Button>,
          <Button
            type="primary"
            form="applicationForm"
            key="submit"
            loading={this.state.isSaving}
            htmlType="submit"
          >
            OK
          </Button>,
        ]}
      >
        <Form
          layout="vertical"
          name="applicationForm"
          onFinish={this.handleFormFinish}
          onFinishFailed={this.handleFormFinishFailed}
        >
          <Form.Item
            name="name"
            label="Application Name"
            rules={[
              { required: true, message: "Application name is required." },
            ]}
          >
            <Input
              disabled={this.state.isSaving}
              placeholder="Enter application name"
            />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <TextArea
              disabled={this.state.isSaving}
              placeholder="Enter description"
            ></TextArea>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
