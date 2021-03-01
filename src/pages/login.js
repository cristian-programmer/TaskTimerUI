import React from "react";
import { Form, Input, Button, Typography, Card } from "antd";
import { useHistory } from "react-router-dom";
import { post } from "../http/http";

import "../styles/login.css";

const { Title } = Typography;

const Login = () => {
  const history = useHistory();

  const onFinish = async (user) => {
    console.log("Success:", user);
    try {
      const userLogged = await post("/v1/users/login", user);
      if (userLogged.login) {
        console.log(userLogged);
        history.push("/dash");
      }
    } catch (error) {
      console.error(error);
    }
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
