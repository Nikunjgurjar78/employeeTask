import React from 'react'
import {Link} from "react-router-dom"
import {useDispatch , useSelector} from 'react-redux'
import { logoutUser } from '../feature/auth/authSlice'
import {Navigate} from 'react-router-dom'


const Navbar = () => {
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth);

    const handleLogOut = () => {
        dispatch(logoutUser( <Navigate to={"/login"} /> ));
      };

    return (
        <>

            <div className="w-full bg-white shadow-md px-10 py-4 flex items-center justify-between ">

                <div className="text-2xl font-bold text-blue-600">
                   <Link to={"/"} >
                      Employee Management Deshboard
                   </Link>
                </div>

                <div className="flex gap-4">

                 {!user ? (
                    <Link to={"/login"} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-200">
                        Login
                    </Link>

                 ):(
                    <Link onClick={handleLogOut}  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200">
                        Logout
                    </Link>
                 )}

                </div>
            </div>
        </>
    )
}

export default Navbar