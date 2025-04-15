import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth/authSlice"
import employe from "./employee/employeeSlice"
import task from "./taskmanage/taskSlice"


const store = configureStore({
  reducer: { auth, employe ,task  },
});

export default store;