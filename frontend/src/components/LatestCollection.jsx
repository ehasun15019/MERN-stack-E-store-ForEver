import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [shortType, setShortType] = useState("relavent");
  const [filterProducts, setFilterProducts] = useState([]);
  const [latestProduct, SetLatestProduct] = useState([]);

  // FUNCTION TO SORT
  const shortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch (shortType) {
      case "low-high":
        setFilterProducts([...fpCopy].sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilterProducts([...fpCopy].sort((a, b) => b.price - a.price));
        break;
      default:
        setFilterProducts(latestProduct);
        break;
    }
  };

  // set latest products and filterProducts
  useEffect(() => {
    const latest = products.slice(0, 10);
    SetLatestProduct(latest);
    setFilterProducts(latest);
  }, [products]);

  // Run sort when shortType changes
  useEffect(() => {
    shortProduct();
    // eslint-disable-next-line
  }, [shortType, latestProduct]);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"LATEST"} text2={"COLLECTIONS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>

      <div className="flex justify-end text-base sm:text-2xl mb-2">
        {/* Product Short */}
        <select
          onChange={(e) => setShortType(e.target.value)}
          className="border-2 border-gray-300 text-sm px-2 py-3"
        >
          <option value="relavent">Sort by: Relavent</option>
          <option value="low-high">Sort by: Low to High</option>
          <option value="high-low">Sort by: High to Low</option>
        </select>
      </div>

      {/* Rendering Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {filterProducts.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
