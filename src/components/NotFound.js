import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
      return (
            <div className='flex items-center justify-center h-screen'>
                  <div className="">
                        <h1 className='my-2'>404 | Not Found</h1>
                        <Link to='/'><button className='mx-auto bg-blue-700 hover:bg-blue-800 text-white w-[100%] py-2 rounded-md text-xs'>Go Back Home</button></Link>
                  </div>
            </div>
      );
};

export default NotFound;