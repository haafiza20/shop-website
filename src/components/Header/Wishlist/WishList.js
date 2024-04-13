import { Category } from '@mui/icons-material'
import React from 'react'

import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";

import { fetchCategoryData } from "../../../../src/database"; // Import the database function
import { doc, updateDoc } from 'firebase/firestore/lite';
import { db, auth } from '../../../../src/firebase'; // Import your Firebase Firestore instance

const WishList = ({user}) => {
  const [category, setCategory] = useState([]);
  var categoryName

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

  console.log("user_id", uid)
  categoryName = "wishlist "+uid

  useEffect(() => {
    const fetchData = async () => {
      const newData = await fetchCategoryData("wishlist "+uid); // Call the database function
      setCategory(newData);
    };

    fetchData();
    console.log(category)
  }, [categoryName]);

  const removeFromWishList = async (productId, categoryName) => {
    try {
      const productRef = doc(db, categoryName, productId);
      await updateDoc(productRef, { isWishList: false });
      console.log('Document successfully updated!');

      // Update local state after Firestore update
      const updatedCategory = category.map(product =>
        product.id === productId ? { ...product, isWishList: false } : product
      );
      setCategory(updatedCategory);
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };




  return (
    <div>
      <h2>My Wishlist</h2>
      <div className="wishlist">
        {category
          .map(product => (
            <div key={product.id} className="product">
              <h3>{product.title}</h3>
              <p>Price: ${product.price}</p>
              <button>Remove</button>
            </div>
          ))}
      </div>
    </div>

  )
}

export default WishList