import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import taskService from "./taskService";

const taskSlice = createSlice({
  name: "task",
  initialState: {
    task: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Asign Task
      .addCase(asignTask.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(asignTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.task.push(action.payload);
      })
      .addCase(asignTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Get All Tasks
      .addCase(allTask.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(allTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.task = action.payload;
      })
      .addCase(allTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // UpdateTask
      .addCase(updateTaskData.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(updateTaskData.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.task = state.task.map((task) =>
           task._id === action.payload._id ? action.payload : task
        );
      })
      .addCase(updateTaskData.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});

export default taskSlice.reducer;

// Asign Task
export const asignTask = createAsyncThunk(
  "TASK/ASIGN",
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await taskService.taskAsign(formData, token);
    } catch (error) {
      console.log(error);
    }
  }
);

// Get All Task
export const allTask = createAsyncThunk("ALL/TASK", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await taskService.getAllTask(token);
  } catch (error) {
    console.log(error);
  }
});

// Task Data Update
export const updateTaskData = createAsyncThunk(
  "UPDATE/TASK",
  async ({ id, updatedData }, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    try {
      console.log(updatedData , 'updatedData')
      return await taskService.updateTask(id, updatedData, token);
    } catch (error) {
      console.log(error);
    }
  }
);
