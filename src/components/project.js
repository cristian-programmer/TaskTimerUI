import React, { useState, useEffect } from "react";
import { get, patch, post } from "./../http/http";
import { getLocalStorage, addLocalStorage } from "../http/localStorage";
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
  Space,
  Checkbox,
  Select,
  Drawer,
} from "antd";
import {
  SaveOutlined,
  AppstoreAddOutlined,
  EyeOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { Option } = Select;
const Project = () => {
  const [idProject, setIdProject] = useState("");
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [idTask, setIdTask] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [run, setRun] = useState(true);
  const columns = [
    {
      title: "Selecionar",
      dataIndex: "_id",
      render: (text, recoder) => {
        return (
          <Checkbox
            onChange={(e) => {
              handleCheck(e, { name: recoder.name, id: recoder._id });
            }}
          ></Checkbox>
        );
      },
    },
    {
      title: "Nombre del proyecto",
      dataIndex: "name",
    },
    { title: "Description", dataIndex: "description" },
    {
      title: "Tareas asociadas",
      dataIndex: "tasks",
      render: (text, recoder) => {
        return (
          <Button
            type="primary"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => showDrawel(recoder)}
          >
            Ver tareas asociadas
          </Button>
        );
      },
    },
  ];

  const handleCheck = (event, project) => {
    if (event.target.checked) {
      console.log("check", event.target.checked, "ID: ", project);

      addLocalStorage("nameProject", project.name);
      addLocalStorage("idProject", project.id);
      console.log(idProject);
    }
  };

  const showModal = () => {
    setIsVisible(true);
  };

  const showModal2 = () => {
    getTasks();
    setIsVisible2(true);
  };

  const showDrawel = (recoder) => {
    console.log(recoder);
    setOpen(true);
  };

  const closeModal = () => {
    setIsVisible(false);
  };

  const closeModal2 = () => {
    setIsVisible2(false);
  };

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const idUser = getLocalStorage("idUser");
    if (run) {
      get(`/v1/projects/user/${idUser}`)
        .then((res) => {
          console.log("Projects ", res.projects);
          setProjects(res.projects);
          setRun(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [run]);

  const getTasks = () => {
    const idUser = getLocalStorage("idUser");
    get(`/v1/tasks/user/${idUser}`)
      .then((res) => {
        console.log(res);
        if (res.tasks.length > 0) {
          setTasks(res.tasks);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onFinish = async (project) => {
    console.log("Success:", project);
    const idUser = getLocalStorage("idUser");
    console.log({ ...project, idUser });
    try {
      const projectCreated = await post("/v1/projects", { ...project, idUser });
      if (projectCreated.created === "created") {
        message.success("El proyecto se creo correctamente.");
        // setProjects((prev) => [...prev, project]);
        setRun(true);
        closeModal();
      }
    } catch (error) {
      message.error("Error: ", error);
    }
  };

  const assignTasktoProject = () => {
    const ids = {
      idProject: getLocalStorage("idProject"),
      idTask,
    };

    console.log(ids);

    patch(`/v1/projects/${ids.idProject}/task`, { idTask: ids.idTask })
      .then((res) => {
        message.success(
          "Se ha asignado la tarea con exito a el proyecto" +
            getLocalStorage("nameProject")
        );
      })
      .catch((error) => {
        message.error("Error: ", error);
      });
  };

  const handleSelectTasks = (id) => {
    setIdTask(id);
    console.log(id);
  };
  return (
    <>
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Title level={3}>Proyectos</Title>
        </Col>
        <Col span={24}>
          <Space direction="horizontal" size="small">
            <Button type="primary" icon={<SaveOutlined />} onClick={showModal}>
              Crear Proyecto
            </Button>
            <Button
              type="default"
              icon={<AppstoreAddOutlined />}
              onClick={showModal2}
            >
              Asociar tareas a un proyecto
            </Button>
          </Space>
        </Col>
        <Col span={24}>
          <Table
            size="large"
            columns={columns}
            pagination
            dataSource={projects}
          ></Table>
        </Col>
      </Row>
      <Modal
        title="Proyecto"
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
            >
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Ingresa el nombre del proyecto",
                  },
                ]}
              >
                <Input placeholder="Proyecto" />
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
                  Crear Proyecto
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Modal>

      <Modal
        title="Asociar tareas a un proyecto"
        visible={isVisible2}
        onCancel={closeModal2}
        footer={null}
      >
        <Row>
          <Col span={24}>
            <Title level={4}>{getLocalStorage("nameProject")}</Title>
          </Col>
          <Col span={24}>
            <Form
              name="basic"
              initialValues={{
                remember: true,
              }}
            >
              <Form.Item>
                <Select
                  style={{ width: "100%" }}
                  placeholder="Seleciona las tareas"
                  onChange={handleSelectTasks}
                >
                  {tasks.map((item) => {
                    return (
                      <Option value={item._id} key={item._id}>
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="middle"
                  className="Login_Button"
                  onClick={assignTasktoProject}
                >
                  Asignar aqui
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Modal>
      <Drawer
        title="Tareas Asociada a tu proyecto"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={isOpen}
      ></Drawer>
    </>
  );
};
export default Project;
