import React from 'react';
import { Link } from 'react-router-dom'

const Sidebar = () => {


    return (
        <div className=" min-h-screen bg-gray-100 flex ">
            <div className="w-64 h-[85vh] bg-white shadow-md px-6 py-8 flex flex-col">
                <div className="text-2xl font-bold text-blue-600 mb-6">Dashboard</div>

                <nav className="space-y-3">
                    <Link to={"/"} className="block text-gray-700 hover:text-blue-600 transition"> Dashboard </Link>
                    <Link to={"/employee"} className="block text-gray-700 hover:text-blue-600 transition"> Create Employee </Link>
                    <Link to={"/task"} className="block text-gray-700 hover:text-blue-600 transition"> Task manage</Link>
                </nav>

                <div className="mt-auto pt-6 border-t">
                    <a href="#" className="block text-red-500 hover:text-red-700 transition">🚪 Logout </a>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
