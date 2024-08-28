import React, { useEffect, useState } from "react";
import axios from "axios";
const CategoryApi = () => {
  const [category, setCategory] = useState([]);
  const getCategory = async () => {
    const res = await axios.get("/api/category");
    // const res = await axios.get("/api/product");
    setCategory(res.data.categories);
  };
  useEffect(() => {
    getCategory();
  }, []);
  return {
    category: [category, setCategory],
  };
};
export default CategoryApi;
