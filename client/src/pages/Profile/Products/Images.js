import { Button, Upload } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addProductImageAction,
  editProductAction,
} from "../../../Redux/slices/products/productAction";
const Images = ({ setShowProductForm, selectedProduct }) => {
  const [images = [], setImages] = useState(selectedProduct.images);
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  const upload = () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("ProductId", selectedProduct._id);
    if (file) {
      dispatch(addProductImageAction(formData));
      setFile(null);
    }
  };
  const deleteImage = (image) => {
    const updatedImagesArray = images.filter((img) => img !== image);
    const values = { ...selectedProduct, images: updatedImagesArray };
    const id = selectedProduct._id;
    dispatch(editProductAction({ id, values }));
  };
  return (
    <div>
      <Upload
        listType="picture"
        beforeUpload={() => false}
        onChange={(info) => {
          setFile(info.file);
        }}
      >
        <Button type="dashed">Upload Images</Button>
      </Upload>

      <div className="flex gap-5">
        {images.map((image, index) => (
          <div
            className="flex gap-2 border border-solid border-gray-300 p-2 items-end"
            key={index}
          >
            <img className="h-20 w-20 object-cover" src={image} alt={"logos"} />
            <i
              className="ri-delete-bin-6-line"
              onClick={() => {
                deleteImage(image);
              }}
            ></i>
          </div>
        ))}
      </div>
      <div className="flex justify-end gap-5 mt-5">
        <Button type="default" onClick={() => setShowProductForm(false)}>
          Cancel
        </Button>
        <Button type="primary" onClick={upload} disabled={!file}>
          Upload
        </Button>
      </div>
    </div>
  );
};

export default Images;
