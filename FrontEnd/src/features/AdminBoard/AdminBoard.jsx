import CancelIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import LockIcon from "@mui/icons-material/Lock";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SaveIcon from "@mui/icons-material/Save";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { GridActionsCellItem, GridRowModes } from "@mui/x-data-grid-pro";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllModeratorsAsync } from "./adminSlice";
import EditToolbar from "./EditToolbar";

export default function AdminBoard() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getAllModeratorsAsync());
  }, [dispatch]);

  const moderators = useSelector((state) => state.admin);

  const [rows, setRows] = React.useState(moderators);
  const [rowModesModel, setRowModesModel] = React.useState({});
  // const { user } = useSelector(loginSelector);

  // if (user) {
  //   if (user.user.role !== "admin") {
  //     return <Navigate to="/unAuthorized" />;
  //   }
  // } else {
  //   return <Navigate to="/login" />;
  // }

  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    console.log(id);
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleResetClick = (id) => () => {};

  const handleLockClick = (id) => () => {};

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const columns = [
    {
      field: "email",
      headerName: "Email",
      label: "Email",
      width: 180,
      editable: true,
    },
    {
      field: "firstName",
      headerName: "First Name",
      width: 180,
      editable: true,
    },
    { field: "lastName", headerName: "Last Name", width: 180, editable: true },
    {
      field: "gender",
      headerName: "Gender",
      type: "singleSelect",
      valueOptions: ["Nam", "Nữ"],
      width: 100,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 180,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
              color="primary"
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<LockIcon />}
            label="Lock"
            className="lockAction"
            onClick={handleLockClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<RestartAltIcon />}
            className="resetAction"
            label="Reset Password"
            onClick={handleResetClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <div className="adminBoard">
      <div className="adminTitle">ADMIN</div>
      <Box
        className="usersList"
        sx={{
          height: "1000px",
          width: "100%",
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
        <DataGrid
          rows={rows}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowEditStart={handleRowEditStart}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          components={{
            Toolbar: EditToolbar,
          }}
          componentsProps={{
            toolbar: { setRows, setRowModesModel },
          }}
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
    </div>
  );
}
