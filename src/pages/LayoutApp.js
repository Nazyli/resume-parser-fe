import React from "react";
import { UserOutlined, CaretDownOutlined } from "@ant-design/icons";
import { blue, grey } from "@ant-design/colors";
import { Layout, Menu, Avatar, Popover, theme } from "antd";
import { Typography } from "antd";
const { Header, Content, Footer } = Layout;

const { Title } = Typography;

export default function LayoutApp({ children }) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick = ({ key }) => {
    if (key === "logout") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      window.location.href = "/";
    }
  };

  const user = JSON.parse(localStorage.getItem("userData"));

  const content = (
    <Menu onClick={handleMenuClick} style={{ border: "none" }}>
      <Menu.Item key="profile">Profile</Menu.Item>
      <Menu.Item key="logout">Logout</Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout>
        <Header
          style={{
            alignItems: "center",
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingRight: "16px",
            }}
          >
            <Title
              level={4}
              style={{
                color: "#FF6347",
                margin: "16px 0",
                fontWeight: "bolder",
                marginLeft: "20px",
              }}
            >
              Resume Parser
            </Title>
            <Popover content={content} placement="bottomRight" trigger="hover">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <Avatar
                  style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
                  size={32}
                  icon={<UserOutlined />}
                />
                <span style={{ marginLeft: "8px", marginRight: "8px" }}>
                  {user.fullName}
                </span>
                <CaretDownOutlined />
              </div>
            </Popover>
          </div>
        </Header>

        <Content
          style={{
            padding: "0 48px",
          }}
        >
          <Title
            level={5}
            style={{
              margin: "16px 0",
              color: grey[5],
            }}
          >
            For Test: Resume Parser Services
          </Title>
          <div
            style={{
              background: colorBgContainer,
              minHeight: 280,
              padding: 24,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>

        <Footer style={{ textAlign: "center" }}>Resume Parser ©2023</Footer>
      </Layout>
    </Layout>
  );
}
