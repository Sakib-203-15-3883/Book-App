import React, { useState, useContext, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";

const Buy = () => {
  const { user } = useContext(AuthContext);
  const data = useLoaderData();
  const { bookTitle, imageURL, authorName, bookDescription, _id, price } = data;

  const [formData, setFormData] = useState({
    customerName: '',
    email: "",
    price: price,
    productCode: _id,
    postCode: '',
    address: '',
    phoneNumber: ''
  });

  // Use useEffect to set the email field after the component mounts
  useEffect(() => {
    if (user?.email) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        email: user.email
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/submit-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      window.location.href = data.url;
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <div className="mt-32 mx-4 sm:mx-12 flex justify-center">
      <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col lg:flex-row mb-16 w-full max-w-4xl">
        {/* Book Details */}
        <div className="w-full lg:w-1/2 p-8">
          <img
            src={imageURL}
            alt={bookTitle}
            className="w-full h-64 object-cover object-center rounded-lg"
          />
          <div className="p-4">
            <h2 className="text-gray-600 font-semibold text-2xl">
              Author: {authorName}
            </h2>
            <p className="text-lg text-gray-600 mt-2">
              <span className="font-semibold">Title:</span> {bookTitle}
            </p>
            <p className="text-gray-600 text-lg mt-2">
              <span className="font-semibold">Price:</span> {price}
            </p>
          </div>
        </div>

        {/* Order Form */}
        <form className="w-full lg:w-1/2 p-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Customer Name:
              <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                required
              />
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email:
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                readOnly
              />
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Price:
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                readOnly
              />
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Product Code:
              <input
                type="text"
                name="productCode"
                value={formData.productCode}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                readOnly
              />
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Post Code:
              <input
                type="number"
                name="postCode"
                value={formData.postCode}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                required
              />
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Address:
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                required
              />
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Phone Number:
              <input
                type="number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                required
              />
            </label>
          </div>

          <div className="flex justify-center mt-4">
            <button type="submit" className='bg-blue-700 px-4 py-4 mt-6 text-white font-medium hover:bg-black transition-all ease-in duration-200 rounded-xl text-2xl'>
              Submit Order & Pay
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Buy;
