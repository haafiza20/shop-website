import { Category } from '@mui/icons-material'
import React from 'react'

import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";

import { fetchCategoryData } from "../../../../src/database"; // Import the database function
import { deleteDoc, doc, updateDoc } from 'firebase/firestore/lite';
import { db, auth } from '../../../../src/firebase'; // Import your Firebase Firestore instance

const WishList = ({ user }) => {
  const [category, setCategory] = useState([]);
  var categoryName

  const [displayName, setDisplayName] = useState(null)
  const [uid, setUid] = useState(null)

  auth.onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      setDisplayName(user.displayName);
      setUid(user.uid);
      console.log('User Name: ' + displayName);
      console.log('User ID: ' + uid);
    }
  });

  console.log("user_id", uid) // undefined
  categoryName = "wishlist " + uid

  useEffect(() => {
    const fetchData = async () => {
      const newData = await fetchCategoryData("wishlist " + uid); // Call the database function
      setCategory(newData);
    };

    fetchData();
    console.log(category)
  }, [categoryName]);

  const removeFromWishList = async (productId) => {
    console.log("category_name ", categoryName)
    console.log("productId ", productId)
    try {
      const productRef = doc(db, categoryName, productId);
      await deleteDoc(productRef);
      console.log('Document successfully updated!');
      // remove the product from local state
      setCategory(category.filter(product => product.id !== productId));

    } catch (error) {
      console.error('Error updating document:', error);
    }
  };




  return (
    <div>
      <h2>My Wishlist</h2>
      <div className="wishlist">
        {category.length > 0 ? (
          category.map(product => (
            <div key={product.id} className="product">
              <h3>{product.title}</h3>
              <p>Price: ${product.price}</p>
              <button onClick={() => removeFromWishList(product.id)}>Remove</button>
            </div>
          ))
        ) : (
          <p>Your wishlist is empty.</p>
        )}
      </div>
    </div>
  )
}

export default WishList