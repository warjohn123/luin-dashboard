import { Card, Row } from "antd";
import Title from "antd/lib/typography/Title";
import React from "react";
import { LuinLoginForm } from "./components/login-form.component";
import styles from "./login.module.scss";
import "./login.module.scss";
import { ReactComponent as Logo } from "../../../assets/icons/white-logo.svg";
import { Link } from "react-router-dom";

export const LuinLoginPage = () => {
  return (
    <Row justify="center" align="middle" className={styles.LoginPage}>
      <div style={{ textAlign: "center" }}>
        <Logo className={styles.Logo}></Logo>
        <Card className={styles.LoginCard} bodyStyle={{ padding: 0 }}>
          <div className={styles.FormContainer}>
            <Title level={4} className={styles.LoginTitle}>
              Login to your account
            </Title>
            <LuinLoginForm></LuinLoginForm>
          </div>
          <div className={styles.Footer}>
            New to Luin?{" "}
            <Link to={`/signup`} className={styles.SignupText}>
              Sign up
            </Link>
          </div>
        </Card>
      </div>
    </Row>
  );
};
