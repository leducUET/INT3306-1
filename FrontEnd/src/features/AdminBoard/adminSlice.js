import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";
import { toastError, toastSuccess } from "../../helpers/toast";
import authHeader from "../auth/services/auth-header";

export const getAllModeratorsAsync = createAsyncThunk(
  "admin/getAllModeratorsAsync",
  async () => {
    try {
      const res = await axiosClient.get(
        `users/get-users?role=moderator`,
        authHeader()
      );
      if (res.data.success) {
        const moderators = res.data.users;
        return { moderators };
      }
    } catch (err) {
      toastError("Có lỗi xảy ra! Không truy xuất được dữ liệu.");
      console.log(err);
    }
  }
);

export const addModeratorAsync = createAsyncThunk(
  "admin/addModeratorAsync",
  async (newModerator) => {
    try {
      const res = await axiosClient.post(
        `users/create-user?role=moderator`,
        newModerator,
        authHeader()
      );
      if (res.data.success) {
        const moderator = res.data.user;
        toastSuccess("Thêm mới thành công!");
        return { moderator };
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
    console.log(updatedModerator);
    try {
      const res = await axiosClient.put(
        "users/edit-user",
        updatedModerator,
        authHeader()
      );
      if (res.data.success) {
        toastSuccess(
          `${
            updatedModerator.editPassword ? "Đặt lại mật khẩu" : "Cập nhật"
          } thành công!`
        );
        return res.data.user;
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

export const adminSlice = createSlice({
  name: "admin",
  initialState: [],
  reducers: {},
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
        return state.map((moderator) => {
          if (moderator.id === action.payload.id) {
            return action.payload;
          }
          return moderator;
        });
      })
      .addCase(deleteModeratorAsync.fulfilled, (state, action) => {
        return state.filter((moderator) => moderator.id !== action.payload);
      });
  },
});

const { reducer } = adminSlice;
export default reducer;
