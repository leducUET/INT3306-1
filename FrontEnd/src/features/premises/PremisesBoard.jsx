import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./premisesBoard.scss";
import PremiseModal from "./components/PremiseModal";
import { getAllPremisesAsync } from "./premisesSlice";

export default function PremisesBoard() {
  const dispatch = useDispatch();
  const initialFormInput = {
    name: "",
    phoneNumber: "",
    type: "",
    district: "",
    wards: "",
  };

  useEffect(() => {
    dispatch(getAllPremisesAsync());
  }, []);

  const premises = useSelector((state) => state.premises);
  const [openModal, setOpenModal] = useState(false);
  const [currentUserEdit, setCurrentUserEdit] = useState(initialFormInput);
  const [mode, setMode] = useState("");

  const columns = [
    {
      field: "name",
      headerName: "Tên cơ sở",
      label: "Email",
      width: 250,
    },
    {
      field: "phoneNumber",
      headerName: "Số điện thoại",
      type: "number",
      width: 120,
    },
    { field: "district", headerName: "Quận/Huyện", width: 150 },
    {
      field: "wards",
      headerName: "Phường",
      width: 100,
    },
    {
      field: "typeCertificate",
      headerName: "Loại chứng nhận ATTP",
      width: 160,
    },
    {
      field: "actions",
      headerName: "Thao tác",
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
    console.log(e.row.id);
  };

  return (
    <div className="staffBoard">
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
        <PremiseModal
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
          rows={premises}
          columns={columns}
          rowsPerPageOptions={[5, 10, 25, 50, 100, 250, 500]}
        />
      </Box>
    </div>
  );
}
