import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { get, patch } from "./../http/http";
import { getLocalStorage } from "../http/localStorage";
import { Select, Row, Col, Typography, Button, message } from "antd";

const { Option } = Select;
const { Text } = Typography;

const AssignTime = ({ time }) => {
  const [tasks, setTasks] = useState([]);
  const [idTask, setIdTask] = useState("");
  const history = useHistory();
  const addTimeToTask = async () => {
    console.log(time, " ", idTask);
    const timeTracking = {
      timeTracking: time,
    };
    console.log(" ", timeTracking);
    try {
      const res = await patch(`/v1/tasks/${idTask}`, timeTracking);
      if (res.updated === "updated") {
        message.success("Se ha añadido el tiempo tomado a la tarea");
        history.location.pathname = "/dash";
      }
    } catch (error) {
      message.error("Error: ", error);
    }
  };

  const handleOption = (value) => {
    setIdTask(value);
  };

  useEffect(() => {
    const idUser = getLocalStorage("idUser");
    get(`/v1/tasks/user/${idUser}`)
      .then((res) => {
        if (res.tasks.length >= 0) {
          setTasks(res.tasks);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Text strong>Tiempo invertido: </Text>
        <Text type="success">
          {time.hours}:{time.minutes}:{time.seconds}
        </Text>
      </Col>
      <Col span={24}>
        <Text strong>Tus Tareas</Text>
      </Col>
      <Col span={24}>
        <Select className="AssignTime_Select" onChange={handleOption}>
          {tasks.length > 0 ? (
            tasks.map((item) => {
              return <Option key={item._id}>{item.name}</Option>;
            })
          ) : (
            <Option>No tiene tareas</Option>
          )}
        </Select>
      </Col>
      <Col span={24}>
        <Button type="primary" size="large" onClick={addTimeToTask}>
          Asignar tiempo a la tarea
        </Button>
      </Col>
    </Row>
  );
};

export default AssignTime;
