import "./dataTable.scss";
import { DataGrid } from "@mui/x-data-grid";
import PropTypes from "prop-types";
import { useState } from "react";
import { Box } from "@mui/material";

const DataTable = (props) => {
  //   const [page, setPage] = useState(0);
  //   const [pageSize, setPageSize] = useState(5);

  //   const handlePageChange = (e, newPage) => {
  //     setPage(newPage);
  //   };

  //   const handlePageSizeChange = (e) => {
  //     setPageSize(parseInt(e.target.value, 10));
  //     setPage(0);
  //   };
  const { rows, columns } = props;
  return (
    <div className="dataTable">
      <DataGrid
        rows={rows}
        columns={columns}
        rowsPerPageOptions={[5, 10, 25, 50, 100, 200, 500]}
        checkboxSelection
        // page={page}
        // pageSize={pageSize}
        // onPageChange={handlePageChange}
        // onPageSizeChange={handlePageSizeChange}
      />
    </div>
  );
};

DataTable.propTypes = {
  rows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
};

export default DataTable;
