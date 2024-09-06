import React, { useState, useEffect,useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';

const AllOrderedList = () => {
  const {user} = useContext(AuthContext)
  
  const [orders, setOrders] = useState([]);

  

  const fetchOrders = async () => {
    try {
      const response = await fetch(`http://localhost:5000/orders`);
      const data = await response.json();
      console.log('Fetched orders:', data); // Add this line for debugging
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    if (user ) {
      fetchOrders();
    }
  }, [user]);

  return (
    <div className="container mx-auto px-4 mt-16">
      <div className="grid place-content-center mt-20 mb-12 ">
     
        <h1
          onClick={fetchOrders}
          className="   mt-4 ml-2 px-12 py-6 font-bold text-4xl  text-white rounded-md  focus:outline-none"
        >
          All pending  orders
        </h1>
      </div>

      {/* <h2 className="mt-8 text-lg font-semibold">Ordered Products:</h2> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {orders.map(order => (
          <div key={order._id} className="border border-gray-300 rounded-md p-4 mb-12">
            <h3 className="text-lg font-semibold mb-2">Order Information</h3>
            <p><strong>Transaction ID:</strong> {order.tranId}</p>
            <p><strong>Customer Name:</strong> {order.customerName}</p>
            <p><strong>Product Code:</strong> {order.productCode}</p>
            <p><strong>Post Code:</strong> {order.postCode}</p>
            <p><strong>Address:</strong> {order.address}</p>
            <p><strong>Phone Number:</strong> {order.phoneNumber}</p>
            <p><strong>Price:</strong> {order.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllOrderedList;
