import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { addStaffAsync, updateStaffAsync } from "../moderatorSlice";
import { provinceData } from "../provinceData";
import "./moderatorModal.scss";

const ModeratorModal = ({ open, setOpen, dataInput, setDataInput, mode }) => {
  const dispatch = useDispatch();
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 224,
        width: 250,
      },
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === "edit") {
      dispatch(updateStaffAsync(dataInput));
    } else if (mode === "create") {
      dispatch(addStaffAsync(dataInput));
    }
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const handleInputChange = (e) => {
    setDataInput({ ...dataInput, [e.target.name]: e.target.value });
  };
  const handleBackDropClick = () => {
    setOpen(false);
  };

  return (
    <Modal onBackdropClick={handleBackDropClick} open={open}>
      <Box component="form" className="formContainer">
        <TextField
          name="email"
          label="E-mail"
          color="primary"
          value={dataInput.email}
          required
          autoFocus
          onChange={handleInputChange}
        />
        <TextField
          name="firstName"
          label="Tên"
          color="primary"
          required
          value={dataInput.firstName}
          onChange={handleInputChange}
        />
        <TextField
          name="lastName"
          label="Họ"
          value={dataInput.lastName}
          color="primary"
          required
          onChange={handleInputChange}
        />
        <FormControl>
          <InputLabel id="genderLabel">Giới tính *</InputLabel>
          <Select
            labelId="genderLabel"
            name="gender"
            onChange={handleInputChange}
            value={dataInput.gender}
            label="Giới tính *"
            MenuProps={MenuProps}
          >
            <MenuItem disabled value="">
              <em>Giới tính</em>
            </MenuItem>
            <MenuItem value={"Nam"}>Nam</MenuItem>
            <MenuItem value={"Nữ"}>Nữ</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="placeManagementLabel">Vùng quản lý *</InputLabel>
          <Select
            labelId="placeManagementLabel"
            name="placeManagement"
            onChange={handleInputChange}
            value={dataInput.placeManagement}
            label="Vùng quản lý *"
            MenuProps={MenuProps}
            // input={<TextField label="Vùng quản lý" />}

            // input={<OutlinedInput label="Vùng quản lý" />}
          >
            <MenuItem disabled value="">
              <em>Vùng quản lý</em>
            </MenuItem>
            {provinceData.map((province) => (
              <MenuItem key={province.provinceID} value={province.provinceName}>
                {province.provinceName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <div className="btns">
          <Button
            type="submit"
            className="buttonSubmit"
            color="primary"
            variant="contained"
            onClick={handleSubmit}
          >
            {mode === "edit" ? "Lưu" : "Tạo mới"}
          </Button>
          <Button
            className="buttonCancel"
            color="primary"
            variant="contained"
            onClick={handleCancel}
          >
            Hủy
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default ModeratorModal;
