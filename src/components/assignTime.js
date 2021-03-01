import React, { useState, useEffect } from "react";

import { get } from "./../http/http";
import { getLocalStorage } from "../http/localStorage";
import { Select, Row, Col, Typography } from "antd";

const { Option } = Select;
const { Text } = Typography;

const AssignTime = ({ time }) => {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const idUser = getLocalStorage("idUser");
    get(`/v1/tasks/user/${idUser}`)
      .then((res) => {
        if (res.lenght >= 0) {
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
        <Select className="AssignTime_Select">
          {tasks.length > 0 ? (
            tasks.map((key, item) => {
              return <Option key={key}>{item.name}</Option>;
            })
          ) : (
            <Option>No tiene tareas</Option>
          )}
        </Select>
      </Col>
    </Row>
  );
};

export default AssignTime;
