import React from 'react';

const AboutPage = () => {
  return (
    <div className=" min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-center  mb-8">About Us</h1>


          <div className="bg-white bg-opacity-75 shadow-md  rounded-lg">

            <p className="text-lg text-gray-800 mb-6 leading-relaxed">
              Welcome to our book shop! We are passionate about connecting readers with great books.
            </p>
            <p className="text-lg text-gray-800 mb-6 leading-relaxed">
              Our mission is to provide a wide selection of books across various genres, catering to the diverse interests
              of our customers.
            </p>
            <p className="text-lg text-gray-800 mb-6 leading-relaxed">
              Whether you're a seasoned bookworm or just beginning your reading journey, we're here to help you discover
              your next favorite read.
            </p>
            <p className="text-lg text-gray-800 mb-6 leading-relaxed">
              Feel free to explore our collection, and if you have any questions or need recommendations, don't hesitate to
              reach out to our friendly team.
            </p>
          </div>
          <div className="mt-8">
            <h2 className="text-3xl font-bold text-white mb-4">Our History</h2>
            <p className="text-lg text-gray-800 bg-white bg-opacity-75 shadow-md p-4 rounded-lg mb-6 leading-relaxed">
              Our book shop was founded in 2024 by <span className='text-xl font-bold'>Riyad && Bosrin
                </span>  . Since then, we have grown from a small local bookstore
              to a beloved destination for book lovers everywhere.
            </p>
            <h2 className="text-3xl font-bold text-white mb-4">Our Team</h2>
            <p className="text-lg text-gray-800 bg-white bg-opacity-75 shadow-md p-4 rounded-lg mb-6 leading-relaxed">
               Our team is dedicated to providing exceptional service
              and helping you find the perfect book.
            </p>
            {/* Add team members' profiles here if available */}
            <h2 className="text-3xl font-bold text-white mb-4">Special Services</h2>
            <p className="text-lg text-gray-800 bg-white bg-opacity-75 shadow-md p-4 rounded-lg mb-6 leading-relaxed">
              In addition to our extensive book collection, we offer special services .
              We are committed to enhancing your reading experience in every way possible.
            </p>
          </div>
          <div className="mt-8">
            <h2 className="text-3xl font-bold text-white mb-4">Contact Us</h2>
            <div className="bg-white bg-opacity-75 shadow-md p-6 rounded-lg">
              <p className="text-lg text-gray-800 mb-4">Address:  Daffodil Smart City,Savar, Bangladesh</p>
              <p className="text-lg text-gray-800 mb-4">Phone: 123-456-7890</p>
              <p className="text-lg text-gray-800 mb-4">Email: info@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
