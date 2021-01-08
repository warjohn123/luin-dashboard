import { useForm } from "antd/lib/form/Form";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState } from "react";
import { Button, Form } from "antd";
import { Device } from "../../../models/Device";
import TextArea from "antd/lib/input/TextArea";
import moment from "moment";

import socketIOClient from "socket.io-client";
const ENDPOINT = "https://ws.cognity.io";

interface LuinDataStreamingViewModalType {
  device?: Device;
  username: string;
  setIsDataStreamingViewModalOpen: any;
  visible: boolean;
}

export const LuinDataStreamingViewModal: React.FunctionComponent<LuinDataStreamingViewModalType> = ({
  device,
  visible,
  username,
  setIsDataStreamingViewModalOpen,
}) => {
  const [form] = useForm();
  const [realTimeData, setRealTimeData] = useState<any[]>([]);

  const socket = socketIOClient.connect(ENDPOINT);

  useEffect(() => {
    const getUsername = async () => {
      const topic = "/device/" + username + "/pub/" + device?.deviceId;

      socket.on("server-to-client", (data: any) => {
        // realTimeData.push(data);
        setRealTimeData([...realTimeData, data]);
      });
      socket.on("connect", function () {
        console.log("connect");
      });
      socket.emit("subscribe", {
        topic: topic,
      });
    };
    getUsername();

    return () => {
      socket.disconnect();
    };
  }, [socket, device, username, visible, realTimeData]);

  const sendData = () => {
    socket.emit("publish", {
      topic: "/device/" + username + "/pub/" + device?.deviceId,
      payload: form.getFieldValue("payload"),
    });
  };
  return (
    <Modal
      title="Data Streaming View"
      onCancel={() => {
        setIsDataStreamingViewModalOpen(false);
      }}
      footer={[]}
      visible={visible}
    >
      <Form
        id="deviceForm"
        layout="vertical"
        form={form}
        onFinish={sendData}
        initialValues={device}
      >
        <Form.Item
          name="payload"
          label="Payload"
          key="payload"
          rules={[
            {
              required: true,
              message: "Send Data to Device",
            },
          ]}
        >
          <TextArea
            rows={5}
            style={{ resize: "none" }}
            placeholder="Write your message here"
          ></TextArea>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Send Data
          </Button>
        </Form.Item>
      </Form>

      <label>Incoming Data (Realtime)</label>
      <div
        style={{
          background: "#eee",
          height: 200,
          marginTop: 8,
          overflowY: "auto",
          padding: 7,
        }}
      >
        {realTimeData.map((item, index) => (
          <div key={index}>
            {moment().format("MM-DD-YYYY HH:mm")}: {item.payload}
          </div>
        ))}
      </div>
    </Modal>
  );
};
