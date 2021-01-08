import { Button, Form, Input, Modal } from "antd";
import React, { Component } from "react";
import { LuinSubscriber } from "../../api/subscriber.api";

export class LuinCreateSubscriberModal extends Component {
  state: any;
  props: any;

  constructor(props: any) {
    super(props);

    this.state = {
      visible: false,
      isSaving: false,
    };
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  handleFormFinish = (form: any) => {
    this.createSubscriber(form.email);
  };

  createSubscriber(subscriptionEmail: string) {
    this.setState({
      isSaving: true,
    });
    new LuinSubscriber().createSubscriber(subscriptionEmail).then((result) => {
      this.setState({
        visible: false,
        isSaving: false,
      });
      this.emitCreateSuccess(result);
    });
  }

  emitCreateSuccess = (data: any) => {
    try {
      this.props.onCreateSuccess(data);
    } catch {}
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  render() {
    return (
      <Modal
        title="Create new subscriber"
        visible={this.state.visible}
        onCancel={this.handleCancel}
        footer={[
          <Button key="cancel" onClick={this.handleCancel}>
            Cancel
          </Button>,
          <Button
            type="primary"
            form="createSubscriberForm"
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
          name="createSubscriberForm"
          onFinish={this.handleFormFinish}
        >
          <Form.Item
            name="email"
            label="Subscriber email"
            rules={[
              { required: true, message: "Subscriber email is required." },
              { type: "email", message: "Invalid email" },
            ]}
          >
            <Input placeholder="Enter subscriber email"></Input>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
