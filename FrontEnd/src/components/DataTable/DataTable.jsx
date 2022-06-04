import "./dataTable.scss";
import { DataGrid, GridAddIcon } from "@mui/x-data-grid";
import PropTypes from "prop-types";
import { useState } from "react";
import { Box, Button, Toolbar } from "@mui/material";
import { randomId } from "@mui/x-data-grid-generator";

const DataTable = (props) => {
  const { rows, columns } = props;
  const handleClick = () => {
    const id = randomId();
  };
  return (
    <div className="dataTable">
      <Toolbar className="toolbar">
        <Button
          color="primary"
          startIcon={<GridAddIcon />}
          onClick={handleClick}
        >
          Add record
        </Button>
      </Toolbar>
      <DataGrid
        rows={rows}
        columns={columns}
        rowsPerPageOptions={[5, 10, 25, 50, 100, 200, 500]}
        checkboxSelection
      />
    </div>
  );
};

DataTable.propTypes = {
  rows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
};

export default DataTable;
