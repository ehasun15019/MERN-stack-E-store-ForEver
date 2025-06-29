import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, SetShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [shortType, setShortType] = useState("relavent");

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    // For Search Method
    if (shortProduct && search) {
      productsCopy = productsCopy.filter((item) => {
        return item.name.toLowerCase().includes(search.toLowerCase());
      });
    }

    console.log("SubCategory Selected: ", subCategory);
    console.log(
      "Product subCategories: ",
      products.map((p) => p.subCategory)
    );

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) => {
        return category.includes(item.category);
      });
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) => {
        return subCategory.includes(item.subCategory);
      });
    }

    setFilterProducts(productsCopy);
  };

  const shortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch (shortType) {
      case "low-high":
        setFilterProducts(
          fpCopy.sort((a, b) => {
            return a.price - b.price;
          })
        );
        break;

      case "high-low":
        setFilterProducts(
          fpCopy.sort((a, b) => {
            return b.price - a.price;
          })
        );

        break;

      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch]);

  useEffect(() => {
    shortProduct();
  }, [shortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* filter option */}
      <div className="min-w-60">
        <p
          onClick={() => {
            return SetShowFilter(!showFilter);
          }}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>

        {/* Category Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>

          <div className="flex flex-col text-sm font-ligh text-gray-700">
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Men"}
                onChange={toggleCategory}
              />{" "}
              Men
            </p>

            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Women"}
                onChange={toggleCategory}
              />{" "}
              Women
            </p>

            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Kids"}
                onChange={toggleCategory}
              />{" "}
              Kids
            </p>
          </div>
        </div>

        {/* sub category Filter */}
        <div
          className={`border border-gray-300 my-5 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>

          <div className="flex flex-col text-sm font-ligh text-gray-700">
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Topwear"}
                onChange={toggleSubCategory}
              />{" "}
              TopWear
            </p>

            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Bottomwear"}
                onChange={toggleSubCategory}
              />{" "}
              BottomWear
            </p>

            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Winterwear"}
                onChange={toggleSubCategory}
              />{" "}
              WinterWear
            </p>
          </div>
        </div>
      </div>

      {/* Right Side  */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-2">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          {/* Product Short */}
          <select
            onChange={(e) => {
              return setShortType(e.target.value);
            }}
            className="border-2 border-gray-300 text-sm px-2"
          >
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Map products */}
        <div className="grid grid-col-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
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
    </div>
  );
};

export default Collection;
