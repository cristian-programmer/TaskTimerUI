import React, { useEffect, useState } from "react";
import { Row, Col, Typography, Space } from "antd";
import { get } from "../http/http";

const { Title, Text } = Typography;
const DetailProject = ({ project }) => {
  const [tasks, setTasks] = useState([]);
  const [load, setLoad] = useState(true);
  const getTaskById = async () => {
    if (load) {
      const idTasks = project.tasks.join(",");
      let res = await get("/v1/tasks/" + idTasks);

      setTasks((prev) => [...prev, ...res]);
      console.log(res);
      setLoad(false);
    }
  };
  useEffect(() => {
    getTaskById();
  }, []);
  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Title level={5}>{project.name} </Title>
        <Text>{project.description}</Text>
      </Col>
      <Col span={24}>
        {project.tasks.length > 0 ? (
          <p>
            {tasks.map((item) => {
              return <p>{item.name}</p>;
            })}
          </p>
        ) : (
          <Text type="warning">No hay tareas asociadas</Text>
        )}
      </Col>
    </Row>
  );
};

export default DetailProject;
