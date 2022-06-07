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
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import "./premiseModal.scss";

const PremiseModal = ({ open, setOpen, dataInput, setDataInput, mode }) => {
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === "edit") {
    } else if (mode === "create") {
    }
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const handleInputChange = (e) => {
    setDataInput({ ...dataInput, [e.target.name]: e.target.value });
  };
  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
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
          <InputLabel id="genderLabel">Giới tính</InputLabel>
          <Select
            labelId="genderLabel"
            name="gender"
            onChange={handleInputChange}
            value={dataInput.gender}
            input={<OutlinedInput label="Giới tính" />}
          >
            <MenuItem value={"Nam"}>Nam</MenuItem>
            <MenuItem value={"Nữ"}>Nữ</MenuItem>
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

export default PremiseModal;
