import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import LinearProgress from '@mui/material/LinearProgress';
import InputAdornment from '@mui/material/InputAdornment';
import TablePagination from '@mui/material/TablePagination';
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions';
import { Grid, Select, MenuItem, TextField, InputLabel, FormControl } from '@mui/material';

import Iconify from 'src/components/iconify';

import { firmAddApi, firmListCount, firmUpdateApi, firmDeleteApi, firmSearchApi, firmLogoUpload } from '../../../actions/firmActions';

const style = {
  width: '90%', maxWidth: 1000, mx: 'auto', p: 2,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
};

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

function UserPage({ firmList, firmListCount: firmListCountAs, firmListApi: firmListApiAs, firmAddApi: firmAddApiAs, firmUpdateApi: firmUpdateApiAs, firmDeleteApi: firmDeleteApiAs, firmSearchApi: firmSearchApiAs, firmLogoUpload: firmLogoUploadAs }) {
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 5,
    search: ''
  });
  const [firmName, firmNameUpdate] = useState('');
  const [firmType, firmTypeUpdate] = useState('');
  const [firmShortName, firmShortNameUpdate] = useState('');
  const [firmNameEdit, firmNameUpdateEdit] = useState('');
  const [firmShortNameEdit, firmShortNameUpdateEdit] = useState('');
  const [firmTypeEdit, firmTypeUpdateEdit] = useState('');

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  const [openMenu, setOpenMenu] = useState(null);
  const handleOpenMenu = (event, id, company_title, short_name, firm_type_id) => {
    setOpenMenu(event.currentTarget);
    
    selectedRowUpdate(id);
    firmNameUpdateEdit(company_title);
    firmShortNameUpdateEdit(short_name);
    firmTypeUpdateEdit(firm_type_id);
  };
  const handleCloseMenu = () => {
    setOpenMenu(null);
  };
  
  const [selectedRow, selectedRowUpdate] = useState('');
  const [photo, photoUpdate] = useState('');

  const handleFirmAdd = async (event) => {
    event.preventDefault();

    firmNameUpdate('');
    firmShortNameUpdate('');
    firmTypeUpdate('');

    await firmAddApiAs(firmName, firmShortName, firmType);

    await firmSearchApiAs(controller.search, controller.rowsPerPage, controller.page);

    handleClose();
  };

  const handleFirmUpdate = async (event) => {
    setOpenMenu(null);
    
    event.preventDefault();

    await firmUpdateApiAs(firmNameEdit, firmShortNameEdit, firmTypeEdit, selectedRow);

    await firmSearchApiAs(controller.search, controller.rowsPerPage);
    
    handleCloseEdit();
  };

  const handleFirmDelete = async (event) => {
    event.preventDefault();

    await firmDeleteApiAs(selectedRow);

    await firmSearchApiAs(controller.search, controller.rowsPerPage);
  
    handleCloseDelete();
  };

  const handleLogoAdd = async (event) => {
    const file = event.target.files[0]; 
    const reader = new FileReader();

    reader.onload = (e) => {
      photoUpdate(e.target.result);
    };

    reader.readAsDataURL(file);

    const fileName = file.name; 
    const fileExtension = fileName.split('.').pop();
    const path = `Logos/${fileName}`;

    await firmLogoUploadAs(path, fileExtension, fileName);
  };

  useEffect(() => {
    firmSearchApiAs(controller.search, controller.rowsPerPage, controller.page);
    firmListCountAs();
  }, [controller.search, controller, controller.rowsPerPage, firmSearchApiAs, firmListCountAs]);

  const columns = [
    {
      name: 'Firma Adı',
      selector: row => (
        <Stack direction="column" alignItems="flex-start" spacing={2} pl={2} pt={1} pb={1}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt="deneme" src="https://picsum.photos/200" style={{ width: 60, height: 60 }} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="subtitle2" noWrap>
                {row.company_title}
              </Typography>
              <Typography variant="body2" noWrap style={{ fontSize: 12, fontStyle: 'italic' }}>
                {row.short_name}
              </Typography>
            </div>
          </Stack>
        </Stack>
      ),
      width: '80%', // İlk sütun genişliği
    },
    {
      name: 'İşlem',
      selector: row => (
        <IconButton onClick={(event) => handleOpenMenu(event, row.id, row.company_title, row.short_name, row.firm_type_id)}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
      ),
      width: '20%', // İkinci sütun genişliği
    },
  ];
  

  const handleFirmName = (event) => {
    firmNameUpdate(event.target.value);
  };

  const handleFirmNameEdit = (event) => {
    firmNameUpdateEdit(event.target.value);
  };

  const handleFirmShortName = (event) => {
    firmShortNameUpdate(event.target.value);
  };

  const handleFirmShortNameEdit = (event) => {
    firmShortNameUpdateEdit(event.target.value);
  };

  const handleFirmType = (event) => {
    firmTypeUpdate(event.target.value);
  };

  const handleFirmTypeEdit = (event) => {
    firmTypeUpdateEdit(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setController({
      ...controller,
      page: newPage
    });
  };

  const handleChangeRowsPerPage = (event) => {
    setController({
      ...controller,
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0
    });
  };

  const handleChangeSearch = (event) => {
    setController({
      ...controller,
      search: event.target.value,
      page: 0
    });
  };
  
 
  console.log(firmList.loading)
  

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Firma Listesi</Typography>

        
      </Stack>

      <Card>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 20 }}>
          <div style={{ flex: '1' }}>
            <OutlinedInput
              value={controller.search}
              onChange={handleChangeSearch}
              placeholder="Firma ara..."
              sx={{ width: '100%' }} // Set the width to 100%
              startAdornment={
                <InputAdornment position="start">
                  <Iconify
                    icon="eva:search-fill"
                    sx={{ color: 'text.disabled', width: 20, height: 20 }}
                  />
                </InputAdornment>
              }
            />
          </div>

          <div style={{ marginLeft: 20 }}>
            <Button

              onClick={handleOpen}
              variant="contained"
              color="inherit"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              Firma Ekle
            </Button>
          </div>
        </div>
        {firmList.loading === true && (
          <LinearProgress />
        )}
        <DataTable
          columns={columns}
          data={firmList.firmList}
        />
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={firmList.firmListCount}
          rowsPerPage={controller.rowsPerPage}
          page={controller.page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
        />
      </Card>


      <Popover
        open={!!openMenu}
        anchorEl={openMenu}
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

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleFirmAdd}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Button component="label" variant="contained">
                  Fotoğraf Yükle
                  <VisuallyHiddenInput type="file" onChange={handleLogoAdd} />
                </Button>
              </Grid>
              <Grid item xs={12}>
                {photo && (
                  <img
                    src={photo}
                    alt="Uploaded"
                    style={{ maxWidth: 100, height: 100, borderRadius: '50%' }}
                  />
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Firma Tam Ünvan"
                  variant="outlined"
                  value={firmName}
                  onChange={handleFirmName}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Firma Kısa Ad"
                  variant="outlined"
                  value={firmShortName}
                  onChange={handleFirmShortName}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Firma Tipi</InputLabel>
                  <Select
                    value={firmType}
                    label="Firma Tipi"
                    onChange={handleFirmType}
                    variant="outlined"
                  >
                    <MenuItem value="0">Tüzel</MenuItem>
                    <MenuItem value="1">Firma</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Kaydet
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>

      </Modal>

      <Modal
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Firma Tam Ünvan"
                  variant="outlined"
                  value={firmNameEdit}
                  onChange={handleFirmNameEdit}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Firma Kısa Ad"
                  variant="outlined"
                  value={firmShortNameEdit}
                  onChange={handleFirmShortNameEdit}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Firma Tipi</InputLabel>
                  <Select
                    value={firmTypeEdit}
                    label="Firma Tipi"
                    onChange={handleFirmTypeEdit}
                    variant="outlined"
                  >
                    <MenuItem value="0">Tüzel</MenuItem>
                    <MenuItem value="1">Firma</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button onClick={handleFirmUpdate} type="submit" variant="contained" color="primary">
                  Kaydet
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>

      </Modal>

      <Modal
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container spacing={2}>

            <Grid item xs={12} style={{ textAlign: 'center' }}>
              <Typography>Silmek istediğinize emin misiniz?</Typography>
            </Grid>
            <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="contained"
                color="primary"
                style={{ width: '100%', textAlign: 'center' }}
                onClick={handleFirmDelete}
              >
                Evet
              </Button>
            </Grid>
            <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                onClick={handleCloseDelete}
                type="submit"
                variant="contained"
                color="primary"
                style={{ width: '100%', textAlign: 'center' }}
              >
                Hayır
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Container>
  );
}

UserPage.propTypes = {
  firmList: PropTypes.shape({
    firmList: PropTypes.array.isRequired,
    firmListCount: PropTypes.number.isRequired,
    loading: PropTypes.bool.isRequired,
  }).isRequired,
  firmListCount: PropTypes.func.isRequired,
  firmListApi: PropTypes.func.isRequired,
  firmAddApi: PropTypes.func.isRequired,
  firmUpdateApi: PropTypes.func.isRequired,
  firmDeleteApi: PropTypes.func.isRequired,
  firmSearchApi: PropTypes.func.isRequired,
  firmLogoUpload: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  firmList: {
    firmList: state.firmList.firmList,
    firmListCount: state.firmList.firmListCount,
    loading: state.firmList.loading,
  },
  firmListCount: state.firmListCount,
});

export default connect(mapStateToProps, { firmListCount, firmAddApi, firmUpdateApi, firmDeleteApi, firmSearchApi, firmLogoUpload })(UserPage);