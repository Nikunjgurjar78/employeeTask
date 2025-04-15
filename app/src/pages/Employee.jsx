import React, { useEffect, useState } from 'react'
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux'
import { deleteEmploye, getAllemployees, saveUserData, updateEmployee } from '../feature/employee/employeeSlice';
import Loader from '../Component/Loader';

const Employee = () => {

    const dispatch = useDispatch()

    const { employee, isLoading, isSuccess, isError, message } = useSelector((state) => state.employe)

    const [formdata, setformData] = useState({ name: "", email: "", phone: "", department: "", status: "" });
    const { name, email, phone, department, status } = formdata;
    const [isEditing, setIsEditing] = useState(false)
    const [editId, setEditId] = useState(null)

    const handleChange = (e) => {
        setformData({
            ...formdata,
            [e.target.name]: e.target.value
        })
    };


    const handleEdit = (emp) => {
        setformData({
            name: emp.name,
            email: emp.email,
            phone: emp.phone,
            department: emp.department,
            status: emp.status
        });
        setEditId(emp._id)
        setIsEditing(true)
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEditing) {
            dispatch(updateEmployee({ id: editId, updatedData: formdata }));
            toast.success("employee updated");
        } else {
            dispatch(saveUserData(formdata));
            setformData({
                name: "", email: "", phone: "", department: "", status: "" 
            })
        }
    };

    const handleDelete = (id) => {
        dispatch(deleteEmploye(id));
    }

    useEffect(() => {
        dispatch(getAllemployees())

        if (isError && message) {
            toast.error(message);
        }
    }, [isError, message]);




    if (isLoading) {
        return <Loader />
    }

    return (
        <>
            <div className="employeeform h-[20vh] pt-15 pl-10 ">
                <form className='flex gap-5' onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={handleChange}
                        autoComplete="email"
                        className=" p-3 bg-gray-400 rounded-sm border border-gray-200 focus:outline-none"
                        placeholder='Enter name'
                    />

                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        autoComplete="email"
                        className=" p-3 bg-gray-400 rounded-sm border border-gray-200 focus:outline-none"
                        placeholder='Enter email'
                    />

                    <input
                        type="text"
                        name="phone"
                        value={phone}
                        onChange={handleChange}
                        autoComplete="email"
                        className=" p-3 bg-gray-400 rounded-sm border border-gray-200 focus:outline-none"
                        placeholder='Enter phone'
                    />
                    <input
                        type="text"
                        name="department"
                        value={department}
                        onChange={handleChange}
                        autoComplete="email"
                        className=" p-3 bg-gray-400 rounded-sm border border-gray-200 focus:outline-none"
                        placeholder='Enter department'
                    />
                    <select
                        name="status"
                        value={status}
                        onChange={handleChange}
                        className="p-3 bg-gray-400 rounded-sm border border-gray-200 focus:outline-none"
                    >
                        <option value="">Select Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>

                    <button type='submit' className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-200'>
                        Add Employee
                    </button>
                </form>
            </div>

            <div className="p-4 mt-10">
                <h2 className="text-2xl font-semibold mb-4">Employee Management</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border rounded-lg shadow">
                        <thead className="bg-gray-100 text-left">
                            <tr>
                                <th className="p-3">Name</th>
                                <th className="p-3">Email</th>
                                <th className="p-3">Phone</th>
                                <th className="p-3">Department</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                employee && employee.length > 0 ? (
                                    employee.map((emp) => (
                                        <tr key={emp._id} className="border-t">
                                            <td className="p-3">{emp.name}</td>
                                            <td className="p-3">{emp.email}</td>
                                            <td className="p-3">{emp.phone}</td>
                                            <td className="p-3">{emp.department}</td>
                                            <td className="p-3">
                                                <span className={`px-2 py-1 rounded-full text-sm ${emp.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                                                    {emp.status}
                                                </span>
                                            </td>
                                            <td className="p-3 space-x-2">
                                                <button
                                                    onClick={() => handleEdit(emp)}
                                                    className="text-blue-600 hover:underline">Edit</button>
                                                <button
                                                    onClick={() => handleDelete(emp._id)}
                                                    className="text-red-600 hover:underline">Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="p-3 text-center">No employees found</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Employee
