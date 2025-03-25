"use client";

import { useState } from "react";
import ImageUpload from "./ImageUpload/ImageUpload"; // Adjust path if necessary
import classes from "./ProductForm.module.css";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";

const ProductForm = () => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    quantity: 0,
    categoryId: "",
    imageUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [addedProduct, setAddedProduct] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleImageUpload = (imageUrl: string) => {
    setProductData((prevData) => ({
      ...prevData,
      imageUrl,
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
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
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProductData),
      });

      // const result = await response.json();

      if (response.ok) {
        // Clear the image preview in the ImageUpload component
        if (typeof handleImageUpload === "function") {
          handleImageUpload("");
        }
        setAddedProduct(true);
        setModalOpen(true);
        setProductData({
          name: "",
          description: "",
          price: 0,
          quantity: 0,
          categoryId: "",
          imageUrl: "",
        });
      } else {
        setAddedProduct(false);
        setModalOpen(true);
      }
    } catch (error) {
      console.error("Error submitting product:", error);
    } finally {
      setLoading(false);
    }
  };

  const onModalConfirm = () => {
    setModalOpen(false);
  };
  const onModalClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      {modalOpen ? (
        <ConfirmationModal
          isOpen={modalOpen}
          onConfirm={onModalConfirm}
          message={`${
            addedProduct
              ? "Product added successfully!"
              : "Error adding product"
          }`}
          onClose={onModalClose}
          showCancelButton={false}
        />
      ) : (
        ""
      )}
      <form onSubmit={handleSubmit} className={classes["product-form"]}>
        <h2>Add Product</h2>

        <div className={classes["form-content"]}>
          {/* Left side - Image Upload */}
          <div className={classes["image-container"]}>
            <ImageUpload
              onImageUpload={handleImageUpload}
              resetTrigger={productData.imageUrl === ""}
            />
          </div>

          {/* Right side - Form fields */}
          <div className={classes["form-fields"]}>
            <div>
              <label>Product Name</label>
              <input
                type="text"
                name="name"
                value={productData.name}
                onChange={handleChange}
                className={classes["product-input"]}
                placeholder="Add a name..."
                required
              />
            </div>

            <div>
              <label>Description</label>
              <textarea
                name="description"
                value={productData.description}
                onChange={handleChange}
                className={classes["product-input"]}
                placeholder="Add a description..."
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
                className={classes["product-input"]}
                placeholder="Add a price..."
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
                className={classes["product-input"]}
                placeholder="Add a quantity..."
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
                className={classes["product-input"]}
                placeholder="Add a category ID..."
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading || !productData.imageUrl}
              className={classes["add-btn"]}
            >
              {loading ? "Submitting..." : "Add Product"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default ProductForm;
