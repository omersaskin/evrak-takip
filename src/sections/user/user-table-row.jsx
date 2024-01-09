import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function UserTableRow({
  selected,
  company_title,
  short_name,
  handleClick,
  handleOpenEdit,
  handleOpenDelete,
  id,
  setSelectedRow,
  setTextInput1Edit,
  setTextInput2Edit,
  setSelectValue1Edit,
  firm_type_id
}) {
   // State to store the selected row number

  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
    setSelectedRow(id);
    setTextInput1Edit(company_title);
    setTextInput2Edit(short_name);
    setSelectValue1Edit(firm_type_id);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <TableRow
        hover
        tabIndex={-1}
      >
        <TableCell component="th" scope="row" padding="none">
          <Stack direction="column" alignItems="flex-start" spacing={2} pl={2} pt={1} pb={1}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar alt="deneme" src="https://picsum.photos/200" style={{ width: 60, height: 60 }} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="subtitle2" noWrap>
                  {company_title}
                </Typography>
                <Typography variant="body2" noWrap style={{ fontSize: 12, fontStyle: 'italic' }}>
                  {short_name}
                </Typography>
              </div>
            </Stack>
          </Stack>
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
  company_title: PropTypes.any,
  handleClick: PropTypes.func,
  short_name: PropTypes.any,
  id: PropTypes.any,
  firm_type_id: PropTypes.any,
  selected: PropTypes.any,
  handleOpenEdit: PropTypes.func,
  handleOpenDelete: PropTypes.func,
  setSelectedRow: PropTypes.func,
  setTextInput1Edit: PropTypes.func,
  setTextInput2Edit: PropTypes.func,
  setSelectValue1Edit: PropTypes.func,
};
