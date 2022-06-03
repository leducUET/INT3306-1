import "./dataTable.scss";
import { DataGrid } from "@mui/x-data-grid";
import PropTypes from "prop-types";
import { useState } from "react";
import { Box } from "@mui/material";

const DataTable = (props) => {
  const { rows, columns } = props;
  return (
    <div className="dataTable">
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
