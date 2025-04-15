import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from "react-toastify";


import axios from "axios";
import { allTask, asignTask } from '../feature/taskmanage/taskSlice';
import Loader from '../Component/Loader';

const Task = () => {

  const dispatch = useDispatch()

  const { task, isLoading, isSuccess, isError, message } = useSelector((state) => state.task)


  const [formdata, setformData] = useState({
    title: "",
    description: "",
    assigned: "",
    priority: "",
    deadline: "",
    status: "",
  });
  const { title, description, assigned, priority, deadline, status } = formdata;

  const [employeeData, setEmployeeData] = useState([]);

  useEffect(() => {
    dispatch(allTask());
  }, [dispatch]);

  useEffect(() => {
    if (isError && message) {
      toast.error(message);
    }
  }, [isError, message]);



  useEffect(() => {
    const userData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user?.token;

        if (!token) {
          console.error("No token found");
          return;
        }

        const res = await axios.get(`/api/user/allemployeedata`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(res.data);
        setEmployeeData(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    userData();
  }, []);

  const handleChange = (e) => {
    setformData({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(asignTask(formdata));
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="employeeform h-[20vh] pt-15 pl-10 ">
        <form className='flex gap-5' onSubmit={handleSubmit} >
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
            autoComplete="email"
            className=" p-3 bg-gray-400 rounded-sm border border-gray-200 focus:outline-none"
            placeholder='title'
          />

          <input
            type="text"
            name="description"
            value={description}
            onChange={handleChange}
            autoComplete="email"
            className=" p-3 bg-gray-400 rounded-sm border border-gray-200 focus:outline-none"
            placeholder='description'
          />

          <select
            name="assigned"
            value={assigned}
            onChange={handleChange}
            className="p-3 bg-gray-400 rounded-sm border border-gray-200 focus:outline-none"
          >
            <option value="">Assign to Employee</option>
            {employeeData.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="priority"
            value={priority}
            onChange={handleChange}
            autoComplete="priority"
            className=" p-3 bg-gray-400 rounded-sm border border-gray-200 focus:outline-none"
            placeholder='Priority'
          />
          <input
            type="text"
            name="deadline"
            value={deadline}
            onChange={handleChange}
            autoComplete="deadline"
            className=" p-3 bg-gray-400 rounded-sm border border-gray-200 focus:outline-none"
            placeholder='Deadline'
          />
          <select
            name="status"
            value={status}
            onChange={handleChange}
            className="p-3 bg-gray-400 rounded-sm border border-gray-200 focus:outline-none"
          >
            <option value="">Select Status</option>
            <option value="pending">Pending</option>
            <option value="inProgress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <button type='submit' className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-200'>
            Add Task
          </button>
        </form>
      </div>

      <div className="p-4 mt-10">
        <h2 className="text-2xl font-semibold mb-4"> Task </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg shadow">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">Title</th>
                <th className="p-3">Description</th>
                <th className="p-3">Assign Employ</th>
                <th className="p-3">Priority</th>
                <th className="p-3">Deadline</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {task && task.length > 0 ? (
                task.map((user) => {
                  const assignedEmployee = employeeData.find((emp) => emp._id === user.assigned);
                  return (
                    <tr key={user._id} className="border-t">
                      <td className="p-3">{user.title}</td>
                      <td className="p-3">{user.description}</td>
                      <td className="p-3">{assignedEmployee ? assignedEmployee.name : "Unknown"}</td>
                      <td className="p-3">{user.priority}</td>
                      <td className="p-3">{user.deadline}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-sm ${user.status === "completed" ? "bg-green-100 text-green-800" :
                            user.status === "inProgress" ? "bg-yellow-100 text-yellow-800" :
                              "bg-red-100 text-red-800"
                          }`}>
                          {user.status}
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="p-3 text-center">No tasks found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Task