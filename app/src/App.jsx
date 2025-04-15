import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Home from "./pages/Home"
import { ToastContainer } from "react-toastify";
import Navbar from "./Component/Navbar"
import Privatecomponent from "./Component/Privatecomponent"
import Employee from "./pages/Employee"
import Task from "./pages/Task";


function App() {


  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<Privatecomponent />} >
          <Route path="/" element={<Home />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/task" element={<Task />} />
        </Route>

      </Routes>
      <ToastContainer />
    </Router>
  )
}

export default App
