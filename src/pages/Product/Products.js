import React from "react";
import Product from "./Product";



const Products = ({ user }) => {


  return (
    <div>
      <Product
        user={user}
      />
    </div>
  );
};

export default Products;
