import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import employeeService from "./employeeService";

const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    employee: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get all Employees Data
      .addCase(getAllemployees.pending, (state, action) => {
        state.isError = false;
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(getAllemployees.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.employee = action.payload;
      })
      .addCase(getAllemployees.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })

      // Create Emoloyees  Data
      .addCase(saveUserData.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(saveUserData.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.employee = [action.payload, ...state.employee];
      })
      .addCase(saveUserData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })

      // Update Employee Data
      .addCase(updateEmployee.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.employee = state.employee.map((emp) =>
          emp._id === action.payload._id ? action.payload : emp
        );
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })


      // Delete Employee Data
      .addCase(deleteEmploye.pending, (state, action) => {
        state.isError = false;
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(deleteEmploye.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.employee = state.employee.filter(
          (emp) => emp._id !== action.payload.id
        );
      })
      .addCase(deleteEmploye.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
  },
});

export default employeeSlice.reducer;

// Create Employees
export const saveUserData = createAsyncThunk(
  "SAVE/USERDATA",
  async (formData, thunkApi) => {
    const token = thunkApi.getState().auth.user.token;
    // console.log(token)
    try {
      return employeeService.saveuser(formData, token);
    } catch (error) {
      console.log(error);
    }
  }
);

// Get all employee
export const getAllemployees = createAsyncThunk(
  "FETCH/EMPLOYEES",
  async (_, thunkApi) => {
    const token = thunkApi.getState().auth.user.token;

    try {
      return await employeeService.fetchEmployees(token);
    } catch (error) {
      console.log(error);
    }
  }
);

// Update employee 
export const updateEmployee = createAsyncThunk(
  "UPDATE/EMPLOYEE",
  async ({ id, updatedData }, thunkApi) => {
    const token = thunkApi.getState().auth.user.token;
    
    try {
      return await employeeService.updateEmployee(id, updatedData, token);
    } catch (error) {
      console.log(error);
    }
  }
);

// delete employee
export const deleteEmploye = createAsyncThunk(
  "DELETE/EMPLOYEE",
  async (id, thunkApi) => {
    const token = thunkApi.getState().auth.user.token;
    try {
      return await employeeService.deleteEmployees(id, token);
    } catch (error) {
      console.log(error);
    }
  }
);