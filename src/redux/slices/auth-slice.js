import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

const initialState = {
  data: null,
  status: "loading",
};

export const fetchUserData = createAsyncThunk(
  "auth/fetchUserData",
  async (params) => {
    const { data } = await axios.post("/auth/login", params);
    return data;
  }
);

export const fetchAuthLogin = createAsyncThunk(
  "auth/fetchAuthLogin",
  async () => {
    const { data } = await axios.get("/auth/me");
    return data;
  }
);

export const fetchAuthRegister = createAsyncThunk(
  "auth/fetchAuthRegister",
  async (params) => {
    const { data } = await axios.post("/auth/register", params);
    return data;
  }
);

const setStateData = (state, data, status) => {
  state.data = data;
  state.status = status;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      setStateData(state, null, "logout");
    },
  },
  extraReducers: {
    //login user
    [fetchUserData.pending]: (state) => {
      setStateData(state, null, "loading");
    },
    [fetchUserData.fulfilled]: (state, action) => {
      setStateData(state, action.payload, "success");
    },
    [fetchUserData.rejected]: (state) => {
      setStateData(state, null, "error");
    },

    //user data
    [fetchAuthLogin.pending]: (state) => {
      setStateData(state, null, "loading");
    },
    [fetchAuthLogin.fulfilled]: (state, action) => {
      setStateData(state, action.payload, "success");
    },
    [fetchAuthLogin.rejected]: (state) => {
      setStateData(state, null, "error");
    },

    //register user
    [fetchAuthRegister.pending]: (state) => {
      setStateData(state, null, "loading");
    },
    [fetchAuthRegister.fulfilled]: (state, action) => {
      setStateData(state, action.payload, "success");
    },
    [fetchAuthRegister.rejected]: (state) => {
      setStateData(state, null, "error");
    },
  },
});

export const selectIsAuth = (state) => Boolean(state.auth.data);
const { logout } = authSlice.actions;

export default authSlice.reducer;
export { logout };
