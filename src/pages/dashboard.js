import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import RouterDashboard from "./../components/routeComponents";
import TimeTracking from "./../components/timeTracking";
import "./../styles/dasboard.css";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  LogoutOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const Dasboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [breadCrumb, setBreadCrumb] = useState("");
  const onCollapse = () => {
    setCollapsed((prevcollapsed) => !prevcollapsed);
  };
  const history = useHistory();

  const handleBreadcrumb = (route) => {
    setBreadCrumb(route);
    history.push("/dash" + route);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            <Link to="/dash">Tareas</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            <Link to="/dash/projects"> Proyectos</Link>
          </Menu.Item>
          <Menu.Item key="9" icon={<LogoutOutlined />}>
            <Link to="/">Salir</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background Dasboard_Header"
          style={{ padding: 0 }}
        >
          <TimeTracking></TimeTracking>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Dasboard</Breadcrumb.Item>
            <Breadcrumb.Item>Menu</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <RouterDashboard />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Task Timer project</Footer>
      </Layout>
    </Layout>
  );
};

export default Dasboard;
