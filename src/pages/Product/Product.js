import React from "react";

import "./Product.css";
import "./WishList.css"

import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Navigate } from "react-router-dom";

import { fetchCategoryData } from "../../../src/database"; // Import the database function
import { db, auth, provider } from '../../../src/firebase'; // Import your Firebase Firestore instance
import { collection, getDocs } from "firebase/firestore/lite";
import { doc, updateDoc, getDoc, setDoc } from 'firebase/firestore/lite';
import { actionTypes } from "../../store/AuthContext/reducer";
import { useStateValue } from "../../store/AuthContext/authContext";

import { CiHeart } from "react-icons/ci";
import WishList from "../../components/Header/Wishlist/WishList";

const Product = ({ user }) => {
  const [category, setCategory] = useState([]);
  const location = useLocation();
  const categoryName = location.state?.category;
  const navigate = useNavigate();
  console.log(categoryName)
  console.log("user", user)

  var displayName;
  var uid;

  auth.onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      displayName = user.displayName;
      uid = user.uid;
      console.log('User Name: ' + displayName);
      console.log('User ID: ' + uid);
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      const newData = await fetchCategoryData("Products"); // Call the database function
      setCategory(newData);
    };

    fetchData();
    console.log(category)
  }, [categoryName]);

  const addToWishlist = async (product) => {
    console.log("product", product)
    // check if product already added in wishlis
    console.log(product.id)
    const docRef = doc(collection(db, "wishlist " + uid), product.id);
    const docSnap = await getDoc(docRef);
    await setDoc(docRef, {
      title: product.title,
      description: product.description,
      price: product.price,
      url: product.url,
    });
    console.log("Added to wishlist");

    // if (!docSnap.exists()) {
    //   // wishlist does not exist for this user, add new document with generated id
    //   await setDoc(docRef, {
    //     description: product.description
    //   });
    //   console.log("Added to wishlist");
    // } else {
    //   console.log("Wishlist already exists");
    // }
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
              <button onClick={() => user ? addToWishlist(item) : navigate('/login', {state: {from:location}})}>Add to Wishlist</button>
            </div>
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default Product;
