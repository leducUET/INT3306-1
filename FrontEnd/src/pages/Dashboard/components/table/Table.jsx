import "./table.scss";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const ListTable = () => {
  const rows = [
    {
      id: 2235235,
      product: "Production Base 1",
      img: "https://m.media-amazon.com/images/I/31JaiPXYI8L._AC_UY327_FMwebp_QL65_.jpg",
      address: "Le Loi, An Duong, Hai Phong",
      date: "1 March",
      type: "Cơ sở sản xuất",
      status: "Expired",
    },
    {
      id: 2342353,
      product: "Production Base 2",
      img: "https://m.media-amazon.com/images/I/71kr3WAj1FL._AC_UY327_FMwebp_QL65_.jpg",
      address: "Le Loi, An Duong, Hai Phong",
      date: "1 March",
      type: "Cơ sở sản xuất",
      status: "Expired",
    },
    {
      id: 2357741,
      product: "Operation 2",
      img: "https://m.media-amazon.com/images/I/71wF7YDIQkL._AC_UY327_FMwebp_QL65_.jpg",
      address: "Le Loi, An Duong, Hai Phong",
      date: "1 March",
      type: "Cơ sở kinh doanh",
      status: "Expired",
    },
    {
      id: 2342355,
      product: "Operation 2",
      img: "https://m.media-amazon.com/images/I/81hH5vK-MCL._AC_UY327_FMwebp_QL65_.jpg",
      address: "Le Loi, An Duong, Hai Phong",
      date: "1 March",
      type: "Cơ sở kinh doanh",
      status: "Valid",
    },
  ];
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Mã số</TableCell>
            <TableCell className="tableCell">Tên cơ sở kinh doanh</TableCell>
            <TableCell className="tableCell">Địa chỉ</TableCell>
            <TableCell className="tableCell">Kiểu</TableCell>
            <TableCell className="tableCell">Ngày hết hạn</TableCell>
            <TableCell className="tableCell">Trạng thái</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell className="tableCell">{row.id}</TableCell>
              <TableCell className="tableCell">
                <div className="imgWrapper">
                  <img src={row.img} alt="" className="image" />
                  {row.product}
                </div>
              </TableCell>
              <TableCell className="tableCell">{row.address}</TableCell>
              <TableCell className="tableCell">{row.type}</TableCell>
              <TableCell className="tableCell">{row.date}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.status}`}>
                  {row.status === "Expired" ? "Hết hạn" : "Còn hiệu lực"}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListTable;
