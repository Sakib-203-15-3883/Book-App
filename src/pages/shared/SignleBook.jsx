import React from "react";
import { useLoaderData } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider"; // Adjust the path according to your project structure

const SingleBook = () => {
  const data = useLoaderData();
  const { bookTitle, imageURL, authorName, bookDescription, _id } = data;
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // Use AuthContext

  const addToCart = async (bookId) => {
    if (user) {
      const userId = user.uid;
      const response = await fetch("http://localhost:5000/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, bookId }),
      });
      if (response.ok) {
        navigate("/cart");
      } else {
        console.error("Failed to add to cart");
      }
    } else {
      console.error("User not authenticated");
    }
  };

  return (
    <div className="mt-40 mx-12 flex justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden mb-16">
        <img
          src={imageURL}
          alt={bookTitle}
          className="w-full h-95 object-cover object-center rounded-lg"
        />
        <div className="p-2 mt-14">
          <h2 className="text-gray-600 font-semibold mb-14 text-4xl ">
            Author: {authorName}
          </h2>

          <p className="text-lg  mb-6 text-gray-600 ">
            <span className="text-4xl">Title:</span> {bookTitle}
          </p>
          <p className="text-gray-600 text-lg">
            <span className="text-4xl">Description:</span> {bookDescription}
          </p>

          <div className="flex gap-10">
          <Link to={`/buy/${_id}`} className="cursor-pointer">
            <div className="flex justify-center mt-8 mb-4 ">
              <button className="bg-blue-700 px-8 py-4 text-white font-medium hover:bg-black transition-all ease-in duration-200 rounded-xl text-2xl ">
                Buy Now
              </button>
            </div>
          </Link>

          <div className="flex justify-center mt-8 mb-4">
            <button
              onClick={() => addToCart(_id)}
              className="bg-green-700 px-8 py-4 text-white font-medium hover:bg-black transition-all ease-in duration-200 rounded-xl text-2xl"
            >
              Add to Cart
            </button>
          </div>

          </div>

          
        </div>
      </div>
    </div>
  );
};

export default SingleBook;
