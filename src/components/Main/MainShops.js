import React from "react";
import { useNavigate } from "react-router-dom";
import MainShop from "./MainShop";

import "./MainShops.css";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/uiSlice";

import women_1 from "../../assets/women-1.jpg";
import men_1 from "../../assets/men-1.jpg";
import girl_1 from "../../assets/girl-6.jpg";
import boy_1 from "../../assets/boy-5.jpg";

const MainShops = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productListHandler = (productCategory) => {
    // Navigate to the Product component page with the productCategory as a parameter
    navigate('/products', { state: { category: productCategory } });
  };

  return (
    <div className="mainShops">
      <div className="mainShops__container">
        <MainShop
          mainTitle="Women"
          image={women_1}
          onListHandler={() => productListHandler("womens_category")}
        />
        <MainShop
          mainTitle="Men"
          image={men_1}
          onListHandler={() => productListHandler("mens_category")}
        />
        <MainShop
          mainTitle="Girls"
          image={girl_1}
          onListHandler={() => productListHandler("girls_category")}
        />
        <MainShop
          mainTitle="Boys"
          image={boy_1}
          onListHandler={() => productListHandler("boys_category")}
        />
      </div>
    </div>
  );
};

export default MainShops;
