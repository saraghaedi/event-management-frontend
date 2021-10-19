import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import { selectEventUsers } from "../../store/events/selectors";
import { EventUser } from "../../types/eventTypes";

export default function UserAttendanceTable() {
  const users = useSelector(selectEventUsers);
  return (
    <TableContainer
      component={Paper}
      sx={{ maxWidth: 400 }}
      style={{
        margin: "0 1em",
        border: "solid 1px white",
        borderRadius: "10px",
        backgroundColor: "white",
        boxShadow: "10px 10px 5px",

        padding: "1em",
      }}
    >
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: "bold" }}>Attendance</TableCell>
            <TableCell style={{ fontWeight: "bold" }} align="right">
              Name
            </TableCell>
            <TableCell style={{ fontWeight: "bold" }} align="right">
              Email
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user: EventUser) => (
            <TableRow
              key={user.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {user.name}
              </TableCell>
              <TableCell align="right">{user.name}</TableCell>
              <TableCell align="right">{user.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
