import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider"; // Adjust the path according to your project structure

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useContext(AuthContext); // Use AuthContext

  useEffect(() => {
    const fetchCartItems = async () => {
      if (user) {
        const userId = user.uid;
        try {
          const response = await fetch(`http://localhost:5000/cart/${userId}`);
          if (response.ok) {
            const result = await response.json();
            setCartItems(result?.items || []);
          } else {
            console.error("Failed to fetch cart items");
          }
        } catch (error) {
          console.error("Error fetching cart items:", error);
        }
      } else {
        console.error("User not authenticated");
      }
    };
    fetchCartItems();
  }, [user]);

  const removeFromCart = async (bookId) => {
    if (user) {
      const userId = user.uid;
      try {
        const response = await fetch("http://localhost:5000/cart", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, bookId }),
        });
        if (response.ok) {
          setCartItems(cartItems.filter((item) => item._id !== bookId));
        } else {
          console.error("Failed to remove from cart");
        }
      } catch (error) {
        console.error("Error removing from cart:", error);
      }
    } else {
      console.error("User not authenticated");
    }
  };

  return (
    <div className="mt-40 mx-2 flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cartItems.length === 0 ? (
          <p className="text-center text-lg col-span-2">Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover rounded-t-md"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-2">{item.author}</p>
                <p className="text-gray-600 mb-2">{`Price: $${item.price}`}</p>
                <div className="flex justify-between">
                  <Link to={`/buy/${item._id}`} className="cursor-pointer">
                    <button className="bg-blue-700 px-4 py-2 text-white font-medium hover:bg-black transition-all ease-in duration-200 rounded-lg text-lg">
                      Buy Now
                    </button>
                  </Link>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="bg-red-700 px-4 py-2 text-white font-medium hover:bg-black transition-all ease-in duration-200 rounded-lg text-lg ml-4"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Cart;
