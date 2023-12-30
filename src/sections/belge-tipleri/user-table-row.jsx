import PropTypes from 'prop-types';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

// ----------------------------------------------------------------------

export default function UserTableRow({
  selected,
  name,
  avatarUrl,
  company,
  handleClick,
  handleOpenEdit,
  handleOpenDelete
}) {
 

  return (
<TableRow hover tabIndex={-1} role="checkbox" selected={selected}>

<TableCell>{company}</TableCell>
<TableCell>{company}</TableCell>
</TableRow>
  );
}

UserTableRow.propTypes = {
  avatarUrl: PropTypes.any,
  company: PropTypes.any,
  handleClick: PropTypes.func,
  name: PropTypes.any,
  selected: PropTypes.any,
  handleOpenEdit: PropTypes.func,
  handleOpenDelete: PropTypes.func,
};
