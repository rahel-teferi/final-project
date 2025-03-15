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

import { useState, useRef } from "react";
import { UpdateBook } from "./UpdateBook";
import { BookInfo } from "./BookInfo";

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

export const BooksTable = ({
  onUpdateBook,
  onRowDelete,
  books,
  onBookInfo,
  onSorting,
  book,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - books.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleClick = (e, id) => {
    onBookInfo(id);
  };

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 1100, padding: "10px 50px" }}>
          <Table aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <StyledTableCell
                  onClick={() => {
                    onSorting(Object.keys(books[0])[0]);
                  }}
                >
                  Book id
                </StyledTableCell>
                <StyledTableCell
                  onClick={() => {
                    onSorting(Object.keys(books[0])[1]);
                  }}
                  align="left"
                >
                  Title
                </StyledTableCell>
                <StyledTableCell
                  onClick={() => {
                    onSorting(Object.keys(books[0])[2]);
                  }}
                  align="left"
                >
                  Author
                </StyledTableCell>
                <StyledTableCell
                  onClick={() => {
                    onSorting(Object.keys(books[0])[3]);
                  }}
                  align="left"
                >
                  Genre
                </StyledTableCell>
                <StyledTableCell
                  onClick={() => {
                    onSorting(Object.keys(books[0])[4]);
                  }}
                  align="left"
                >
                  description
                </StyledTableCell>
                <StyledTableCell
                  onClick={() => {
                    onSorting(Object.keys(books[0])[5]);
                  }}
                  align="left"
                >
                  Staus
                </StyledTableCell>
                <StyledTableCell align="left">Edit</StyledTableCell>
                <StyledTableCell align="left">Delete</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? books.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : books
              ).map((row) => (
                <StyledTableRow
                  key={row.book_id}
                  sx={{ th: { border: 1000 } }}
                  onClick={(e) => {
                    handleClick(e, row.book_id);
                  }}
                >
                  <StyledTableCell component="td" scope="row">
                    {row.book_id}
                  </StyledTableCell>
                  <StyledTableCell align="left" scope="row">
                    {row.title}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.author}</StyledTableCell>
                  <StyledTableCell align="left">{row.genre}</StyledTableCell>
                  <StyledTableCell align="left">
                    {row.description}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.status}</StyledTableCell>
                  <StyledTableCell
                    align="left"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <UpdateBook data={row} onUpdateBook={onUpdateBook} />
                  </StyledTableCell>
                  <StyledTableCell
                    align="right"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <button
                      data-id={row.book_id}
                      onClick={(e) => {
                        onRowDelete(row.book_id, e);
                      }}
                    >
                      Delete
                    </button>{" "}
                  </StyledTableCell>
                </StyledTableRow>
              ))}

              {emptyRows > 0 && (
                <StyledTableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={8} />
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
                  rowsPerPageOptions={[5, 10, 15, { label: "All", value: -1 }]}
                  colSpan={8}
                  count={books.length}
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
    </>
  );
};
