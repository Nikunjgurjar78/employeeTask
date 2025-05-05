import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify";

// Component
import Navbar from "./Component/Navbar"
import Privatecomponent from "./Component/Privatecomponent"
import Userdatatable from "./Component/Userdatatable";

// Pages
import Login from "./pages/Login"
import Home from "./pages/Home"
import Task from "./pages/Task";
import Employee from "./pages/Employee"
import Dashbord from "./pages/Dashbord";



function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<Privatecomponent />} >
          <Route path="/" element={<Dashbord />} >
            <Route path="" element={<Home />} />
            <Route path="employee" element={<Employee />} />
            <Route path="task" element={<Task />} />
            <Route path='userdatatable' element={<Userdatatable />} />
          </Route>
        </Route>

      </Routes>
      <ToastContainer />
    </Router>
  )
}

export default App
