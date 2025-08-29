"use client";
import { UploadButton } from "@/components/uploadthing";
import React, { useState } from "react";

// Props for the EditablePage
const EditablePage = ({ data, isAdmin }) => {
  const [content, setContent] = useState(data.content); // Page content state
  const [currentEdit, setCurrentEdit] = useState(null); // Currently selected item for editing
  const [editValue, setEditValue] = useState(""); // Current edit value

  // Handle edit icon click
  const handleEditClick = (item) => {
    setCurrentEdit(item);
    setEditValue(item.value);
  };

  // Handle saving the changes
  const handleSave = () => {
    const updatedContent = content.map((item) =>
      item.id === currentEdit.id ? { ...item, value: editValue } : item
    );
    setContent(updatedContent);
    setCurrentEdit(null);
  };

  return (
    <div className="flex">
      {/* Main Content Area */}
      <div className="w-2/3 p-4 bg-gray-100">
        {content.map((item) => (
          <div key={item.id} className="relative group mb-4">
            {/* Render different content types */}
            {item.type === "heading" && (
              <h1 className="text-4xl font-bold">{item.value}</h1>
            )}
            {item.type === "paragraph" && <p className="mt-4">{item.value}</p>}
            {item.type === "button" && (
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                {item.value}
              </button>
            )}
            {item.type === "image" && (
              <img
                src={item.value}
                alt={item.alt || "Image"}
                className="w-full h-auto rounded-md"
              />
            )}

            {/* Show edit icon for admin */}
            {isAdmin && (
              <button
                className="absolute top-0 right-0 hidden group-hover:block bg-blue-500 text-white px-2 py-1 rounded"
                onClick={() => handleEditClick(item)}
              >
                ✏️ Edit
              </button>
            )}
          </div>
        ))}
      </div>
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
      {/* Sidebar Editor */}
      {isAdmin && currentEdit && (
        <div className="w-1/3 p-4 bg-white border-l">
          <h3 className="text-lg font-bold mb-4">Edit {currentEdit.key}</h3>

          {currentEdit.type !== "image" ? (
            <textarea
              className="w-full h-32 border p-2 rounded-md"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
            ></textarea>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Image URL</label>
                <input
                  type="text"
                  className="w-full border p-2 rounded-md"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
              </div>
            </div>
          )}

          <button
            onClick={handleSave}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default EditablePage;
