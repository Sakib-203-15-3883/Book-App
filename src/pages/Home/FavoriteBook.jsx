import React from 'react'
import favBook from '../../assets/favoritebook.jpg'
import { Link } from 'react-router-dom'
import animationData from '../../assets/banner-books/CTA.json';
import Lottie from 'react-lottie';
const FavoriteBook = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData, // The animation data
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};
  return (
    <div className='px-4 lg:px-24 my-20 flex flex-col md:flex-row justify-between items-center gap-12'>

         
<div className='md:w-1/2 h-full'>
                    <Lottie 
                        options={defaultOptions}
                        height={400} // Adjust height as needed
                        width={400}  // Adjust width as needed
                    />
                </div>


        <div className='space-y-6 md:w-1/2'>
            <h2 className='text-5xl my-5 font-bold md:w-3/4 leading-snug'>Find all available  <span className='text-blue-600'>Book Here!</span></h2>
            <p className='mb-10 text-lg md:w-5/6'>Browse through our huge selection of books! From bestsellers to hidden gems, we have something for every reader. Use our easy search feature to find the perfect book for you. Start exploring now!</p>
            {/* <div className='flex flex-col sm:flex-row justify-between gap-6 md:w-3/4 my-14'>
              <div>
                <h3 className='text-3xl font-bold '>800+</h3>
                <p className='text-base'>Book Listing</p>
              </div>
              <div>
                <h3 className='text-3xl font-bold '>550+</h3>
                <p className='text-base'>Regsiter User</p>
              </div>
              <div>
                <h3 className='text-3xl font-bold '>1200+</h3>
                <p className='text-base'>Pdf Downloaded</p>
              </div>
            </div> */}
            <Link to="/shop" className='block mt-8'><button className='bg-blue-700 text-white font-semibold px-5 py-2  hover:bg-black transition-all duration-300 rounded-xl '>Explore Now</button></Link>
        </div>
    </div>
  )
}

export default FavoriteBook