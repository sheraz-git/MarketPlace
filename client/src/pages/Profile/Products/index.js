import { Button, Table, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductAction,
  deleteProductAction,
} from "../../../Redux/slices/products/productAction";
import ProductsForm from "./ProductsForm";

const Products = () => {
  const dispatch = useDispatch();
  const [showProductForm, setShowProductForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { products, loading } = useSelector((state) => state?.products);
  const { data } = useSelector((state) => state?.user?.userAuth?.userInfo);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
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
        return (
          <div className="flex gap-5">
            <i
              className="ri-delete-bin-6-line"
              onClick={() => {
                dispatch(deleteProductAction(record._id));
              }}
            ></i>
            <i
              className="ri-pencil-line"
              onClick={() => {
                setSelectedProduct(record);
                setShowProductForm(true);
              }}
            ></i>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(getProductAction({ seller: data._id }));
  }, [dispatch, data._id]);

  return (
    <>
      <div className="flex justify-end mb-10">
        <Button
          type="default"
          onClick={() => {
            setShowProductForm(true);
            setSelectedProduct(null);
          }}
        >
          Add Products
        </Button>
      </div>
      {products?.error?.message && (
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
      {showProductForm && (
        <ProductsForm
          showProductForm={showProductForm}
          setShowProductForm={setShowProductForm}
          selectedProduct={selectedProduct}
        />
      )}
    </>
  );
};

export default Products;
