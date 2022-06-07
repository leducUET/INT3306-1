import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";
import { toastError, toastSuccess } from "../../helpers/toast";
import authHeader from "../auth/services/auth-header";

export const getAllPremisesAsync = createAsyncThunk(
  "admin/getAllModeratorsAsync",
  async () => {
    try {
      const res = await axiosClient.get(
        `users/get-users?role=staff`,
        authHeader()
      );
      if (res.data.success) {
        const moderators = res.data.users;
        return { moderators };
      }
    } catch (err) {
      console.log(err);
    }
  }
);

export const addPremisesAsync = createAsyncThunk(
  "premises/addPremiseAsync",
  async (newPremise) => {
    try {
      const res = await axiosClient.post(
        `premises/create-premises?role=staff`,
        newPremise,
        authHeader()
      );
      if (res.data.success) {
        const premises = res.data.premises;
        toastSuccess("Thêm mới thành công!");
        return { premises };
      }
    } catch (err) {
      toastError("Có lỗi xảy ra!");
      console.log(err);
    }
  }
);

export const updateModeratorAsync = createAsyncThunk(
  "admin/updateModeratorAsync",
  async (updatedModerator) => {
    try {
      const res = await axiosClient.put(
        "users/edit-user",
        updatedModerator,
        authHeader()
      );
      if (res.data.success) {
        toastSuccess("Cập nhật thành công!");
        return updatedModerator;
      }
    } catch (err) {
      toastError("Có lỗi xảy ra!");
      console.log(err);
    }
  }
);

export const deleteModeratorAsync = createAsyncThunk(
  "admin/deleteModeratorAsync",
  async (id) => {
    try {
      const res = await axiosClient.delete(
        `users/delete-user/${id}`,
        authHeader()
      );
      if (res.data.success) {
        toastSuccess("Xóa thành công!");

        return id;
      }
    } catch (err) {
      toastError("Có lỗi xảy ra!");
      console.log(err);
    }
  }
);

export const staffSlice = createSlice({
  name: "admin",
  initialState: [],
  reducers: {
    addModerator: (state, action) => {},
    deleteModerator: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllModeratorsAsync.fulfilled, (state, action) => {
        return action.payload.moderators;
      })
      .addCase(addModeratorAsync.fulfilled, (state, action) => {
        state.push(action.payload.moderator);
      })
      .addCase(addModeratorAsync.rejected, (state, action) => {
        return state;
      })
      .addCase(updateModeratorAsync.fulfilled, (state, action) => {
        console.log("state", state, "action", action);
      })
      .addCase(deleteModeratorAsync.fulfilled, (state, action) => {
        return state.filter((moderator) => moderator.id !== action.payload);
      });
  },
});

export const { addModerator } = staffSlice.actions;
export default staffSlice.reducer;
