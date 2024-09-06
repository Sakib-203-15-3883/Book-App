
import React from 'react';
import { Link } from "react-router-dom";
const AdminPage = () => {
  return (
    <div className=" grid place-content-center  mt-36">
      <h2 className="text-2xl font-bold">Welcome to Admin Page</h2>


      <Link
               
                to="/all-order-list"
               className='bg-blue-700 px-4 py-4 mt-12 text-white font-medium hover:bg-black transition-all ease-in duration-200 rounded-xl text-xl '
              >
               See All pending ordered list
              </Link>


              <Link
               
                to="/admin-manage-books"
               className='bg-blue-700 px-4 py-4 mt-12 text-white font-medium hover:bg-black transition-all ease-in duration-200 rounded-xl text-xl '
              >
              Manage All Books
              </Link>
    </div>
  );
};

export default AdminPage;
