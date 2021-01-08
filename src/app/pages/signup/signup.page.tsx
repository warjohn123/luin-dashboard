import { Card, Row } from "antd";
import Title from "antd/lib/typography/Title";
import React from "react";
import { LuinSignupForm } from "./components/signup-form.component";
import styles from "./signup.module.scss";
import { ReactComponent as Logo } from "../../../assets/icons/white-logo.svg";
import { Link } from "react-router-dom";

export const LuinSignupPage = () => {
  return (
    <Row justify="center" align="middle" className={styles.SignupPage}>
      <div style={{ textAlign: "center" }}>
        <Logo className={styles.Logo}></Logo>
        <Card className={styles.SignupCard} bodyStyle={{ padding: 0 }}>
          <div className={styles.FormContainer}>
            <Title level={4} className={styles.SignupTitle}>
              Sign up
            </Title>
            <LuinSignupForm></LuinSignupForm>
          </div>
          <div className={styles.Footer}>
            <Link to={`/login`} className={styles.SignupText}>
              Back to login
            </Link>
          </div>
        </Card>
      </div>
    </Row>
  );
};
