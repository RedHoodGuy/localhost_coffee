'use client'

import { useState } from "react";
import ImageUpload from "./ImageUpload/ImageUpload"; // Adjust path if necessary

const ProductForm = () => {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: 0,
    quantity: 0,
    categoryId: '',
    imageUrl: ''
  });
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (imageUrl: string) => {
    setProductData((prevData) => ({
      ...prevData,
      imageUrl
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Ensure correct data types for the submission
    const updatedProductData = {
      ...productData,
      price: parseFloat(productData.price.toString()), // Ensure price is a number
      quantity: parseInt(productData.quantity.toString(), 10), // Ensure quantity is an integer
    };

    if (!updatedProductData.imageUrl) {
      alert("Please upload an image.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedProductData)
      });

      const result = await response.json();

      if (response.ok) {
        alert("Product successfully added.");
        setProductData({
          name: '',
          description: '',
          price: 0,
          quantity: 0,
          categoryId: '',
          imageUrl: ''
        });
      } else {
        alert("Error adding product.");
      }
    } catch (error) {
      console.error("Error submitting product:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Product</h2>

      <div>
        <label>Product Name</label>
        <input
          type="text"
          name="name"
          value={productData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Description</label>
        <textarea
          name="description"
          value={productData.description}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Price</label>
        <input
          type="number"
          name="price"
          value={productData.price}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Quantity</label>
        <input
          type="number"
          name="quantity"
          value={productData.quantity}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Category</label>
        <input
          type="text"
          name="categoryId"
          value={productData.categoryId}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <ImageUpload onImageUpload={handleImageUpload} />
      </div>

      <button type="submit" disabled={loading || !productData.imageUrl}>
        {loading ? "Submitting..." : "Add Product"}
      </button>
    </form>
  );
};

export default ProductForm;
