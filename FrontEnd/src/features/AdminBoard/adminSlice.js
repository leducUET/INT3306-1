import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";
import authHeader from "../auth/services/auth-header";

export const getAllModeratorsAsync = createAsyncThunk(
  "admin/getAllModeratorsAsync",
  async () => {
    const res = await axiosClient.get(
      `users/get-users?role=moderator`,
      authHeader()
    );
    if (res.data.success) {
      const moderators = res.data.users;
      return { moderators };
    }
  }
);

export const addModeratorAsync = createAsyncThunk(
  "admin/addModeratorAsync",
  async (newModerator) => {
    const res = await axiosClient.post(`admin/create-moderator`, newModerator);

    if (res.data.success) {
      const moderator = res.data.moderator;
      return { moderator };
    } else {
      // xử lý người dùng đã tồn tại.
      alert("Email đã tồn tại!");
      return;
    }
  }
);

export const deleteModeratorAsync = createAsyncThunk(
  "admin/deleteModeratorAsync",
  async (payload) => {
    const res = await axiosClient.delete(`admin/delete-moderator`);
    if (res.data.success) {
      return {};
    }
  }
);

export const adminSlice = createSlice({
  name: "admin",
  initialState: [],
  reducers: {
    addModerator: (state, action) => {},
    deleteModerator: (state, action) => {},
  },
  extraReducers: {
    [getAllModeratorsAsync.fulfilled]: (state, action) => {
      return action.payload.moderators;
    },
    [addModeratorAsync.fulfilled]: (state, action) => {
      void state.push(action.payload.moderator);
    },
    [deleteModeratorAsync.fulfilled]: (state, action) => {
      return state.filter((student) => student.email !== action.payload.id);
    },
  },
});

export const { addModerator } = adminSlice.actions;
export default adminSlice.reducer;
