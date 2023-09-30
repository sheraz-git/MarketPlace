import React from "react";
import { Col, Form, Input, Modal, Row, Select, Tabs } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useDispatch, useSelector } from "react-redux";
import {addProductAction,editProductAction,} from "../../../Redux/slices/products/productAction";
import Images from "./Images";

const rules = [
  {
    required: true,
    message: "required",
  },
];
const additionalThings = [
  { label: "Bill Available", name: "billAvailable" },
  { label: "Warranty Available", name: "warrantyAvailable" },
  { label: "Accessory Available", name: "accessoryAvailable" },
  { label: "Box Available", name: "boxAvailable" },
];

const ProductsForm = ({
  showProductForm,
  setShowProductForm,
  selectedProduct,
}) => {
  const formRef = React.useRef(null);
  const dispatch = useDispatch();
   const {userInfo} = useSelector((state) => state.user?.userAuth);
   console.log("🚀 ~ file: ProductsForm.js:30 ~ userInfo:", userInfo)
  const onFinish = (values) => {
    if (selectedProduct) {
      const id = selectedProduct._id;
      dispatch(editProductAction({ id, values }));
      setShowProductForm(false);
    } else {
      dispatch(addProductAction(values));
      setShowProductForm(false);
    }
  };

  React.useEffect(() => {
    if (selectedProduct) {
      formRef.current.setFieldsValue(selectedProduct);
    }
  }, [selectedProduct]);

  return (
    <div>
      <Modal
        title="Product Form"
        open={showProductForm}
        onCancel={() => {
          setShowProductForm(false);
        }}
        centered
        width={1000}
        okText="save"
        onOk={(e) => {
          formRef.current.submit();
        }}
      >
        <div>
          <h1 className="text-primary text-xl text-center font-semibold">
            {selectedProduct ? "Edit-Product" : "Add-Product"}
          </h1>
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="ProductDetails" key="1">
              <h1>General</h1>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Images" key="2" disabled={!selectedProduct}>
              <Images
                selectedProduct={selectedProduct}
                setShowProductForm={setShowProductForm}
              />
            </Tabs.TabPane>
          </Tabs>

          <Form layout="vertical" onFinish={onFinish} ref={formRef}>
            <Form.Item label="Name" name="name" rules={rules}>
              <Input placeholder="Name" />
            </Form.Item>
            <Form.Item label="Description" name="description" rules={rules}>
              <TextArea placeholder="Description" type="text" />
            </Form.Item>

            <Row gutter={[30, 30]}>
              <Col span={8}>
                <Form.Item label="Price" name="price" rules={rules}>
                  <Input placeholder="Price" type="Number" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Category" name="category" rules={rules}>
                  <Select placeholder="Category">
                    <option value="">Select</option>
                    <option value="electronics">Electronics</option>
                    <option value="fashion">Fashion</option>
                    <option value="home">Home</option>
                    <option value="toys">Toys</option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Age" name="age" rules={rules}>
                  <Input placeholder="Age" type="Number" />
                </Form.Item>
              </Col>
            </Row>
            <div className="flex gap-10">
              {additionalThings.map((things, index) => (
                <Form.Item
                  key={things.name}
                  label={things.label}
                  name={things.name}
                  valuePropName="checked"
                >
                  <Input
                    type="checkBox"
                    value={things.name}
                    onChange={(e) => {
                      formRef.current.setFieldsValue({
                        [things.name]: e.target.checked,
                      });
                    }}
                    checked={formRef.current?.getFieldValue(things.name)}
                  />
                </Form.Item>
              ))}
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default ProductsForm;
