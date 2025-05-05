import React, { useEffect, useState } from 'react'
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux'
import { deleteEmploye, getAllemployees, saveUserData, updateEmployee } from '../feature/employee/employeeSlice';
import Loader from '../Component/Loader';
// Icons
import { MdDelete } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";






const Employee = () => {

    const dispatch = useDispatch()

    const { employee, isLoading, isSuccess, isError, message } = useSelector((state) => state.employe)

    // Form State
    const [formdata, setformData] = useState({ name: "", email: "", phone: "", department: "", status: "" });
    const { name, email, phone, department, status } = formdata;

    // Edit State
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
        e.preventDefault()

        // Set error ("Please fill all fields")
        if (!name || !email || !phone || !department || !status) {
            toast.error("Please fill all fields");
            return;
        }

        // Edite Check 
        if (isEditing) {
            dispatch(updateEmployee({ id: editId, updatedData: formdata }));
            toast.success("Employee updated");
            clearFormInputs();
            setIsEditing(false);
            setEditId(null);
        } else {
            dispatch(saveUserData(formdata));
            clearFormInputs();
        }
    };



    const handleDelete = (id) => {
        dispatch(deleteEmploye(id));
    };

    useEffect(() => {
        // dispatch(getAllemployees())

        if (isError && message) {
            toast.error(message);
        }
    }, [isError, message]);




    // Clear Form Fields
    const clearFormInputs = () => {
        setformData({ name: "", email: "", phone: "", department: "", status: "" })
    };

    
    // Filter employees based on search 
    const [searchTerm, setSearchTerm] = useState('');
    
    const filteredEmployees = employee?.filter(emp =>
        emp.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (isLoading) {
        return <Loader />
    };

    return (
        <>
            <div className="min-h-[85vh] w-full  md:px-5 py-4 bg-gray-100">
                <div className="min-h-[80vh] w-full bg-white shadow-lg rounded-2xl p-8">
                    <h1 className="text-3xl font-semibold mb-2">Add Employees</h1>
                    <div className="w-full bg-gray-50 shadow-inner rounded-xl p-4">
                        <form
                            onSubmit={handleSubmit}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-4"
                        >
                            <input
                                type="text"
                                name="name"
                                value={name}
                                onChange={handleChange}
                                placeholder="Enter name"
                                className="min-w-[150px] p-3 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={handleChange}
                                placeholder="Enter email"
                                className="min-w-[150px] p-3 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                            <input
                                type="text"
                                name="phone"
                                value={phone}
                                onChange={handleChange}
                                placeholder="Enter phone"
                                className="min-w-[150px] p-3 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                            <input
                                type="text"
                                name="department"
                                value={department}
                                onChange={handleChange}
                                placeholder="Enter department"
                                className="min-w-[150px] p-3 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                            <select
                                name="status"
                                value={status}
                                onChange={handleChange}
                                className="min-w-[150px] p-3  rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select Status</option>
                                <option value="active">Active</option>
                                <option value="inActive">Inactive</option>
                            </select>

                            <div className="w-full">
                                <button
                                    type="submit"
                                    className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-md transition duration-200"
                                >
                                    {isEditing ? "Update" : "Add Employe"}
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="bg-white w-full rounded-xl shadow-lg p-6 mt-2">
                        {/* Heading and Search Bar */}
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="text-2xl font-semibold">Employees List</h2>
                            <input
                                type="text"
                                placeholder="Search by name"
                                className="border border-gray-300 rounded px-3 py-1 w-60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* Table */}
                        <table className="w-full border-collapse mt-2">
                            <thead>
                                <tr className="bg-gray-100 text-left text-gray-700">
                                    <th className="py-3 px-4 border-b">S.No</th>
                                    <th className="py-3 px-4 border-b">Name</th>
                                    <th className="py-3 px-4 border-b">Email</th>
                                    <th className="py-3 px-4 border-b">Phone</th>
                                    <th className="py-3 px-4 border-b">Department</th>
                                    <th className="py-3 px-4 border-b">Status</th>
                                    <th className="py-3 px-4 border-b">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredEmployees && filteredEmployees.length > 0 ? (
                                    filteredEmployees.map((emp, index) => (
                                        <tr key={emp._id} className="hover:bg-gray-50 transition">
                                            <td className="py-3 px-4 border-b">{index + 1}</td>
                                            <td className="py-3 px-4 border-b">{emp.name}</td>
                                            <td className="py-3 px-4 border-b">{emp.email}</td>
                                            <td className="py-3 px-4 border-b">{emp.phone}</td>
                                            <td className="py-3 px-4 border-b">{emp.department}</td>
                                            <td className="py-3 px-4 border-b">{emp.status}</td>
                                            <td className="py-3 px-4 border-b">
                                                <div className="flex gap-2">
                                                    <RiEdit2Fill
                                                        className="text-green-600 text-2xl cursor-pointer hover:text-black"
                                                        onClick={() => handleEdit(emp)}
                                                    />
                                                    <MdDelete
                                                        className="text-red-600 text-2xl cursor-pointer hover:text-black"
                                                        onClick={() => handleDelete(emp._id)}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="p-3 text-center text-gray-500">No employees found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Employee

{/* <div className="flex justify-end mt-10 space-x-2">
    <button className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded">Previous</button>
    <button className="px-4 py-2 bg-blue-600 text-white rounded">1</button>
    <button className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded">2</button>
    <button className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded">3</button>
    <button className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded">Next</button>
</div> */}