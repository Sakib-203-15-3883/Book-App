import React from 'react'
import Lottie from 'react-lottie';
import animationData from '../../assets/banner-books/BookHero.json';

// import bannerImage from '../../assets/banner-books/book-removebg.png'; // Import your image

export const Banner = () => {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData, // The animation data
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };


    
    return (
        <div className=' bg-[#F5F5F5]  px-4 lg:px-24 flex items-center'>


            <div className='flex flex-col md:flex-row-reverse justify-between items-center gap-8 py-40'>
                {/* right side */}
               
                <div className='md:w-1/2 h-full'>
                    <Lottie 
                        options={defaultOptions}
                        height={400} // Adjust height as needed
                        width={400}  // Adjust width as needed
                    />
                </div>

                {/* left side */}
                <div className='md:w-1/2 space-y-8 bg-[#F5F5F5]'>
                    <h1 className='lg:text-6xl text-5xl font-bold text-black mb-5 lg:leading-tight leading-snug'>Buy and sell your books <span className='text-blue-700'>for the best prices</span></h1>
                    <p>Discover your next favorite read and organize your reading list effortlessly with This app . the ultimate destination for book enthusiasts. Join the largest global community of fellow book lovers, where you can explore curated recommendations tailored to your tastes. </p>
                    <div >
                        <input type="search" placeholder='Search a book here' className='py-2 px-2 rounded-s-sm mx-4 rounded-xl ' />

                        <button className='bg-blue-700 px-6 py-2 text-white font-medium hover:bg-black transition-all ease-in duration-200 rounded-xl '>Search</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
