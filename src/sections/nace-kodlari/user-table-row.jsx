import PropTypes from 'prop-types';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export default function UserTableRow({
  selected,
  nace_code,
  business,
  hazard_class,
  handleClick,
  handleOpenEdit,
  handleOpenDelete
}) {
  let backgroundColor = '';
  switch (hazard_class) {
    case "Tehlikeli":
      backgroundColor = 'orange';
      break;
    case "Az Tehlikeli":
      backgroundColor = 'green';
      break;
    default:
      backgroundColor = 'red';
  }
  
  return (
    <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>

        <TableCell>{nace_code}</TableCell>
        <TableCell>{business}</TableCell>
        <TableCell>
          <Typography variant="body2" noWrap style={{ backgroundColor, color: '#fff', padding: 5, borderRadius: 10 }}>
            {hazard_class}
          </Typography>  
        </TableCell>

      </TableRow>
  );
}

UserTableRow.propTypes = {
  hazard_class: PropTypes.any,
  nace_code: PropTypes.any,
  handleClick: PropTypes.func,
  business: PropTypes.any,
  selected: PropTypes.any,
  handleOpenEdit: PropTypes.func,
  handleOpenDelete: PropTypes.func,
};
