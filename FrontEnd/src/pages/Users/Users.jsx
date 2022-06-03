import "./users.scss";
import DataTable from "../../components/DataTable/DataTable";

const UsersList = () => {
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 90,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
  ];

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
    { id: 11, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 12, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 13, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 14, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 15, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 16, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 17, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 18, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 19, lastName: "Roxie", firstName: "Harvey", age: 65 },
    { id: 21, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 22, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 23, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 24, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 25, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 26, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 27, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 28, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 29, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];

  return (
    <div className="usersList">
      <DataTable rows={rows} columns={columns} />
    </div>
  );
};

export default UsersList;
