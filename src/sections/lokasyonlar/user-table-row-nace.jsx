import PropTypes from 'prop-types';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

export default function UserTableRow({
  nace_code,
  business,
  hazard_class,
  handleClick,
  setIsSelected,
  isSelected,
  handleOpenEdit,
  handleOpenDelete,
  setOpenNaceModal
}) {
  const handleRowClick = () => {
    setIsSelected(`${nace_code} - ${hazard_class}`);
    setOpenNaceModal(false);
  };

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

  const rowStyles = {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#F4F6F8', // Change the color to your desired hover color
    },
  };

  return (
    <TableRow 
      hover 
      tabIndex={-1} 
      role="checkbox" 
      selected={isSelected} 
      onClick={handleRowClick}
      style={rowStyles} // Change background color based on isSelected
    >
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
  setIsSelected: PropTypes.func,
  isSelected: PropTypes.bool,
  business: PropTypes.any,
  handleOpenEdit: PropTypes.func,
  handleOpenDelete: PropTypes.func,
  setOpenNaceModal: PropTypes.func,
};
