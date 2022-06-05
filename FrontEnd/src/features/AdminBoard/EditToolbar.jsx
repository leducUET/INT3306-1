import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { GridRowModes, GridToolbarContainer } from "@mui/x-data-grid-pro";
import PropTypes from "prop-types";
import { randomId } from "@mui/x-data-grid-generator";

export default function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [
      ...oldRows,
      { id, email: "", firstName: "", lastName: "", gender: "", isNew: true },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "email" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

EditToolbar.propTypes = {
  setRowModesModel: PropTypes.func.isRequired,
  setRows: PropTypes.func.isRequired,
};
