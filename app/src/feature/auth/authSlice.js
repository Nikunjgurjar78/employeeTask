
import { createSlice , createAsyncThunk} from '@reduxjs/toolkit'
import authService from './authServise';

const userExist = JSON.parse(localStorage.getItem("user"))

const authSlice = createSlice({

    name : "auth",
    initialState : {
        user : userExist || null,
        isLoading : false,
        isError : false,
        isSuccess : false,
        message : ""
    },
    reducers : {},

    extraReducers:(builder)=> {
        builder
        
        .addCase(loginUser.pending, (state, action)=>{
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
            state.message = ""
        })
        .addCase(loginUser.fulfilled, (state, action)=> {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.user = action.payload;
        })
        .addCase(loginUser.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload
        })

        .addCase(logoutUser.fulfilled, (state) => {
            state.user = null;
            // state.isAuthenticated = false;
          });

    }

});

export default authSlice.reducer

export const loginUser = createAsyncThunk("AUTH/USER" , async(formData , thunkApi)=>{
    
   try {
    return await authService.login(formData)
   } catch (error) {
    console.log(error)
   }
})

export const logoutUser = createAsyncThunk("AUTH/LOGOUT", async () => {
    localStorage.removeItem("user");
  });
  