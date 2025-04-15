import axios from 'axios'


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

const getAllTask = async(token)=> {
  const options = {
    headers: {
      authorization : `Bearer ${token}`,
    },
  };
  const response = await axios.get("/api/user/taskasign" , options);
  console.log(response.data)
  return response.data;
}

const taskService = {taskAsign , getAllTask}
export default taskService