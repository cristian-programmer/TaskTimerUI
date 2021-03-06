import React, { useState, useEffect } from "react";
import { PageHeader, Button, Drawer } from "antd";
import {
  PlayCircleOutlined,
  PauseOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import "./../styles/timeTracking.css";

import AssignTime from "./assignTime";
import { prettyFormat } from "../utils/utils";
const TimeTracking = () => {
  const [time, setTime] = useState({
    seconds: 0,
    minutes: 0,
    hours: 0,
  });

  const [isRunning, setIsRunning] = useState(false);
  const [idInterval, setIdInterval] = useState(null);
  const [isOpen, setOpen] = useState(false);
  useEffect(() => {
    if (isRunning) {
      const id = setInterval(() => {
        console.log(time.seconds);
        setTime((prev) => ({
          ...prev,
          seconds: prev.seconds >= 59 ? 0 : prev.seconds++,
          minutes:
            prev.seconds >= 59
              ? prev.minutes++
              : prev.minutes >= 59
              ? 0
              : prev.minutes,
          hours:
            prev.minutes >= 59
              ? prev.hours++
              : prev.hours >= 23
              ? 0
              : prev.hours,
        }));
      }, 1000);

      setIdInterval(id);
    } else {
      clearInterval(idInterval);
    }
  }, [isRunning]);

  // const prettyFormat = () => {
  //   return `${time.hours > 9 ? time.hours : "0" + time.hours}:${
  //     time.minutes > 9 ? time.minutes : "0" + time.minutes
  //   }:${time.seconds > 9 ? time.seconds : "0" + time.seconds}`;
  // };

  const start = () => {
    setIsRunning((prevState) => !prevState);
  };

  const showModal = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <PageHeader
        extra={[
          <span className="TimeTracking_Span">Tu tiempo</span>,
          <span className="TimeTracking_Span">{prettyFormat(time)}</span>,
          <Button
            type="default"
            shape="circle"
            icon={isRunning ? <PauseOutlined /> : <PlayCircleOutlined />}
            onClick={start}
          />,
          <Button
            type="primary"
            shape="circle"
            icon={<SaveOutlined />}
            onClick={showModal}
          ></Button>,
        ]}
      ></PageHeader>
      <Drawer
        title="Asignar tiempo a una tarea"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={isOpen}
      >
        <AssignTime time={time} />
      </Drawer>
    </>
  );
};

export default TimeTracking;
