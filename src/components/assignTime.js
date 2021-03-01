import React, { useEffect } from "react";
import { Select, Row, Col, Typography } from "antd";

const { Option } = Select;
const { Text } = Typography;

import { get } from "./../http/http";
import { getLocalStorage } from "../http/localStorage";
const AssignTime = ({ time }) => {
  useEffect(() => {}, []);
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
          <Option>1</Option>
          <Option>2</Option>
          <Option>3</Option>
        </Select>
      </Col>
    </Row>
  );
};

export default AssignTime;
