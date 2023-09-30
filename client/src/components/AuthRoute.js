import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const AuthRoute = ({ children }) => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state?.user?.userAuth);

  if (!userInfo?.token) {
    window.location.href = "/Login";
    return null;
  }
  return (
    <>
      <div className="bg-primary p-5 flex justify-between items-center">
        <h1 className="text 2xl text-white" onClick={() => navigate("/")}>
          SHEY MP
        </h1>
        <div className="bg-white py-3 px-7 flex justify-center items-center">
          <i className="ri-shield-user-line mr-2"></i>
          <span
            className="underline cursor-pointer"
            onClick={() => {
              if (userInfo.data.role === "user") {
                navigate("/Profile");
              } else {
                navigate("/Admin");
              }
            }}
          >
            {userInfo.data.name}
          </span>
          <i
            className="ri-logout-box-r-line ml-7"
            onClick={() => {
              localStorage.removeItem("userInfo");
              window.location.href = "/Login";
            }}
          ></i>
        </div>
      </div>
      <div> {children} </div>
    </>
  );
};
export default AuthRoute;
