'use client'

import { useState, useRef } from "react";
import styles from "./ImageUpload.module.css";  // Adjust path as needed

const ImageUpload = ({ onImageUpload }: { onImageUpload: (url: string) => void }) => {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false); // To handle drag states
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Ref for the file input

  // Handle file selection and preview
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      setFileUrl(URL.createObjectURL(file));  // Create a preview of the selected file
      uploadImage(file);  // Immediately upload the image after it's selected
    }
  };

  // Handle drag events for drag-and-drop functionality
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true); // Set dragging state to true when an item is dragged over the area
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true); // Set dragging state to true when an item enters the drop area
  };

  const handleDragLeave = () => {
    setDragging(false); // Reset dragging state when the dragged item leaves the area
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files[0]; // Get the dropped file
    if (file) {
      setFileUrl(URL.createObjectURL(file)); // Create a preview of the dropped file
      uploadImage(file);  // Immediately upload the image after it's dropped
    }
  };

  // Function to upload the image
  const uploadImage = (file: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    // Send the file to the server for uploading
    fetch("/api/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.fileUrl) {
          onImageUpload(data.fileUrl); // Notify parent with the uploaded image URL
        }
      })
      .catch((error) => {
        console.error("Upload failed:", error);
      })
      .finally(() => {
        setUploading(false); // Reset uploading state
      });
  };

  // Handle the click on the drag-and-drop area to trigger the file input
  const handleAreaClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger file input click
    }
  };

  return (
    <div>
      <div
        className={`${styles["drag-drop-area"]} ${dragging ? styles.dragging : ""}`}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleAreaClick}  // Trigger file input on area click
      >
        <input
          ref={fileInputRef}  // Assign ref to the input
          type="file"
          name="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={uploading}  // Disable file input while uploading
          hidden // Hide the default file input
        />
        <p className={styles['drag-drop-area-p']}>{dragging ? "Release to upload" : "Drag & Drop your image here, or click to select"}</p>
      </div>

      {fileUrl && !uploading && !dragging && (
        <div>
          <h3>Preview:</h3>
          <img src={fileUrl} alt="Image preview" style={{ maxWidth: "300px", maxHeight: "300px" }} />
        </div>
      )}
      {uploading && <p>Uploading...</p>}
    </div>
  );
};

export default ImageUpload;
