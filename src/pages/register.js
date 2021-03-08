import React from "react";
import { Form, Input, Button, Typography, Card, Col, Row, message } from "antd";
import { useHistory } from "react-router-dom";
import { post } from "../http/http";

import "../styles/login.css";

const { Title } = Typography;

const Register = () => {
  const history = useHistory();
  const onFinish = async (user) => {
    console.log("Success:", user);
    try {
      const userCreated = await post("/v1/users", user);
      console.log(userCreated);
      if (userCreated.created) {
        message.success("Te has registrado correctamente");
        history.push("/dash");
      } else if (userCreated.error) {
        message.error("Ha ocurrido un error: ", userCreated.error);
      }
    } catch (error) {
      console.error(error);
      message.error("Ha ocurrido un error al registrarte");
    }
  };

  const back = () => {
    history.push("/");
  };
  return (
    <Row>
      <Col span={24}>
        <div className="SignUp">
          <Title level={3}>Task Timer App</Title>
          <Card>
            <Title level={4}>Registrarse</Title>
            <Form
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Ingresa tu nombre",
                  },
                ]}
              >
                <Input placeholder="Nombre completo" />
              </Form.Item>
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
                name={"email"}
                rules={[
                  {
                    type: "email",
                  },
                ]}
              >
                <Input placeholder="Correo Electonico" />
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
              <Form.Item
                name="confirm"
                dependencies={["password"]}
                rules={[
                  {
                    required: true,
                    message: "Confirma tu contraseña",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }

                      return Promise.reject(
                        new Error("Las contraseñas no coinciden")
                      );
                    },
                  }),
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
                <Button type="link" onClick={back}>
                  Volver al login
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </Col>
    </Row>
  );
};

export default Register;
