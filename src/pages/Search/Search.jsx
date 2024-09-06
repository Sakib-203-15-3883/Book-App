import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

const Search = () => {
  const { loading, user } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const [books, setBooks] = useState([]);
  const [sortOrder, setSortOrder] = useState("ascending");
  const [expanded, setExpanded] = useState({});

  const navigate = useNavigate();
  useEffect(() => {
    // Fetch data from the API
    fetchBooks();
  }, []);

  useEffect(() => {
    // Reset selected book when search query changes
    setSelectedBook(null);
  }, [searchQuery]);

  const fetchBooks = async () => {
    try {
      // Fetch data from the API
      const response = await fetch('http://localhost:5000/all-books');
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearchQuery = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSelectBook = (book) => {
    setSelectedBook(book);
  };

  const filterBooks = () => {
    return books.filter((book) => {
      return book.bookTitle.toLowerCase().includes(searchQuery.toLowerCase());
    });
  };

  const filterBooksArray = filterBooks();

  const sortedBooks = (books) => {
    return books.sort((a, b) => {
      const order = sortOrder === "ascending" ? 1 : -1;
      return order * (a.bookTitle.localeCompare(b.bookTitle));
    });
  };

  const filteredAndSortedBooks = sortedBooks(filterBooksArray);

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
        navigate("/cart");
      } else {
        console.error('Failed to add book to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const BookCard = ({ book }) => {
    const handleBuyClick = () => {
      console.log(`Buy ${book.bookTitle}`);
    };

    return (
      <div className="bg-white shadow-md mt-2 px-4 py-4 border border-blue-500 rounded-2xl flex flex-col md:flex-row items-center mb-8 mx-2 md:mx-4">
        <img src={book.imageURL} alt={book.bookTitle} className="w-full md:w-40 h-30 mb-4 md:mb-0 md:mr-8 rounded-md" />
        <div className="flex flex-col items-start">
          <h2 className="text-lg font-bold mb-1">{book.bookTitle}</h2>
          <p className="text-gray-600 mb-1">{book.authorName}</p>
          <p className="text-gray-800 font-semibold">{book.price}</p>
          <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            <p>
              {expanded[book._id] ? book.bookDescription : `${book.bookDescription.substring(0, 100)}...`}
              <button onClick={() => toggleDescription(book._id)} className="text-blue-500">
                {expanded[book._id] ? 'Read Less' : 'Read More'}
              </button>
            </p>
          </h5>
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <Link to={`/buy/${book._id}`} className="w-full md:w-auto">
              <button className="w-full md:w-auto bg-blue-700 px-8 py-2 text-white font-medium hover:bg-black transition-all ease-in duration-200 rounded-xl text-sm">
                Buy Now
              </button>
            </Link>
            <button
              onClick={() => addToCart(book._id)}
              className="w-full md:w-auto bg-green-700 text-white font-semibold px-6 py-2 hover:bg-black transition-all duration-300 rounded-xl"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="grid place-content-center m-10 mb-10 mt-32">
        <div className="relative">
          <input
            type="text"
            placeholder="Search Books"
            value={searchQuery}
            onChange={handleSearchQuery}
            className="w-full md:w-80 text-xl p-4 pl-12 bg-white border-4 border-gray-300 rounded-3xl focus:outline-none mt-16 font-bold"
          />
        </div>
      </div>

      <div className="grid place-content-center">
        {selectedBook ? (
          <div className="p-4">
            <h3 className="text-2xl font-bold mb-4">Selected Book:</h3>
            <BookCard book={selectedBook} />
          </div>
        ) : (
          filterBooksArray.length === 0 ? (
            <p className="text-3xl font-bold mb-10">No Books available</p>
          ) : (
            searchQuery && (
              <>
                {filteredAndSortedBooks.map((book) => (
                  <div key={book._id} onClick={() => handleSelectBook(book)} className="cursor-pointer">
                    <BookCard book={book} />
                  </div>
                ))}
              </>
            )
          )
        )}
      </div>
    </>
  );
};

export default Search;
