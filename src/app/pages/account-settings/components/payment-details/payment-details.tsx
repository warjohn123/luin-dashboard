import React, { useState } from "react";
import { Card, Form, Input, Row, Col, Button } from "antd";
import Title from "antd/lib/typography/Title";
import { useForm } from "antd/lib/form/Form";

export function LuinPaymentDetails() {
  const [form] = useForm();
  const [cardNumber, setCardNumber] = useState<string>();
  const [expiration, setExpiration] = useState<string>();
  const [securityCode, setSecurityCode] = useState<string>();
  const [isSaving, setIsSaving] = useState<boolean>();

  const handleFormSubmit = () => {};

  return (
    <Card>
      <Title level={4} className="title">
        Payment Details
      </Title>

      <Form layout="vertical" form={form} onFinish={handleFormSubmit}>
        <Form.Item
          label="Card Number"
          rules={[{ required: true, message: "Card Number is required." }]}
        >
          <Input
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="Enter card number"
          />
        </Form.Item>

        <Row>
          <Col span={12} style={{ paddingRight: 16 }}>
            <Form.Item
              label="Expiration"
              rules={[{ required: true, message: "Expiration is required." }]}
            >
              <Input
                value={cardNumber}
                onChange={(e) => setExpiration(e.target.value)}
                placeholder="Enter expiration"
              />
            </Form.Item>
          </Col>
          <Col span={12} style={{ paddingLeft: 16 }}>
            <Form.Item
              label="Security code"
              rules={[
                { required: true, message: "Security code is required." },
              ]}
            >
              <Input
                value={cardNumber}
                onChange={(e) => setSecurityCode(e.target.value)}
                placeholder="Enter security code"
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button
            htmlType="submit"
            style={{ marginRight: 16 }}
            loading={isSaving}
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
