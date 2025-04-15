import axios from "axios"



const login = async(formData) => {
    const response = await axios.post("/api/login", formData);
    localStorage.setItem("user", JSON.stringify(response.data));
    return response.data;
  };

const authService = {login}

export default authService ;