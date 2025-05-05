import React from 'react';
import { useLocation } from 'react-router-dom';

const Userdatatable = () => {
    const location = useLocation();

    const employeeData = location.state?.employee || [];
    const taskData = location.state?.task || [];

    console.log(employeeData, 'empstate');
    console.log(taskData, 'taskstate');

    return (
        <div className="overflow-x-auto bg-white rounded-xl shadow p-6 mb-6 w-full">
            {/* Displaying Employee Data if it exists */}
            {employeeData.length > 0 && (
                <>
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Employees List</h2>
                    <table className="min-w-full border text-sm text-left text-gray-700">
                        <thead className="bg-gray-100 text-xs uppercase text-gray-600">
                            <tr>
                                <th className="py-3 px-4 border-b">S.No</th>
                                <th className="py-3 px-4 border-b">Name</th>
                                <th className="py-3 px-4 border-b">Email</th>
                                <th className="py-3 px-4 border-b">Phone</th>
                                <th className="py-3 px-4 border-b">Department</th>
                                <th className="py-3 px-4 border-b">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employeeData.map((user, index) => {
                                return (
                                    <tr key={user._id} className="hover:bg-gray-50 transition">
                                        <td className="py-3 px-4 border-b">{index + 1}</td>
                                        <td className="py-3 px-4 border-b">{user.name}</td>
                                        <td className="py-3 px-4 border-b">{user.email}</td>
                                        <td className="py-3 px-4 border-b">{user.phone}</td>
                                        <td className="py-3 px-4 border-b">{user.department}</td>
                                        <td className="py-3 px-4 border-b">{user.status}</td>
                                        
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </>
            )}

            {/* Displaying Task Data if it exists */}
            {taskData.length > 0 && (
                <>
                    <h2 className="text-xl font-bold text-gray-800 mt-6 mb-4">Task List</h2>
                    <table className="min-w-full border text-sm text-left text-gray-700">
                        <thead className="bg-gray-100 text-xs uppercase text-gray-600">
                            <tr>
                                <th className="py-3 px-4 border-b">S.No</th>
                                <th className="py-3 px-4 border-b">Title</th>
                                <th className="py-3 px-4 border-b">Description</th>
                                <th className="py-3 px-4 border-b">Assigned</th>
                                <th className="py-3 px-4 border-b">Priority</th>
                                <th className="py-3 px-4 border-b">Deadline</th>
                                <th className="py-3 px-4 border-b">status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {taskData.map((task, index) => {
                                const assignedEmployee = employeeData.find(
                                    emp => emp._id === task.assigned
                                );
                                return (
                                    <tr key={task._id} className="hover:bg-gray-50 transition">
                                        <td className="py-3 px-4 border-b">{index + 1}</td>
                                        <td className="py-3 px-4 border-b">{task.title}</td>
                                        <td className="py-3 px-4 border-b">{task.description}</td>
                                        <td className="py-3 px-4 border-b">
                                            {assignedEmployee ? assignedEmployee.name : 'N/A'}
                                        </td>
                                        <td className="py-3 px-4 border-b">{task.priority}</td>
                                        <td className="py-3 px-4 border-b">{task.deadline}</td>
                                        <td className="py-3 px-4 border-b">{task.status}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </>
            )}

            {employeeData.length === 0 && taskData.length === 0 && (
                <p className="text-center text-gray-500">No data available</p>
            )}
        </div>
    );
};

export default Userdatatable;
