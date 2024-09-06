import React from "react";
import { useLocation, Link } from "react-router-dom";

const PaymentSuccess = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tranId = queryParams.get("tranId");

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Payment Successful!
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Transaction ID: <span className="font-mono">{tranId}</span>
        </p>
        <Link
          to="/order-list"
          className='bg-blue-700 px-6 py-3 text-white font-medium hover:bg-black transition-all ease-in duration-200 rounded-xl text-md '
        >
         See Ordered List
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
