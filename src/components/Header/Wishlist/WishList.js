import { Category } from '@mui/icons-material'
import React from 'react'

import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";

import { fetchCategoryData } from "../../../../src/database"; // Import the database function
import { doc, updateDoc } from 'firebase/firestore/lite';
import { db } from '../../../../src/firebase'; // Import your Firebase Firestore instance

const WishList = () => {
  const [category, setCategory] = useState([]);
  const categoryName = "womens_category";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const allCategories = ["womens_category", "mens_category"]; // List of all category names
        const allData = [];
        for (const categoryName of allCategories) {
          const newData = await fetchCategoryData(categoryName); // Fetch data for each category
          allData.push(...newData); // Merge data from all categories
        }
        setCategory(allData);
      } catch (error) {
        console.error('Error fetching category data:', error);
      }
    };

    fetchData();
  }, []);



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
          .filter(product => product.isWishList === true) // Filter products with isWishList === true
          .map(product => (
            <div key={product.id} className="product">
              <h3>{product.title}</h3>
              <p>Price: ${product.price}</p>
              <button onClick={() => removeFromWishList(product.id, product.category_name)}>Remove</button>
            </div>
          ))}
      </div>
    </div>

  )
}

export default WishList