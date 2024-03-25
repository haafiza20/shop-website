import React from "react";

import "./Product.css";
import "./WishList.css"

import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";

import { fetchCategoryData } from "../../../src/database"; // Import the database function
import { db } from '../../../src/firebase'; // Import your Firebase Firestore instance
import { collection, getDocs } from "firebase/firestore/lite";
import { doc, updateDoc } from 'firebase/firestore/lite';

import { CiHeart } from "react-icons/ci";
import WishList from "../../components/Header/Wishlist/WishList";

const Product = () => {

  const [category, setCategory] = useState([]);
  const location = useLocation();
  const categoryName = location.state?.category;

  useEffect(() => {
    const fetchData = async () => {
      const newData = await fetchCategoryData(categoryName); // Call the database function
      setCategory(newData);
    };

    fetchData();
    console.log(category)
  }, [categoryName]);

  const addToWishlist = async (productId) => {
    const index = category.findIndex(product => product.id === productId);
    if (index !== -1) {
      const updatedCategory = [...category];
      updatedCategory[index] = { ...updatedCategory[index], isWishList: true };
      setCategory(updatedCategory);

      const productRef = doc(db, categoryName, productId); // Reference to the product document
      try {
        // Update the isWishList field in the product document
        await updateDoc(productRef, { isWishList: true });
        console.log('Document successfully updated!');
      } catch (error) {
        console.error('Error updating document:', error);
        // Revert local state change if Firestore update fails
        updatedCategory[index] = { ...updatedCategory[index], isWishList: false };
        setCategory(updatedCategory);
      }
    }
  };


  return (
    <><div className="product">
      {category.map(item => (
        <div className="product__link" key={item.id}>
          <div className="product__container">
            <img className="product__image" src={item.imageUrl} alt="" />
            <div className="product__info">
              <h3>{item.title}</h3>
              <h3 className="product__price">${item.price}</h3>
              <button onClick={() => addToWishlist(item.id)}>Add to Wishlist</button>
            </div>
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default Product;
