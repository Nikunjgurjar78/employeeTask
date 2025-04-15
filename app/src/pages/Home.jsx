import React from 'react'
import {Link} from 'react-router-dom'

const Home = () => {
  return (
    <div className='h-[80vh] bg-gray-400  flex items-center justify-center' >
     <Link to={'/employee'} className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-200' >Employee manage</Link>
     <Link to={'/task'} className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-200 ml-5' >Task manage</Link>
     <Link to={'/dashboard'} className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-200 ml-5' > Admin Dashboard</Link>
    </div>
  )
}

export default Home