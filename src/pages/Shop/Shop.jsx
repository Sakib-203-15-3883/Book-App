import React, { useContext, useEffect, useState } from 'react';
import { Card, Spinner } from 'flowbite-react';
import { AuthContext } from '../../contexts/AuthProvider';
import { Link ,useNavigate} from 'react-router-dom';

const Shop = () => {
  const { loading, user } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [expanded, setExpanded] = useState({});
  const navigate = useNavigate();
  // Fetching data
  useEffect(() => {
    fetchBooks();
  }, [loading]); // Reload books when loading state changes

  const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:5000/all-books');
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  // Loader
  if (loading) {
    return (
      <div className="text-center mt-28">
        <Spinner aria-label="Center-aligned spinner example" />
      </div>
    );
  }

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
    <div className='my-28 px-4 lg:px-24'>
      <h2 className='text-3xl font-bold text-center mb-16 z-40'>All Books are Available Here</h2>
      <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8'>
        {books.map(book => (
          <Card key={book._id}>
            <img src={book.imageURL} alt={book.bookTitle} className='h-96' />
            <h5 className='text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
              {book.bookTitle}
            </h5>
            <p className='font-normal text-gray-700 dark:text-gray-400'>
              <span className='font-bold'>Author Name:</span> {book.authorName}
            </p>
            <h5 className='text-xl font-bold tracking-tight text-gray-900 dark:text-white'>
              {expanded[book._id] ? book.bookDescription : `${book.bookDescription.substring(0, 100)}...`}
              <button onClick={() => toggleDescription(book._id)} className='text-blue-500'>
                {expanded[book._id] ? 'Read Less' : 'Read More'}
              </button>
            </h5>


            <div className='flex gap-10'>
            <Link to={`/buy/${book._id}`} className='cursor-pointer'>
              <div className='flex justify-center mt-8 mb-4'>
                <button className='bg-blue-700 text-white font-semibold px-8 py-5 hover:bg-black transition-all duration-300 rounded-xl'>
                  Buy Now
                </button>
              </div>
            </Link>
            <div >
              <button
                onClick={() => addToCart(book._id)}
                className='bg-green-700 text-white font-semibold px-6 py-5 hover:bg-black transition-all duration-300 rounded-xl mt-8'
              >
                Add to Cart
              </button>
            </div>
              
            </div>
            
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Shop;
