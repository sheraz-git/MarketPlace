import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProductAction } from "../../Redux/slices/products/productAction";
import { useNavigate, useParams } from "react-router-dom";
import Divider from "../../components/Divider";
import moment from "moment";
const ProductInfo = () => {
  const [imageIndex, setImagIndex] = React.useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  React.useEffect(() => {
    dispatch(getSingleProductAction(id));
  }, [dispatch, id]);
  const { data } = useSelector((state) => state?.products?.product);
  return (
    <div className="grid grid-cols-2">
      <div className="flex flex-col gap-2">
        <img
          src={data?.images[imageIndex]}
          alt=""
          className="w-80 h-30 object-cover rounded-md"
        />
        <div className="flex gap-5 p-5">
          {data?.images?.map((image, index) => {
            return (
              <img
              key={index}
                className={
                  "w-20 h-20 object-cover rounded-md border-3 border-solid border-green-500" +
                  (imageIndex === index
                    ? "border-3 border-solid border-green-700 p-2"
                    : "")
                }
                onClick={() => setImagIndex(index)}
                src={image}
                alt=""
              />
            );
          })}
        </div>
        <Divider />
        <div>
          AddedOn : {moment(data?.createdAt).format("MMM D YYYY hh:mm A")}
        </div>
      </div>

      <div className="flex flex-col gap-4 p-3">
        <div>
          <h1 className="text-green-500">{data?.name}</h1>
          <span> {data?.description}</span>
        </div>
        <Divider />
        <div>
          <h1 className="text-green-500">Product-Details</h1>
          <div className="flex justify-between mt-2">
            <span>category</span>
            <span>{data?.category}</span>
          </div>
          <div className="flex justify-between mt-2">
            <span>price</span>
            <span>{data?.price}</span>
          </div>
          <div className="flex justify-between mt-2">
            <span>bill-Available</span>
            <span>{data?.billAvailable ? "Yes" : "No"}</span>
          </div>
          <div className="flex justify-between mt-2">
            <span>box-Available</span>
            <span>{data?.boxAvailable ? "Yes" : "No"}</span>
          </div>
          <div className="flex justify-between mt-2">
            <span>accessory-Available</span>
            <span>{data?.accessoryAvailable ? "Yes" : "No"}</span>
          </div>
          <div className="flex justify-between mt-2">
            <span>warranty-Available</span>
            <span>{data?.warrantyAvailable ? "Yes" : "No"}</span>
          </div>
          <Divider />
        </div>
        <div>
          <h1 className="text-green-500">Owner-Details</h1>
          <div className="flex justify-between mt-2">
            <span>Owner-Name</span>
            <span>{data?.seller?.name}</span>
          </div>
          <div className="flex justify-between mt-2">
            <span>Email</span>
            <span>{data?.seller?.email}</span>
          </div>
          <Divider />
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
