import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);

  console.log(products);

  return (
    <div>
      <h3></h3>
    </div>
  );
};

export default LatestCollection;
