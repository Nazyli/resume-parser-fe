import React, { useState } from "react";
import { Form, Input, Button, message, Spin } from "antd";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";

import axios from "axios";
import { ENDPOINTS, FetchData } from "../../utils/endpoints";

function RegisterForm({ onRegisterSuccess }) {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const handleRegisterSubmit = async (values) => {
    setLoading(true);
    try {
      const userData = {
        fullName: values.fullName,
        email: values.email,
        password: values.password,
      };
      await FetchData(ENDPOINTS.REGISTER, "POST", userData);
      form.resetFields();
      messageApi.success("Pendaftaran berhasil");
      onRegisterSuccess();
    } catch (error) {
      console.log();
      if (error.response.data.error) {
        messageApi.error(error.response.data.error[0]);
      } else {
        messageApi.error(error.response.data.message);
      }
    }
    setLoading(false);
  };

  const validateEmail = (rule, value, callback) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      callback("Silakan masukkan alamat email Anda!");
    } else if (!emailRegex.test(value)) {
      callback("Format alamat email tidak valid!");
    } else {
      callback();
    }
  };

  return (
    <>
      {contextHolder}
      <Form form={form} name="register" onFinish={handleRegisterSubmit}>
        <Form.Item
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          label="Full Name"
          name="fullName"
          rules={[
            { required: true, message: "Silakan isikan nama lengkap anda!" },
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Masukkan nama lengkap Anda"
          />
        </Form.Item>
        <Form.Item
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          label="Email"
          name="email"
          rules={[{ required: true, validator: validateEmail }]}
        >
          <Input prefix={<MailOutlined />} placeholder="Masukkan email Anda" />
        </Form.Item>
        <Form.Item
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Silakan masukkan password Anda!" },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Masukkan password Anda"
          />
        </Form.Item>

        <Form.Item
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          label="Konfirmasi Password"
          name="confirmPassword"
          rules={[
            { required: true, message: "Silakan konfirmasi password Anda!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Dua password tidak cocok!"));
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Konfirmasi password Anda"
          />
        </Form.Item>
        <Form.Item style={{ textAlign: "center" }}>
          <Button type="primary" htmlType="submit" disabled={loading}>
            {loading ? <Spin /> : "Register"}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default RegisterForm;
