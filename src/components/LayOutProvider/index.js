import React, { useState } from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import "./layOutProvider.scss";
import Header from "../Header";
const { Content, Sider } = Layout;

const LayOutProvider = () => {
  const [searchText, setSearchText] = useState("");
  return (
    <div>
      <Layout className="layout-wrapper">
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          theme="light"
          className="antd-sider"
        >
          <div className="sider-header">Inventory</div>
        </Sider>
        <Layout>
          <Header searchText={searchText} setSearchText={setSearchText}/>
          <Content className="content-wrapper">
            <div className="content-element">
              <Outlet context={[searchText, setSearchText]}/>
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default LayOutProvider;
