import { Button, Table, Spin } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductAction,updateStatusProductAction } from "../../Redux/slices/products/productAction";

const Products = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state?.products);
  const onStatusUpdate = (id,status) => {
      dispatch(updateStatusProductAction({id,status}))
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Seller",
      dataIndex: "name",
      render: (text, record) => {
        return record?.seller?.name;
      },
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Age",
      dataIndex: "age",
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
            {status === "pending" && (
              <span
                onClick={() => {
                  onStatusUpdate(_id, "approved");
                }}
              >
                Approved
              </span>
            )}
            {status === "pending" && (
              <span
                onClick={() => {
                  onStatusUpdate(_id, "rejected");
                }}
              >
                Rejected
              </span>
            )}
            {status === "approved" && (
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
                  onStatusUpdate(_id, "approved");
                }}
              >
                Un_Blocked
              </span>
            )}
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(getProductAction());
  }, [dispatch]);

  return (
    <>
      {Products?.error?.message && (
        <h4 className="mt-5 text-center text-red-500">
          {products?.error?.message}
        </h4>
      )}
      {!loading ? (
        <Table
          columns={columns}
          dataSource={products?.data}
        />
      ) : (
        <Spin size="large" className="flex justify-center align-center" />
      )}
    </>
  );
};
export default Products;
