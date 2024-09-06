import React, { useEffect, useState ,useContext} from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';
const Horror = () => {
  const { loading, user } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [expanded, setExpanded] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/all-books', {
          params: { category: 'Horror' }
        });
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching the books", error);
      }
    };

    fetchBooks();
  }, []);

    // Toggle description
    const toggleDescription = (id) => {
      setExpanded(prevState => ({ ...prevState, [id]: !prevState[id] }));
    };
    const addToCart = async (bookId) => {
      if (!user) {
        console.error('User not authenticated');
        return;
      }
    
      try {
        const userId = user.uid;
        const response = await fetch('http://localhost:5000/cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId, bookId }),
        });
    
        if (response.ok) {
          console.log('Book added to cart successfully');
          // Optionally update UI to reflect the change (e.g., disable button)
          navigate("/cart");
        } else {
          console.error('Failed to add book to cart');
          // Handle specific error cases based on response status or content
        }
      } catch (error) {
        console.error('Error adding to cart:', error);
      }
    };
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-12 mt-32 text-center">Horror Books</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <div key={book._id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <img src={book.imageURL} alt={book.bookTitle} className="w-full h-48 object-cover rounded-t-lg" />
            <div className="mt-4">
              <h3 className="text-lg font-semibold">{book.bookTitle}</h3>
              <p className="text-gray-600">by {book.authorName}</p>
              {/* <p className="mt-2 text-gray-800">{book.bookDescription}</p> */}
              {/* <a href={book.bookPDFURL} className="block mt-4 text-blue-500 hover:underline">Read PDF</a> */}
              <p className="mt-2 text-lg font-bold">${book.price}</p>

              <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              <p>
                {expanded[book._id] ? book.bookDescription : `${book.bookDescription.substring(0, 100)}...`}
                <button onClick={() => toggleDescription(book._id)} className="text-blue-500">
                  {expanded[book._id] ? 'Read Less' : 'Read More'}
                </button>
              </p>
            </h5>

            <Link to={`/buy/${book._id}`} className='cursor-pointer'>
              <div className="flex justify-center mt-8 mb-4">
                <button className='bg-blue-700 text-white font-semibold px-8 py-5 hover:bg-black transition-all duration-300 rounded-xl'>
                  Buy Now
                </button>
              </div>
            </Link>
            <div className='flex justify-center'>
              <button
                onClick={() => addToCart(book._id)}
                className='bg-green-700 text-white font-semibold px-6 py-5 hover:bg-black transition-all duration-300 rounded-xl mt-6'
              >
                Add to Cart
              </button>
            </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Horror;
