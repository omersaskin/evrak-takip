import PropTypes from 'prop-types'; // Import PropTypes
import React from 'react';
import DataTable from 'react-data-table-component';

import TablePagination from '@mui/material/TablePagination';
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions';

const Table = ({ handleChangeRowsPerPage, handleChangePage, page, rowsPerPage, count, columns, firmList }) => (
  <>
    <DataTable columns={columns} data={firmList} />
    <TablePagination
      rowsPerPageOptions={[5, 10, 25]}
      component="div"
      count={count}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      ActionsComponent={TablePaginationActions}
    />
  </>
);

Table.propTypes = {
  handleChangeRowsPerPage: PropTypes.func.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  columns: PropTypes.array.isRequired,
  firmList: PropTypes.array.isRequired, // Change from PropTypes.object to PropTypes.array
};

export default Table;
