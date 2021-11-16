import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from '@mui/material/Button';
import api from "../api";
import styled from "styled-components";
import "react-table/react-table.css";

const Wrapper = styled.div`
  padding: 0 40px 40px 40px;
`;

function FreeSeatsList() {
  const [is_loading, set_is_loading] = useState(false);
  const [freeseat_data, set_freeseat_data] = useState([]);

  useEffect(() => {
    set_is_loading(true);

    async function fetchData() {
      await api.getAllFreeSeats().then((res) => {
        set_freeseat_data(res.data);
        set_is_loading(false);
      });
    }
    fetchData();
  }, []);

  const createData = (space, num_seats) => (
    {   
        space: <Button variant="text" style={{textTransform: 'none'}}>{space}</Button>, 
        num_seats 
    }
    );

  let showTable = true;
  if (!freeseat_data) {
    showTable = false;
  }
  if (!is_loading) {
    console.log(freeseat_data.data);
  } else {
    console.log("Loading");
  }

  console.log(freeseat_data.data);

  let rows;
  if (freeseat_data.data) {
    rows = freeseat_data.data.map((x) =>
      createData(x._id, Object.keys(x.seats).length)
    );
  } else {
    rows = [];
  }

  return (
    <div style={{ width: "100%" }}>
      <Wrapper style={{ width: "80vw", margin: "auto" }}>
        {showTable && (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Space</TableCell>
                  <TableCell align="right">Number of Seats</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{row.space}</TableCell>
                    <TableCell align="right">{row.num_seats}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Wrapper>
    </div>
  );
}

export default FreeSeatsList;
