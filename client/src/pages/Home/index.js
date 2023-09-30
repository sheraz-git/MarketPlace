import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProductAction } from "../../Redux/slices/products/productAction";
import Divider from "../../components/Divider";
import { Spin } from "antd";
import Filters from "./Filters";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [filters, setFilters] = React.useState({
    status: "approved",
    category:[]
  });
  const [showFilters, setShowFilters] = React.useState(true);
  const { products, loading } = useSelector((state) => state.products);

  React.useEffect(() => {
    dispatch(getProductAction(filters));
  }, [dispatch, filters]);

  const handlePassId = (productId) => {
    navigate(`/ProductInfo/${productId}`);
  };

  return (
    <>
      <div className="flex gap-5 p-5">
        {filters && (
          <Filters
            filters={filters}
            setFilters={setFilters}
            showFilters={showFilters}
            setShowFilters={setShowFilters}
          />
        )}
        <div>
          <div className="flex gap-5 items-center ">
            <i class="ri-equalizer-line"></i>
            <input
              type="text"
              placeholder="Enter Search"
              className="w-full border border-grey-300 rounded border-solid p-2 h-14"
            />
          </div>
          <div className={`grid gap-5 ${"filters ? grid-cols-4:grid-cols-5"}`}>
            {loading ? (
              <Spin size="large" className="flex justify-center align-center" />
            ) : (
              <div className="grid grid-cols-4 gap-5 mt-5 flex flex-col gap-2 pb-2 cursor-pointer">
                {products?.data?.map((cardData) => {
                  return (
                    <div
                      className="border border-gray-300 border-solid gap-10 p-5"
                      key={cardData._id}
                      onClick={() => {
                        handlePassId(cardData._id);
                      }}
                    >
                      <img
                        src={cardData.images[0]}
                        alt=""
                        className="w-full h-52 p-2 rounded-md"
                      />
                      <Divider />
                      <div className="px-2 flex flex-col">
                        <h1>{cardData.name}</h1>
                        <p>{cardData.description}</p>
                        <Divider />
                        <span className="text-lg font-semi-bold text-green-500">
                          ${cardData.price}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
