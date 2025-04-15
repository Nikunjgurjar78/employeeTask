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
      });
  },
});

export default taskSlice.reducer;

// task asign
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

// get task asign user

export const allTask = createAsyncThunk("ALL/TASK", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await taskService.getAllTask(token);
  } catch (error) {
    console.log(error)
  }
});
