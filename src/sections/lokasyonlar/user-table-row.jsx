import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Iconify from 'src/components/iconify';

import './styles.css';
// ----------------------------------------------------------------------

export default function UserTableRow({
  selected,
  nace_code,
  hazard_class,
  business,
  handleClick,
  handleOpenEdit,
  handleOpenDelete,
  passengersList,
  naceCodeId,
  filterName,
  firmaListesi,
  firm_sgk,
  company_title
}) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };
  console.log(filterName, firmaListesi)
  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>

        <TableCell component="th" scope="row" padding="none">
        <Stack direction="column" alignItems="flex-start" spacing={2} pl={2} pt={1} pb={1}>
          <Stack direction="row" alignItems="center" spacing={2}>
           
            <Typography variant="subtitle2" noWrap>
              {company_title}
            </Typography>
          </Stack>
        </Stack>
        </TableCell>

        <TableCell>{firm_sgk}</TableCell>
        <TableCell>
        {
              firmaListesi.map(e => (
                e.id === filterName
                ?
                  passengersList.map(k => (
                    k.id === e.nace_code_id
                    ?
                      k.nace_code
                    :
                    null
                  ))
                :
                  null
              ))
            }
        </TableCell>
        <TableCell>
          
        <Typography variant="body2" noWrap style={{ backgroundColor: 'orange', color: '#fff', padding: 5, borderRadius: 10 }}>
            {
              firmaListesi.map(e => (
                e.id === filterName
                ?
                  passengersList.map(k => (
                    k.id === e.nace_code_id
                    ?
                      k.hazard_class
                    :
                    null
                  ))
                :
                  null
              ))
            }
          </Typography>  
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleOpenEdit} sx={{ width: '100%' }}>
          <Button
            disableRipple // Disable the ripple effect on click
            startIcon={<Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />}
            fullWidth
            sx={{
              '&:hover': {
                backgroundColor: 'transparent', // Prevent hover color change
              },
              '&:active': {
                backgroundColor: 'transparent', // Prevent click color change
              },
            }}
          >
            Düzenle
          </Button>
        </MenuItem>

        <MenuItem onClick={handleOpenDelete} sx={{ color: 'error.main', width: '100%' }}>
          <Button
            disableRipple // Disable the ripple effect on click
            startIcon={<Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />}
            fullWidth
            sx={{
              '&:hover': {
                backgroundColor: 'transparent', // Prevent hover color change
              },
              '&:active': {
                backgroundColor: 'transparent', // Prevent click color change
              },
            }}
          >
            Sil
          </Button>
        </MenuItem>
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  nace_code: PropTypes.any,
  company_title: PropTypes.any,
  business: PropTypes.any,
  handleClick: PropTypes.func,
  hazard_class: PropTypes.any,
  selected: PropTypes.any,
  naceCodeId: PropTypes.any,
  filterName: PropTypes.any,
  firm_sgk: PropTypes.any,
  firmaListesi: PropTypes.any,
  passengersList: PropTypes.any,
  handleOpenEdit: PropTypes.func,
  handleOpenDelete: PropTypes.func,
};
