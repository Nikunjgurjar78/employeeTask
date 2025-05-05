import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";

// Icons
import { MdDelete } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";

import axios from "axios";
import Loader from '../Component/Loader';
import { allTask, asignTask, updateTaskData } from '../feature/taskmanage/taskSlice';

const Task = () => {

  const dispatch = useDispatch();

  const { task, isLoading, isSuccess, isError, message } = useSelector((state) => state.task);

  const [formdata, setformData] = useState({
    title: "",
    description: "",
    assigned: "",
    priority: "",
    deadline: "",
    status: "",
  });
  const { title, description, assigned, priority, deadline, status } = formdata;

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [employeeData, setEmployeeData] = useState([]);



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

        // console.log(res.data);
        setEmployeeData(res.data);
      } catch (error) {
        console.error(error, 'error');
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

  // Edit function
  const handleEdit = (tastdata) => {
    setformData(tastdata);
    setEditId(tastdata._id)
    setIsEditing(true)
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description || !assigned || !priority || !deadline || !status) {
      toast.error("Please fill all fields");
      return;
    }

    if (isEditing) {
      dispatch(updateTaskData({ id: editId, updatedData: formdata }));
      toast.success("Task updated");
      setIsEditing(false);
      setEditId(null);
      clearInputs();
    } else {
      dispatch(asignTask(formdata));
      toast.success("Task assigned");
      clearInputs();
    }
  };



  useEffect(() => {
    dispatch(allTask());

    if (isError && message) {
      toast.error(message)
    };

  }, [isError, message]);


  // Function To Clear Inputs Fiels
  const clearInputs = () => {
    setformData({ title: "", description: "", assigned: "", priority: "", deadline: "", status: "" })
  };

  if (isLoading) {
    return <Loader />;
  };

  return (
    <>
      <div className="min-h-[80vh] w-full md:px-5 py-4 bg-gray-100">
        <div className="min-h-[80vh] w-full bg-white shadow-lg rounded-2xl p-8">
          <h1 className="text-3xl font-semibold mb-2">Add Tasks</h1>
          <div className="w-full bg-gray-50 shadow-inner rounded-xl p-4">
            <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                value={title}
                onChange={handleChange}
                placeholder="Title"
                className="p-3 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="description"
                value={description}
                onChange={handleChange}
                placeholder="Description"
                className="p-3 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                name="assigned"
                value={assigned}
                onChange={handleChange}
                className="p-3 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Assign to Employee</option>
                {employeeData.map((emp) => (
                  <option key={emp._id} value={emp._id}>{emp.name}</option>
                ))}
              </select>
              <input
                type="text"
                name="priority"
                value={priority}
                onChange={handleChange}
                placeholder="Priority"
                className="p-3 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="deadline"
                value={deadline}
                onChange={handleChange}
                placeholder="Deadline"
                className="p-3 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                name="status"
                value={status}
                onChange={handleChange}
                className="p-3 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Status</option>
                <option value="pending">Pending</option>
                <option value="inProgress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
              <div className="w-full">
                <button type="submit" className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-md transition duration-200">
                  {isEditing ? "update" : "Add task"}
                </button>
              </div>
            </form>
          </div>

          <div className="bg-white w-full rounded-xl shadow-lg p-6 mt-2">
            <h2 className="text-2xl font-semibold mb-3">Tasks</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead className="bg-gray-100 text-left text-gray-700">
                  <tr>
                    <th className="py-3 px-4 border-b">S.No</th>
                    <th className="py-3 px-4 border-b">Title</th>
                    <th className="py-3 px-4 border-b">Description</th>
                    <th className="py-3 px-4 border-b">Assigned</th>
                    <th className="py-3 px-4 border-b">Priority</th>
                    <th className="py-3 px-4 border-b">Deadline</th>
                    <th className="py-3 px-4 border-b">Status</th>
                    <th className="py-3 px-4 border-b">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {task && task.length > 0 ? (
                    task.map((user, index) => {
                      const assignedEmployee = employeeData.find((emp) => emp._id === user.assigned);
                      return (
                        <tr key={user._id} className="hover:bg-gray-50 transition">
                          <td className="py-3 px-4 border-b">{index + 1}</td>
                          <td className="py-3 px-4 border-b">{user.title}</td>
                          <td className="py-3 px-4 border-b">{user.description}</td>
                          <td className="py-3 px-4 border-b">{assignedEmployee ? assignedEmployee.name : "Unknown"}</td>
                          <td className="py-3 px-4 border-b">{user.priority}</td>
                          <td className="py-3 px-4 border-b">{user.deadline}</td>
                          <td className="py-3 px-4 border-b">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${user.status === "completed"
                                ? "bg-green-100 text-green-800"
                                : user.status === "inProgress"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                                }`}
                            >
                              {user.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 border-b">
                            <div className="flex gap-2">

                              <RiEdit2Fill
                                className="text-green-600 text-2xl cursor-pointer hover:text-black"
                                onClick={() => handleEdit(user)}
                              />

                              <MdDelete
                                className="text-red-600 text-2xl cursor-pointer hover:text-black"
                                onClick={() => handleDelete(user._id)}
                              />
                            </div>
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
          
        </div>
      </div>

    </>
  )
};

export default Task