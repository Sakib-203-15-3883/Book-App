import React from "react";
import { useLoaderData } from "react-router-dom";

const SingleBook = () => {
  // Fetch book data using useLoaderData hook
  const data = useLoaderData();
  const { bookTitle, imageURL, authorName, bookDescription } = data;

  return (
    <div className="mt-40 mx-12 flex justify-center">
      {" "}
      {/* Centering content and occupying 80% of the screen */}
      {/* Display book details */}
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
            {" "}
            <span className="text-4xl">Title:</span> {bookTitle}
          </p>
          <p className="text-gray-600 text-lg">
            {" "}
            <span className="text-4xl">Description:</span> {bookDescription}
          </p>

          <div className="flex justify-center mt-8 mb-4 ">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-12 rounded-lg">
            purchase
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBook;
