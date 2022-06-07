import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModeratorModal from "./components/ModeratorModal";
import "./moderatorBoard.scss";
import { getAllStaffsAsync, updateStaffAsync } from "./moderatorSlice";

export default function ModeratorBoard() {
  const dispatch = useDispatch();
  const initialFormInput = {
    email: "",
    firstName: "",
    lastName: "",
    gender: "",
    placeManagement: "",
    role: "staff",
  };

  useEffect(() => {
    dispatch(getAllStaffsAsync());
  }, []);

  const staffs = useSelector((state) => state.moderator);
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
      headerName: "Tên",
      width: 140,
    },
    { field: "lastName", headerName: "Họ", width: 140 },
    {
      field: "gender",
      headerName: "Giới tính",
      type: "singleSelect",
      valueOptions: ["Nam", "Nữ"],
      width: 80,
    },
    {
      field: "placeManagement",
      headerName: "Vùng Quản lý",
      width: 150,
    },
    {
      field: "actions",
      headerName: "Xử lý",
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
  const handleDeleteClick = (e) => {};
  const handleLockClick = (e) => {
    console.log(e.row.id);
  };
  const handleResetClick = (e) => {
    dispatch(updateStaffAsync({ ...e.row, editPassword: true }));
  };

  return (
    <div className="staffBoard">
      {/* <div className="adminTitle">ADMIN</div> */}
      <Box
        className="usersList"
        sx={{
          height: "80vh",
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
        <ModeratorModal
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
          Tạo mới
        </Button>
        <DataGrid
          rows={staffs}
          columns={columns}
          rowsPerPageOptions={[5, 10, 25, 50, 100, 250, 500]}
        />
      </Box>
    </div>
  );
}
