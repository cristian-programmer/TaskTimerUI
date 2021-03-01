import React from "react";
import { Form, Input, Button, Checkbox, Typography, Card } from "antd";
import { useHistory } from "react-router-dom";

import "../styles/login.css";

const { Title } = Typography;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const Login = () => {
  const history = useHistory();

  const onFinish = (values) => {
    console.log("Success:", values);
    fetch("http://localhost/v1/users", {
      body: JSON.stringify(values),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });

    history.push("/dash");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="Login">
      <Title level={3}>Task Timer App</Title>
      <Card>
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Ingresa tu usuario",
              },
            ]}
          >
            <Input placeholder="Usuario" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Ingresa tu contraseña",
              },
            ]}
          >
            <Input.Password placeholder="Contraseña" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="middle"
              className="Login_Button"
            >
              Ingresar
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
