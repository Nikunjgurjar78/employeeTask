import axios from "axios";

// Fetch all employees
const fetchEmployees = async (token) => {
  const options = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get("/api/user/allemployeedata", options);
  return response.data;
};

// Create Employees
const saveuser = async (formData , token) => {
  const options = {
    headers: {
      authorization : `Bearer ${token}`,
    },
  };
  const response = await axios.post("/api/user/saveemployee", formData , options);
  console.log(response.data)
  return response.data;
};

// Update Employees
const updateEmployee = async (id, data, token) => {
  const options = {
      headers: {
          Authorization: `Bearer ${token}`,
      },
  };
  const response = await axios.put(`/api/user/${id}`, data, options);
  return response.data;
};



// Delete Employees
const deleteEmployees = async (id, token) => {
  const options = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`/api/user/${id}`, options);
  return response.data; 
};




const employeeService = {saveuser , fetchEmployees , deleteEmployees , updateEmployee}
export default employeeService