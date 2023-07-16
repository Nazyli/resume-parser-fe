import React, { useState } from "react";
import { Form, Input, Button, message, Spin } from "antd";
import {
  UserOutlined,
  LockOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { ENDPOINTS, FetchData } from "../../utils/endpoints";

function LoginForm() {
  const [messageApi, contextHolder] = message.useMessage();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const ValidateEmail = (rule, value, callback) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      callback("Silakan masukkan alamat email Anda!");
    } else if (!emailRegex.test(value)) {
      callback("Format alamat email tidak valid!");
    } else {
      callback();
    }
  };

  const handleLoginSubmit = async () => {
    setLoading(true);
    try {
      const response = await FetchData(ENDPOINTS.LOGIN, "POST", {
        email,
        password,
      });
      localStorage.setItem("accessToken", response.result.token);
      const dataUser = await FetchData(ENDPOINTS.GET_USER_BY_ID, "GET");
      messageApi
        .open({
          type: "success",
          content: "Login Sukses",
          duration: 1,
        })
        .then(() => {
          localStorage.setItem("userData", JSON.stringify(dataUser.result));
          window.location.href = "/dashboard";
        });
    } catch (error) {
      if (error.response.data.error) {
        messageApi.error(error.response.data.error[0]);
      } else {
        messageApi.error(error.response.data.message);
      }
    }
    setLoading(false);
  };

  return (
    <>
      {contextHolder}
      <Form name="login" onFinish={handleLoginSubmit}>
        <Form.Item
          name="Email"
          rules={[{ required: true, validator: ValidateEmail }]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: "center" }}>
          <Button type="primary" htmlType="submit" disabled={loading}>
            {loading ? <Spin /> : "Login"}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default LoginForm;
