import { Button, Table, Spin } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserAction,updateStatusUserAction} from "../../Redux/slices/user/userAction";
import moment from "moment";
const Users = () => {
  const dispatch = useDispatch();
const {users,loading} =useSelector((state)=> state?.user)
const onStatusUpdate = (id,status) => {
  dispatch(updateStatusUserAction({id,status}))
};

const columns = [
    {
      title: "name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render:(text,record) => {
        return moment(record?.createdAt).format("DD-MM-YYYY hh:mm A")
      }
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        const { status, _id } = record;
        return (
          <div className="flex gap-5">
            {status === "active" && (
              <span
                onClick={() => {
                  onStatusUpdate(_id, "blocked");
                }}
              >
                Blocked
              </span>
            )}
            {status === "blocked" && (
              <span
                onClick={() => {
                  onStatusUpdate(_id, "active");
                }}
              >
                Un-Block
              </span>
            )}
         
          </div>
        );
      },
    },
     ];

  useEffect(() => {
    dispatch(getAllUserAction());
  }, [dispatch]);

  return (
    <>
      {users?.error?.message && (
        <h4 className="mt-5 text-center text-red-500">
          {users?.error?.message}
        </h4>
      )}
      {!loading ? (
        <Table
          columns={columns}
          dataSource={users?.data}
        />
      ) : (
        <Spin size="large" className="flex justify-center align-center" />
      )}
    </>
  );
};
export default Users;
