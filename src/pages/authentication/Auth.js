import React, { useState } from "react";
import { Tabs, Card } from "antd";
import mainLogo from "../../assets/logo.png";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import styles from "./Auth.module.css";
import { Footer } from "antd/es/layout/layout";

function Auth() {
  const [isCardExpanded, setCardExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState("1");

  const handleTabChange = (activeKey) => {
    setCardExpanded(activeKey === "2");
    setActiveTab(activeKey);
  };

  const handleRegisterSuccess = () => {
    setActiveTab("1");
  };
  const items = [
    {
      key: "1",
      label: "Login",
      children: <LoginForm />,
    },
    {
      key: "2",
      label: "Daftar",
      children: <RegisterForm onRegisterSuccess={handleRegisterSuccess} />,
    },
  ];
  return (
    <div className={styles.formContainer}>
      <Card
        className={styles.card}
        style={{
          ...(isCardExpanded ? { width: "450px" } : null),
          transition: "width 0.3s ease-in-out",
        }}
      >
        <div className={styles.logoContainer}>
          <img src={mainLogo} alt="Logo Perusahaan" className={styles.logo} />
        </div>
        <Tabs
          defaultActiveKey="1"
          activeKey={activeTab}
          onChange={handleTabChange}
          style={{ marginBottom: "-35px" }}
          tabBarStyle={{
            fontWeight: "bold",
            color: "#3f87a6",
          }}
          items={items}
        />
      </Card>
      <Footer className={styles.footer}>
        &copy; {new Date().getFullYear()} Evry Nazyli
      </Footer>
    </div>
  );
}

export default Auth;
