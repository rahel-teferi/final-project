import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { useState, useEffect } from "react";
import AuthContext from "../core/AuthContext";
import { useContext } from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box
      sx={{
        flexShrink: 0,
        ml: 2.5,
        marginRight: "200px",
        alignItems: "center",
      }}
    >
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export const UserLoanedTable = () => {
  const [loanedBooks, setLoanedBooks] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const baseURL = "http://localhost:3000";
  const { user } = useContext(AuthContext);

  const fetchLoanedBooks = async () => {
    try {
      const response = await fetch(`${baseURL}/loans/users/${user.userId}`);

      if (!response.ok) {
        throw error("not found");
      }
      const result = await response.json();
      setLoanedBooks(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLoanedBooks();
  }, []);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - loanedBooks.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const onExtend = async (loan_id, row) => {
    if (row.is_returned === "Yes") {
      alert("Already returned book");
    } else if (row.extenssion_count >= 3) {
      alert("Extenssion exceeded");
    } else {
      try {
        console.log(`${baseURL}/loans/extend/${loan_id}`);
        const response = await fetch(`${baseURL}/loans/extend/${loan_id}`);
        console.log(response);
        console.log(loan_id);
        if (!response.ok) {
          throw "not found";
        }
        const result = await response.json();

        alert(result.message);
        fetchLoanedBooks();
      } catch (err) {
        console.log(err.message);
      }
    }
  };
  if (loanedBooks.length === 0) {
    return (
      <h3 style={{ width: "100%", padding: "20px" }}>No loaned books yet</h3>
    );
  } else {
    return (
      <div style={{ width: "100%", padding: "20px", overflow: "hidden" }}>
        <h1>List of loaned books</h1>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 1100, padding: "10px 50px" }}>
            <Table aria-label="custom pagination table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Loan Id</StyledTableCell>
                  <StyledTableCell align="left">Title</StyledTableCell>
                  <StyledTableCell align="left">Loan date</StyledTableCell>
                  <StyledTableCell align="left">Return date</StyledTableCell>
                  <StyledTableCell align="left">Returned</StyledTableCell>
                  <StyledTableCell align="left">Extend loan</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? loanedBooks.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : loanedBooks
                ).map((row) => (
                  <StyledTableRow
                    key={row.loan_id}
                    sx={{ th: { border: 1000 } }}
                  >
                    <StyledTableCell component="td" scope="row">
                      {row.loan_id}
                    </StyledTableCell>
                    <StyledTableCell align="left" scope="row">
                      {row.book}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {row.loan_date.slice(0, 10)}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {row.return_date.slice(0, 10)}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {row.is_returned}
                    </StyledTableCell>
                    <StyledTableCell>
                      {row.extenssion_count < 3 && row.is_returned == "No" && (
                        <button
                          onClick={() => {
                            onExtend(row.loan_id, row);
                          }}
                        >
                          Extend
                        </button>
                      )}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
                {emptyRows > 0 && (
                  <StyledTableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </StyledTableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow
                  style={{
                    height: "100%",
                    alignContent: "center",
                    justifyContent: "center",
                  }}
                >
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: "All", value: -1 },
                    ]}
                    colSpan={6}
                    count={loanedBooks.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    slotProps={{
                      select: {
                        inputProps: {
                          "aria-label": "rows per page",
                        },
                        native: true,
                      },
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    );
  }
};
