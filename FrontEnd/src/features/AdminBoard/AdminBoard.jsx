import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./adminBoard.scss";
import {
  deleteModeratorAsync,
  getAllModeratorsAsync,
  updateModeratorAsync,
} from "./adminSlice";
import AdminModal from "./components/AdminModal";

export default function AdminBoard() {
  const dispatch = useDispatch();
  const initialFormInput = {
    email: "",
    firstName: "",
    lastName: "",
    gender: "",
    placeManagement: "All",
    role: "moderator",
  };

  useEffect(() => {
    dispatch(getAllModeratorsAsync());
  }, []);

  const moderators = useSelector((state) => state.admin);
  const [openModal, setOpenModal] = useState(false);
  const [currentUserEdit, setCurrentUserEdit] = useState(initialFormInput);
  const [mode, setMode] = useState("");

  const columns = [
    {
      field: "email",
      headerName: "E-mail",
      label: "Email",
      width: 200,
    },
    {
      field: "firstName",
      headerName: "Họ",
      width: 140,
    },
    {
      field: "lastName",
      headerName: "Tên",
      width: 140,
    },
    {
      field: "gender",
      headerName: "Giới tính",
      type: "singleSelect",
      valueOptions: ["Nam", "Nữ"],
      width: 100,
    },
    {
      field: "actions",
      headerName: "Hành động",
      width: 350,
      cellClassName: "actions",
      renderCell: (e) => (
        <div className="cellAction">
          <div
            onClick={() => handleEditClick(e)}
            className="editButton textPrimary"
          >
            Sửa
          </div>
          <div onClick={() => handleDeleteClick(e)} className="deleteButton">
            Xóa
          </div>
          <div
            onClick={() => handleLockClick(e)}
            className="lockButton lockAction"
          >
            Vô hiêu hóa
          </div>
          <div
            onClick={() => handleResetClick(e)}
            className="resetButton resetAction"
          >
            Đặt lại mật khẩu
          </div>
        </div>
      ),
    },
  ];
  const handleOnCreate = (e) => {
    setCurrentUserEdit(initialFormInput);
    setOpenModal(true);
    setMode("create");
  };

  const handleEditClick = (e) => {
    setOpenModal(true);
    setCurrentUserEdit(e.row);
    setMode("edit");
  };
  const handleDeleteClick = (e) => {
    dispatch(deleteModeratorAsync(e.row.id));
  };
  const handleLockClick = (e) => {
    console.log(e.row.id);
  };
  const handleResetClick = (e) => {
    dispatch(updateModeratorAsync({ ...e.row, editPassword: true }));
  };

  return (
    <div className="adminBoard">
      {/* <div className="adminTitle">ADMIN</div> */}
      <Box
        className="usersList"
        sx={{
          height: "800px",
          "& .actions": {
            color: "#d74051",
          },
          "& .textPrimary": {
            color: "#005aff",
          },
          "& .resetAction": {
            color: "#76ff03",
          },
          "& .lockAction": {
            color: "#ff5722",
          },
          padding: "20px",
        }}
      >
        <AdminModal
          open={openModal}
          setOpen={setOpenModal}
          dataInput={currentUserEdit}
          setDataInput={setCurrentUserEdit}
          mode={mode}
        />

        <Button
          className="buttonSubmit"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOnCreate}
        >
          Thêm người điều hành
        </Button>
        <DataGrid
          rows={moderators}
          columns={columns}
          rowsPerPageOptions={[5, 10, 25, 50, 100, 250, 500]}
        />
      </Box>
    </div>
  );
}
