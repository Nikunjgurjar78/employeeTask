import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Dashbord = () => {

    const [data, setData] = useState([])


    const [loading, setLoading] = useState(true)


    useEffect(() => {

        const dashboardInfor = async () => {

            try {

                const user = JSON.parse(localStorage.getItem("user"))
                const token = user?.token

                if(!token){
                    console.log(token,'token')
                    return; 
                }
                const response = await axios.get("/api/dashboard/admin" ,{
                    headers:{
                        Authorization : `Bearer ${token}`
                    }
                })
                console.log(response.data, "Data")
                setData(response.data)

            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        dashboardInfor()
    }, [])



    return (
        <>

            <div className="min-h-screen bg-gray-100 p-4 md:p-8">
                <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                    <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center justify-center hover:shadow-lg transition">
                        <h2 className="text-xl font-semibold text-gray-700 mb-2">Total Employees</h2>
                        <p className="text-3xl font-bold text-blue-600">{data.totalEmployees}</p>
                    </div>

                    <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center justify-center hover:shadow-lg transition">
                        <h2 className="text-xl font-semibold text-gray-700 mb-2">Total Tasks</h2>
                        <p className="text-3xl font-bold text-green-600">{data.totalTasks}</p>
                    </div>

                    <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center justify-center hover:shadow-lg transition">
                        <h2 className="text-xl font-semibold text-gray-700 mb-2">Pending Tasks</h2>
                        <p className="text-3xl font-bold text-yellow-500">{data.pendingTasks}</p>
                    </div>

                    <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center justify-center hover:shadow-lg transition">
                        <h2 className="text-xl font-semibold text-gray-700 mb-2">Completed Tasks</h2>
                        <p className="text-3xl font-bold text-purple-600">{data.completedTasks}</p>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Dashbord