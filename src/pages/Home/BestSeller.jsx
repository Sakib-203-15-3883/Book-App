import React, { useEffect, useState } from 'react'
import BookCards from '../shared/BookCards';

const BestSeller = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/all-books").then(res => res.json()).then(data => setBooks(data.slice(0, 15)))
    }, [])

    return (
        <>
            <BookCards books={books} headline={"Popular books"} />
        </>
    )
}

export default BestSeller