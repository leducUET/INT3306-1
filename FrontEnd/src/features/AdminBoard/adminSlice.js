import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";

export const getAllModeratorsAsync = createAsyncThunk(
  "admin/getAllModeratorsAsync",
  async () => {
    const res = await axiosClient.get(`admin/get-moderators`);
    if (res.data.success) {
      const moderators = res.data.moderators;
      console.log(moderators);
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
    addModerator: (state, action) => {
      const student = {
        id: action.payload.id,
        fullName: action.payload.fullName,
        grade: action.payload.grade,
        placeOfOrigin: action.payload.placeOfOrigin,
      };
      state.push(student);
    },
    deleteModerator: (state, action) => {
      return state.filter((student) => student.id !== action.payload.id);
    },
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
