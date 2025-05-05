import React from 'react'
import Sidebar from '../Component/Sidebar'
import {Outlet} from 'react-router-dom'

const Dashbord = () => {
    return (
        <>
            <div className="flex min-h-screen bg-gray-100 w-full">
                <Sidebar />
                <div className='w-full'>
                  <Outlet/>
                </div>
            </div>
        </>
    )
}

export default Dashbord