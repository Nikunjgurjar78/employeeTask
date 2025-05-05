import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getAllemployees } from '../feature/employee/employeeSlice';
import { allTask } from '../feature/taskmanage/taskSlice';


const Home = () => {

  const dispatch = useDispatch()

  const { employee, isLoading, isSuccess, isError, message } = useSelector((state) => state.employe);
  const { task, isLoading: taskLoading, isSuccess: taskSuccess, isError: taskError, message: taskMessage, } = useSelector((state) => state.task);


  const [data, setData] = useState([])

  useEffect(() => {
    const dashboardInfor = async () => {

      try {
        const user = JSON.parse(localStorage.getItem("user"))
        const token = user?.token

        if (!token) {
          console.log(token, 'token')
          return;
        }
        const response = await axios.get("/api/dashboard/admin", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        // console.log(response.data, "Data")
        setData(response.data)

      } catch (error) {
        console.log(error)
      }
    }
    dashboardInfor()
  }, [])




  useEffect(() => {
    dispatch(getAllemployees());

    dispatch(allTask());

    if (isError && message) {
      toast.error(message);
    }
  }, [isError, message]);



  return (
    <>

      <div className="w-full flex items-center justify-center min-h-[80vh] bg-gray-100">
        <div className="flex-1 p-4 md:p-8 w-full h-[80vh]  ">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Admin Dashboard</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-2xl shadow p-6 text-center hover:shadow-lg transition">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Total Employees</h2>
              <p className="text-3xl font-bold text-blue-600">{data.totalEmployees}</p>
            </div>

            <div className="bg-white rounded-2xl shadow p-6 text-center hover:shadow-lg transition">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Total Tasks</h2>
              <p className="text-3xl font-bold text-green-600">{data.totalTasks}</p>
            </div>

            <div className="bg-white rounded-2xl shadow p-6 text-center hover:shadow-lg transition">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Pending Tasks</h2>
              <p className="text-3xl font-bold text-yellow-500">{data.pendingTasks}</p>
            </div>

            <div className="bg-white rounded-2xl shadow p-6 text-center hover:shadow-lg transition">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Completed Tasks</h2>
              <p className="text-3xl font-bold text-purple-600">{data.completedTasks}</p>
            </div>
          </div>


          <div className="flex flex-col lg:flex-row gap-6">


            <div className="bg-white rounded-xl shadow p-6 mb-6 w-full lg:w-1/2">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Employee List</h2>
                <Link to={'userdatatable'}
                  state={{ employee }}
                  className="text-blue-600 hover:underline">View All</Link>
              </div>
              <ul className="space-y-2">
                <li className="flex text-gray-900 font-semibold border-b pb-2">
                  <span className="w-1/12">👤</span>
                  <span className="w-5/12">Name</span>
                  <span className="w-6/12">Department</span>
                  <span className="w-6/12">Status</span>
                </li>
                {employee.slice(0, 5).map((emp, i) => (
                  <li key={i} className="flex text-gray-700">
                    <span className="w-1/12">👤</span>
                    <span className="w-5/12">{emp.name}</span>
                    <span className="w-6/12">{emp.department}</span>
                    <span className="w-6/12">{emp.status}</span>
                  </li>
                ))}
              </ul>
            </div>


            {/* Task list  */}
            <div className="bg-white rounded-xl shadow p-6 mb-6 w-full lg:w-1/2">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Assigned Task List</h2>
                <Link to={'userdatatable'}
                state={{ task }}
                 className="text-blue-600 hover:underline">View All</Link>
              </div>
              <ul className="space-y-2">
                <li className="flex text-gray-900 font-semibold border-b pb-2">
                  <span className="w-1/12">👤</span>
                  <span className="w-5/12">Title</span>
                  <span className="w-6/12">Status</span>
                </li>
                {task.slice(0, 5).map((task, i) => (
                  <li key={i} className="flex text-gray-700">
                    <span className="w-1/12">👤</span>
                    <span className="w-5/12">{task.title}</span>
                    <span className="w-6/12">{task.status}</span>
                  </li>
                ))}
              </ul>
            </div>


          </div>
        </div>
      </div>
    </>
  )
};

export default Home