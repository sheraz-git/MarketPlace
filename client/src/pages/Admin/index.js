import { Tabs } from "antd";
import React from "react";
import Products from "./Products";
import Users from "./Users";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Admin = () => {
  const navigate = useNavigate();
  const { data } = useSelector((state) => state?.user?.userAuth?.userInfo);
  React.useEffect(() => {
    if (data?.role !== "admin") {
      navigate("/");
    }
  }, []);

  return (
    <div className="p-5">
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Products" key="1">
          <Products />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Users" key="2">
          <Users />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default Admin;
