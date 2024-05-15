import React, { useState, useEffect } from 'react';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const [books, setBooks] = useState([]);
  const [sortOrder, setSortOrder] = useState("ascending");

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



  const BookCard = ({ book }) => {

    const handleBuyClick = () => {
      // Implement buy functionality here
      console.log(`Buy ${book.bookTitle}`);
    };
    return (
      <div className="bg-white mx-4 shadow-md mt-2 px-6 py-4 mb-4 border border-blue-500 rounded-2xl flex items-center">
        <img src={book.imageURL} alt={book.bookTitle} className="w-40 h-30 mr-8 rounded-md " />
        <div>
          <h2 className="text-lg font-bold mb-1">{book.bookTitle}</h2>
          <p className="text-gray-600 mb-1">{book.authorName}</p>
          <p className="text-gray-800 font-semibold">{book.price}</p>
          <button onClick={handleBuyClick} className='bg-blue-700 px-8 py-4 text-white font-medium hover:bg-black transition-all ease-in duration-200 rounded-xl text-sm mt-6 '>Buy</button>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="grid place-content-center m-10 mb-10">
        <div className="relative">
          <input
            type="text"
            placeholder="Search Books"
            value={searchQuery}
            onChange={handleSearchQuery}
            className="w-80 text-xl p-4 pl-12 bg-white border-4 border-gray-300 rounded-3xl focus:outline-none mt-16 font-bold"
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
}

export default Search;
