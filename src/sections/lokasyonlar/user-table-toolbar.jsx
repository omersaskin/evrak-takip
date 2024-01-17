import PropTypes from 'prop-types';

import Select from '@mui/material/Select';
import Toolbar from '@mui/material/Toolbar';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

export default function UserTableToolbar({ numSelected, filterName, onFilterName, firmaListesi }) {
    
  return (
    <Toolbar
      sx={{
        height: 96,
        display: 'flex',
        justifyContent: 'space-between',
        p: (theme) => theme.spacing(0, 1, 0, 3),
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <Select
          value={filterName}
          onChange={onFilterName}
          displayEmpty
          placeholder="Select firm"
          variant="outlined"
          sx={{ width: '100%' }} // Set the width to 100%
        >
          <MenuItem value="">Firma Seçiniz</MenuItem>
          {firmaListesi.map((firm, key) => (
            <MenuItem key={key} value={firm.id}>
              {firm.company_title}
            </MenuItem>
          ))}
        </Select>
      )}

      {/* Remaining code */}
    </Toolbar>
  );
}

UserTableToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  firmaListesi: PropTypes.arrayOf(
    PropTypes.shape({
      company_title: PropTypes.string,
      created_at: PropTypes.string,
      district_id: PropTypes.number,
      firm_sgk: PropTypes.string,
      // Include other properties based on the structure of your objects
    })
  ),
};
