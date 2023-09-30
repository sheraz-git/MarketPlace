import React from "react";
import { Button,Form, Input } from "antd";
import { Link } from "react-router-dom";
import Divider from "../../components/Divider";
import { useDispatch, useSelector } from "react-redux";
import { userLoginAction } from "../../Redux/slices/user/userAction";
const rules=[
  {
  required:true,
  message:"required"
  }
];
const Login = () => {
  const dispatch = useDispatch();

  const onFinish = (values) => {
    dispatch(userLoginAction(values))
  };
  const { loading, userAuth } = useSelector((state) => state.user);

  if (userAuth?.userInfo?.code) {
    window.location.href = "/";
  }
  return (
    <div className="h-screen bg-primary flex justify-center items-center">
      <div className="bg-white p-5 rounded w-[450px]">
        <h1 className="text-primary">
          SMP - <span className="text-gray-400 text-2xl">Login</span>
        </h1>
        <Divider />
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email" rules={rules}>
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={rules}>
            <Input placeholder="Password" type="password" />
          </Form.Item>
           {userAuth?.error?.message && (
            <h4 className="mt-5 text-center text-red-500">
              {userAuth?.error?.message}
            </h4>
          )}
            <Button type="primary" htmlType="submit" block className="mt-2">
               {loading ?  "Loading ...." : "Login"}
            </Button>
          <div className="mt-5 text-center ">
            <span className="text-grey-500">
              Don't have an account ?{" "}
              <Link to="/Register" className="text-primary">
              Register
              </Link>
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
};
export default Login;
