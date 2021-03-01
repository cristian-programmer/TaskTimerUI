import React, { useState, useEffect } from "react";
import { get, post } from "./../http/http";
import { getLocalStorage } from "../http/localStorage";
import {
  Table,
  Row,
  Col,
  Button,
  Typography,
  Modal,
  Form,
  Input,
  message,
} from "antd";
import { SaveOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [uploadTable, setUploadTable] = useState(true);
  const columns = [
    {
      title: "Nombre de la tarea",
      dataIndex: "name",
    },
    { title: "Description", dataIndex: "description" },
    // {
    //   title: "Tiempo invertido",
    //   dataIndex: "timeTracking",
    // },
  ];

  const showModal = () => {
    setIsVisible(true);
  };

  const closeModal = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    const idUser = getLocalStorage("idUser");

    get(`/v1/tasks/user/${idUser}`)
      .then((res) => {
        console.log("Tasks ", res.tasks);
        setTasks(res.tasks);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onFinish = async (task) => {
    console.log("Success:", task);
    const idUser = getLocalStorage("idUser");
    console.log({ ...task, idUser });
    try {
      const taskCreated = await post("/v1/tasks", { ...task, idUser });
      if (taskCreated.created === "created") {
        message.success("La tarea se creo correctamente.");
        setTasks((prev) => [...prev, task]);
        closeModal();
      }
    } catch (error) {
      message.error("Error: ", error);
    }
  };

  const onFinishFailed = () => {};
  return (
    <>
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Title level={3}>Tareas</Title>
        </Col>
        <Col span={24}>
          <Button type="primary" icon={<SaveOutlined />} onClick={showModal}>
            Crear Tarea
          </Button>
        </Col>
        <Col span={24}>
          <Table
            size="large"
            columns={columns}
            pagination
            dataSource={tasks}
          ></Table>
        </Col>
      </Row>
      <Modal
        title="Tarea"
        visible={isVisible}
        onCancel={closeModal}
        footer={null}
      >
        <Row>
          <Col span={24}>
            <Form
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Ingresa el nombre de la tarea",
                  },
                ]}
              >
                <Input placeholder="Tarea" />
              </Form.Item>

              <Form.Item
                name="description"
                rules={[
                  {
                    required: true,
                    message: "Ingresa una descripción",
                  },
                ]}
              >
                <Input placeholder="Descripción" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="middle"
                  className="Login_Button"
                >
                  Crear Tarea
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default Task;
