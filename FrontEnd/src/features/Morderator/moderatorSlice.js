import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";
import { toastError, toastSuccess } from "../../helpers/toast";
import authHeader from "../auth/services/auth-header";

export const getAllStaffsAsync = createAsyncThunk(
  "moderator/getAllStaffsAsync",
  async () => {
    try {
      const res = await axiosClient.get(
        `users/get-users?role=staff`,
        authHeader()
      );
      if (res.data.success) {
        const staffs = res.data.users;
        return { staffs };
      }
    } catch (err) {
      console.log(err);
    }
  }
);

export const addStaffAsync = createAsyncThunk(
  "moderator/addStaffAsync",
  async (newStaff) => {
    try {
      const res = await axiosClient.post(
        `users/create-user?role=staff`,
        newStaff,
        authHeader()
      );
      if (res.data.success) {
        const staff = res.data.user;
        toastSuccess("Thêm mới thành công!");
        return { staff };
      }
    } catch (err) {
      toastError("Có lỗi xảy ra!");
      console.log(err);
    }
  }
);

export const updateStaffAsync = createAsyncThunk(
  "moderator/updateStaffAsync",
  async (updatedStaff) => {
    try {
      const res = await axiosClient.put(
        "users/edit-user",
        updatedStaff,
        authHeader()
      );
      if (res.data.success) {
        toastSuccess("Cập nhật thành công!");
        return updatedStaff;
      }
    } catch (err) {
      toastError("Có lỗi xảy ra!");
      console.log(err);
    }
  }
);

export const deleteStaffAsync = createAsyncThunk(
  "moderator/deleteStaffAsync",
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

export const moderatorSlice = createSlice({
  name: "moderator",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllStaffsAsync.fulfilled, (state, action) => {
        return action.payload.staffs;
      })
      .addCase(addStaffAsync.fulfilled, (state, action) => {
        state.push(action.payload.staff);
      })
      .addCase(addStaffAsync.rejected, (state, action) => {
        return state;
      })
      .addCase(updateStaffAsync.fulfilled, (state, action) => {
        console.log("state", state, "action", action);
      })
      .addCase(deleteStaffAsync.fulfilled, (state, action) => {
        return state.filter((staff) => staff.id !== action.payload);
      });
  },
});

const { reducer } = moderatorSlice;
export default reducer;
