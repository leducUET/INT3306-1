import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";
import { toastError, toastSuccess } from "../../helpers/toast";
import authHeader from "../auth/services/auth-header";

export const getAllPremisesAsync = createAsyncThunk(
  "premises/getAllPremisesAsync",
  async () => {
    try {
      const res = await axiosClient.get(
        `premises/get-premises?district=All`,
        authHeader()
      );
      if (res.data.success) {
        const premises = res.data.premises;
        return { premises };
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
        `premises/create-premises`,
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
  "premises/updateModeratorAsync",
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

export const premisesSlice = createSlice({
  name: "premises",
  initialState: [],
  reducers: {
    addModerator: (state, action) => {},
    deleteModerator: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPremisesAsync.fulfilled, (state, action) => {
        return action.payload.premises;
      })
      .addCase(addPremisesAsync.fulfilled, (state, action) => {
        state.push(action.payload.premises);
      })
      .addCase(addPremisesAsync.rejected, (state, action) => {
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

const { reducer } = premisesSlice;
export default reducer;
