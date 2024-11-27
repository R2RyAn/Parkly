import React, { useState } from "react";

const ListingPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    availability_start: "",
    availability_end: "",
    owner_id: "60363607-49fa-41e2-9697-98690251136c", // Replace with dynamic owner ID if available
    content: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    const formattedData = {
      title: formData.title,
      owner_id: formData.owner_id,
      description: formData.description,
      location: formData.location,
      price: parseFloat(formData.price),
      availability_start: new Date(formData.availability_start).toISOString(),
      availability_end: new Date(formData.availability_end).toISOString(),
      content: formData.content.split(",").map((url) => url.trim()),
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/posts/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      setSuccessMessage("Post created successfully!");
      setFormData({
        title: "",
        description: "",
        price: "",
        location: "",
        availability_start: "",
        availability_end: "",
        owner_id: "60363607-49fa-41e2-9697-98690251136c", // Reset owner ID dynamically if needed
        content: "",
      });
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex justify-center items-center">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Create a New Listing
        </h1>

        {successMessage && (
          <div className="text-green-600 mb-4">{successMessage}</div>
        )}
        {errorMessage && (
          <div className="text-red-600 mb-4">{errorMessage}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg"
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Price/Hour"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg"
              required
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg"
              required
            />
            <input
              type="datetime-local"
              name="availability_start"
              placeholder="Availability Start"
              value={formData.availability_start}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg"
              required
            />
            <input
              type="datetime-local"
              name="availability_end"
              placeholder="Availability End"
              value={formData.availability_end}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg"
              required
            />
          </div>

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg"
            rows="4"
            required
          />

          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700"
            >
              Image URLs (Comma Separated)
            </label>
            <input
              type="text"
              name="content"
              placeholder="Enter image URLs"
              value={formData.content}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  content: e.target.value.split(",").map((url) => url.trim()),
                })
              }
              className="w-full p-3 border rounded-lg"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition"
          >
            Create Listing
          </button>
        </form>
      </div>
    </div>
  );
};

export default ListingPage;
