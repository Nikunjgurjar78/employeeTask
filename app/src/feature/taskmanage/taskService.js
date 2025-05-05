import axios from 'axios'

//  Asign Task
const taskAsign = async (formData , token) => {

    const options = {
      headers: {
        authorization : `Bearer ${token}`,
      },
    };
    const response = await axios.post("/api/user/taskasign", formData , options);
    console.log(response.data)
    return response.data;
};

// Get all task
const getAllTask = async(token)=> {
  const options = {
    headers: {
      authorization : `Bearer ${token}`,
    },
  };
  const response = await axios.get("/api/user/taskasign" , options);
  console.log(response.data)
  return response.data;
};


// Update task data
const updateTask = async(id ,updatedData , token) => {
  const options = {
    headers : {
      authorization : `Bearer ${token}`
    }
  };

  const response = await axios.put(`/api/user/taskasign/${id}` , updatedData , options);
  console.log(response.data , 'resdata')
  return response.data
};







const taskService = {taskAsign, getAllTask, updateTask}
export default taskService