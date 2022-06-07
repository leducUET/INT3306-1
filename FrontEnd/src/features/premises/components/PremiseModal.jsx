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
import { HNdistrictData } from "../../Morderator/provinceData";
import { addPremisesAsync } from "../premisesSlice";

import "./premiseModal.scss";

const PremiseModal = ({ open, setOpen, dataInput, setDataInput, mode }) => {
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
    } else if (mode === "create") {
      dispatch(addPremisesAsync(dataInput));
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
          name="name"
          label="Tên cơ sở"
          color="primary"
          value={dataInput.name}
          required
          autoFocus
          onChange={handleInputChange}
        />
        <TextField
          name="phoneNumber"
          label="Số điện thoại"
          color="primary"
          required
          value={dataInput.phoneNumber}
          onChange={handleInputChange}
        />
        <FormControl>
          <InputLabel id="typeLabel">Loại hình hoạt động *</InputLabel>
          <Select
            labelId="typeLabel"
            name="type"
            onChange={handleInputChange}
            value={dataInput.type}
            label="Loại hình hoạt động *"
          >
            <MenuItem disabled value="">
              <em>Loại hình hoạt động</em>
            </MenuItem>
            <MenuItem value="Sản xuất thực phẩm">Sản xuất thực phẩm</MenuItem>
            <MenuItem value="Dịch vụ ăn uống">Dịch vụ ăn uống</MenuItem>
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel id="districtLabel">Quận/Huyện *</InputLabel>
          <Select
            labelId="districtLabel"
            name="district"
            onChange={handleInputChange}
            value={dataInput.district}
            label="Quận/Huyện *"
            MenuProps={MenuProps}
          >
            <MenuItem disabled value="">
              <em>Quận/Huyện</em>
            </MenuItem>
            {HNdistrictData.map((district) => (
              <MenuItem
                key={district.district_id}
                value={district.district_name}
              >
                {district.district_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          name="wards"
          label="Địa chỉ"
          color="primary"
          required
          value={dataInput.wards}
          onChange={handleInputChange}
        />

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
