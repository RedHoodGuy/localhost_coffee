"use client";

import { useState, useEffect } from "react";
import styles from "./ProductEdit.module.css"; // Make sure to import the CSS file
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";

const ProductEdit = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [editingProduct, setEditingProduct] = useState<any | null>(null); // State to manage the editing product
  const [loading, setLoading] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deletionId, setDeletionId] = useState("");

  // Fetch products from the API (assuming an API endpoint to fetch products)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        setProducts(data.sort((a, b) => a.name.localeCompare(b.name)));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [editingProduct]);

  const handleDelete = async (id: string) => {
    if (confirmDelete) {
      try {
        const response = await fetch(`/api/products/${id}`, {
          method: "DELETE", // Ensure you're using the DELETE method
          headers: {
            "Content-Type": "application/json", // Not strictly necessary here, but a good practice
          },
        });

        if (response.ok) {
          setDeleteSuccess(true);
          setProducts((prevProducts) =>
            prevProducts.filter((product) => product.id !== id)
          );
        } else {
          console.error("Error deleting product:", await response.json());
        }
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  // Handle form submission for editing a product
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Ensure correct data types for the submission
    const updatedProductData = {
      ...editingProduct,
      price: parseFloat(editingProduct.price.toString()), // Ensure price is a number
      quantity: parseInt(editingProduct.quantity.toString(), 10), // Ensure quantity is an integer
    };
    if (updatedProductData) {
      try {
        const response = await fetch(`/api/products/${updatedProductData.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProductData),
        });

        const updatedProduct = await response.json();
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === updatedProduct.id ? updatedProduct : product
          )
        );
        setEditingProduct(null); // Close the edit form
        setUpdateSuccess(true);
      } catch (error) {
        console.error("Error updating product:", error);
      }
    }
  };

  // Handle input changes for editing product
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditingProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const openConfirmationModal = (id: string) => {
    setModalOpen(true);
    setDeletionId(id);
  }
  const onModalConfirm = () => {
    setConfirmDelete(true);
    handleDelete(deletionId);
    setModalOpen(false);
    setEditingProduct(null);
  };
  const onModalClose = () => {
    setModalOpen(false);
  };

  return (
    <>
        {modalOpen && (<ConfirmationModal isOpen={modalOpen} onClose={onModalClose} onConfirm={onModalConfirm} message="Are you sure you want to delete this product?" />)}
      <div className={styles.container}>
        <div className={styles.productList}>
          <h2>Manage Products</h2>
          <ul className={styles.productListUl}>
            {products.map((product) => (
              <li key={product.id} className={styles.productListItem}>
                <span>{product.name}</span>
                <div className={styles.productActions}>
                  {/* Edit button */}
                  <button
                    className={styles.editButton}
                    onClick={() => {
                      setUpdateSuccess(false);
                      setDeleteSuccess(false);
                      setEditingProduct(product);
                    }} // Update state with the clicked product
                  >
                    Edit
                  </button>
                  {/* Delete button */}
                  <button
                    className={styles.deleteButton}
                    onClick={() => openConfirmationModal(product.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {deleteSuccess ? <p>Product successfully deleted!</p> : ""}
        {updateSuccess ? <p>Product successfully updated!</p> : ""}
        {/* Conditionally render the form only when editing a product */}
        <div
          className={`${styles.editFormContainer} ${
            editingProduct ? styles.active : ""
          }`}
        >
          <h3>Edit Product</h3>
          <form onSubmit={handleEditSubmit} className={styles.editForm}>
            <div className={styles.formGroup}>
              <label>Product Name</label>
              <input
                type="text"
                name="name"
                value={editingProduct?.name || ""}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>Description</label>
              <input
                type="text"
                name="description"
                value={editingProduct?.description || ""}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>Price</label>
              <input
                type="number"
                name="price"
                value={editingProduct?.price || ""}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>Quantity</label>
              <input
                type="number"
                name="quantity"
                value={editingProduct?.quantity || ""}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={styles.formActions}>
              <button
                type="submit"
                disabled={loading}
                className={styles.updateButton}
              >
                {loading ? "Updating..." : "Update Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProductEdit;
