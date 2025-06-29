import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { useLocation } from "react-router-dom";

const ShowSearch = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);

  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("collection")) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);

  return showSearch && visible ? (
    <div className="border-t border-b bg-gray-50 text-center py-6">
      <div className="mx-auto flex items-center justify-between border border-gray-400 rounded-full px-4 py-2 w-3/4 sm:w-1/2 bg-white">
        {/* Search Icon */}
        <img src={assets.search_icon} className="w-4 mr-2" alt="search" />

        {/* Input */}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 outline-none bg-transparent text-sm"
          type="text"
          placeholder="Search"
        />

        {/* Clear Icon */}
        <img
          src={assets.cross_icon}
          className="w-3 ml-2 cursor-pointer"
          onClick={() => setShowSearch(false)}
          alt="clear"
        />
      </div>
    </div>
  ) : null;
};

export default ShowSearch;
