import { useEffect, useState } from 'react'
import {useDispatch , useSelector} from 'react-redux'
import { loginUser } from '../feature/auth/authSlice';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from '../Component/Loader';




const Login = () => {

  const { user , isError , isSuccess , isLoading , message }= useSelector((state) => state.auth)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData , setformData ] = useState({email : "" , password:""});
  const {email, password} = formData ;

  const handleChange = (e) => {
    setformData({
      ...formData ,
      [e.target.name] : e.target.value
    })
  };


  const handleSubmit = (e)=>{
    e.preventDefault();
    if(email === ""){
      toast.error("enter email")
    }
    if(password === ""){
      toast.error("enter password")
    }

    dispatch(loginUser(formData))
  }


  useEffect(()=> {

    if(user){
      navigate("/")
    }

    if(isError || message ){
      toast.error(message)
    }

  },[user, isError, message])

  if(isLoading){
    return <Loader/>
  }

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-400 p-4">
        <div className="w-full max-w-md bg-gray-800 text-white rounded-2md shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Email"
              autoComplete="email"
              className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none"
            />


            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Enter password"
              autoComplete="current-password"
              className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none"
            />


            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-500 text-white py-3 rounded-lg"
            >
              Login
            </button>
          </form>
        </div>
      </div>

    </>
  )
}

export default Login