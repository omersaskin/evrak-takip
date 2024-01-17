import Swal from 'sweetalert2';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import debounce from 'lodash.debounce';
import { useMemo, useState, useEffect, useCallback } from 'react';

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
import LoadingButton from '@mui/lab/LoadingButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import LinearProgress from '@mui/material/LinearProgress';
import InputAdornment from '@mui/material/InputAdornment';
import { Grid, Select, MenuItem, TextField, InputLabel, FormControl } from '@mui/material';

import Iconify from 'src/components/iconify';

import Table from './Table';
import { firmAddApi, firmListCount, firmUpdateApi, firmDeleteApi, firmSearchApi, firmLogoUpload, firmLogoListApi } from '../../../actions/firmActions';

const style = {
  width: '90%', maxWidth: 1000, mx: 'auto', p: 2,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 1, // Add this line to set the border-radius
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

function UserPage({ firmList, firmLogoListApi: firmLogoListApiAs, firmListCount: firmListCountAs, firmListApi: firmListApiAs, firmAddApi: firmAddApiAs, firmUpdateApi: firmUpdateApiAs, firmDeleteApi: firmDeleteApiAs, firmSearchApi: firmSearchApiAs, firmLogoUpload: firmLogoUploadAs }) {
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 5,
    search: ''
  });
  const [loading, setLoading] = useState('');
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
    try {
      setLoading(true);
  
      event.preventDefault();

      await firmAddApiAs(firmName, firmShortName, firmType);

      await firmSearchApiAs(controller.search, controller.rowsPerPage, controller.page);

      firmNameUpdate('');
      firmShortNameUpdate('');
      firmTypeUpdate('');

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  

  const handleFirmUpdate = async (event) => {
    try {
      setLoading(true);
  
      setOpenMenu(null);

      event.preventDefault();

      await firmUpdateApiAs(firmNameEdit, firmShortNameEdit, firmTypeEdit, selectedRow);

      await firmSearchApiAs(controller.search, controller.rowsPerPage);

      firmNameUpdateEdit('');
      firmShortNameUpdateEdit('');
      firmTypeUpdateEdit('');

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleFirmDelete = async (event) => {
    try {
      setLoading(true);
  
      setOpenMenu(null);

      event.preventDefault();

      await firmDeleteApiAs(selectedRow);

      await firmSearchApiAs(controller.search, controller.rowsPerPage);

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(open === true && firmList.loading === true) {
      handleClose();

      Swal.fire({
        title: 'Başarılı!',
        text: 'Firma ekleme işlemi başarıyla gerçekleşti.',
        icon: 'success',
        confirmButtonColor: "#000",
        confirmButtonText: 'Tamam'
      });
    } else if(openEdit === true && firmList.loading === true) {

      handleCloseEdit();

      Swal.fire({
        title: 'Başarılı!',
        text: 'Firma düzenleme işlemi başarıyla gerçekleşti.',
        icon: 'success',
        confirmButtonColor: "#000",
        confirmButtonText: 'Tamam'
      });
    } else if(openDelete === true && firmList.loading === true) {
      handleCloseDelete();

      Swal.fire({
        title: 'Başarılı!',
        text: 'Firma silme işlemi başarıyla gerçekleşti.',
        icon: 'success',
        confirmButtonColor: "#000",
        confirmButtonText: 'Tamam'
      });
    }

    if(open === false) {
      firmNameUpdate('');
      firmShortNameUpdate('');
      firmTypeUpdate('');
    } else if(openEdit === false) {
      firmNameUpdateEdit('');
      firmShortNameUpdateEdit('');
      firmTypeUpdateEdit('');
    } 
  }, [firmList.loading, open, openEdit, openDelete])

  const handleLogoAdd = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      photoUpdate(e.target.result);
    };

    reader.readAsDataURL(file);

    await firmLogoUploadAs(file);
  };

  const handleLogoUpdate = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      photoUpdate(e.target.result);
    };

    reader.readAsDataURL(file);

    await firmLogoUploadAs(file);
  };

  useEffect(() => {
    firmSearchApiAs(controller.search, controller.rowsPerPage, controller.page);
    firmListCountAs();
    firmLogoListApiAs();
  }, [controller.search, controller, controller.rowsPerPage, firmSearchApiAs, firmListCountAs, firmLogoListApiAs]);

  console.log(firmList.loading)

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
    },
    {
      name: 'İşlem',
      selector: row => (
        <>
          <div style={{ flex: 1 }}>{/* Empty div for pushing the icon to the right */}</div>
          <IconButton onClick={(event) => handleOpenMenu(event, row.id, row.company_title, row.short_name, row.firm_type_id)}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </>
      ),
      right: true, // You can add this property to align the content to the right
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

  const handleChangeSearch = useCallback((event) => {
    setController({
      ...controller,
      search: event.target.value,
      page: 0,
    });
  }, [controller]);

  const debouncedResults = useMemo(() => debounce(handleChangeSearch, 300), [handleChangeSearch]);

  useEffect(() => () => debouncedResults.cancel(), [debouncedResults]);

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Firma Listesi</Typography>


      </Stack>

      <Card>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 20 }}>
          <div style={{ flex: '1' }}>
            <OutlinedInput
              onChange={debouncedResults}
              placeholder="Firma ara..."
              sx={{ width: '100%' }}
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
        <Table handleChangeRowsPerPage={handleChangeRowsPerPage} handleChangePage={handleChangePage} page={controller.page} rowsPerPage={controller.rowsPerPage} count={firmList.firmListCount} columns={columns} firmList={firmList.firmList} />

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
              {/* Left column for photo */}
              <Grid item xs={12} md={3} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>


                {!photo && (
                  <LoadingButton
                    loading={loading}
                    component="label"
                    variant="contained"
                  >
                    Fotoğraf Yükle
                    <VisuallyHiddenInput type="file" onChange={handleLogoAdd} />
                  </LoadingButton>
                )}
                {photo && (
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <img
                      src={photo}
                      alt="Uploaded"
                      style={{ width: 150, height: 150, borderRadius: '50%' }}
                    />
                    <LoadingButton loading={loading} component="label" variant="contained" style={{ marginTop: 25 }}>
                      Fotoğraf Değiştir
                      <VisuallyHiddenInput type="file" onChange={handleLogoUpdate} />
                    </LoadingButton>
                  </div>
                )}

              </Grid>

              {/* Right column for the form */}
              <Grid item xs={12} md={9}>
                
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2} mt={2}>
                    <Typography variant="h4" >Firma Ekle</Typography>
                  </Stack>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="Firma Tam Ünvan"
                      variant="outlined"
                      value={firmName}
                      onChange={handleFirmName}
                      fullWidth
                      required
                      inputProps={{ maxLength: 100 }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Firma Kısa Ad"
                      variant="outlined"
                      value={firmShortName}
                      onChange={handleFirmShortName}
                      fullWidth
                      required
                      inputProps={{ maxLength: 100 }}
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
                    <LoadingButton loading={loading} type="submit" variant="contained" color="primary">
                      Kaydet
                    </LoadingButton>
                  </Grid>
                </Grid>
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
          <Grid container spacing={2}>
            {/* md={3} - Firma Düzenle text */}
            <Grid item xs={12} md={3} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {!photo && (
                <LoadingButton
                  loading={loading}
                  component="label"
                  variant="contained"
                >
                  Fotoğraf Yükle
                  <VisuallyHiddenInput type="file" onChange={handleLogoAdd} />
                </LoadingButton>
              )}
              {photo && (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <img
                    src={photo}
                    alt="Uploaded"
                    style={{ width: 150, height: 150, borderRadius: '50%' }}
                  />
                  <LoadingButton loading={loading} component="label" variant="contained" style={{ marginTop: 25 }}>
                    Fotoğraf Değiştir
                    <VisuallyHiddenInput type="file" onChange={handleLogoAdd} />
                  </LoadingButton>
                </div>
              )}
            </Grid>

            {/* md={9} - Form and input fields */}
            <Grid item xs={12} md={9}>
              
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2} mt={2}>
                    <Typography variant="h4">Firma Düzenle</Typography>
                  </Stack>
              <form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="Firma Tam Ünvan"
                      variant="outlined"
                      value={firmNameEdit}
                      onChange={handleFirmNameEdit}
                      fullWidth
                      required
                      inputProps={{ maxLength: 100 }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Firma Kısa Ad"
                      variant="outlined"
                      value={firmShortNameEdit}
                      onChange={handleFirmShortNameEdit}
                      fullWidth
                      required
                      inputProps={{ maxLength: 100 }}
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
                    <LoadingButton loading={loading} onClick={handleFirmUpdate} type="submit" variant="contained" color="primary">
                      Kaydet
                    </LoadingButton>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>

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
              <LoadingButton
                loading={loading}
                variant="contained"
                color="primary"
                style={{ width: '100%', textAlign: 'center' }}
                onClick={handleFirmDelete}
              >
                Evet
              </LoadingButton>
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
    firmLogoList: PropTypes.array.isRequired,
    firmListCount: PropTypes.number.isRequired,
    loading: PropTypes.bool.isRequired,
  }).isRequired,
  firmListCount: PropTypes.func.isRequired,
  firmListApi: PropTypes.func.isRequired,
  firmLogoListApi: PropTypes.func.isRequired,
  firmAddApi: PropTypes.func.isRequired,
  firmUpdateApi: PropTypes.func.isRequired,
  firmDeleteApi: PropTypes.func.isRequired,
  firmSearchApi: PropTypes.func.isRequired,
  firmLogoUpload: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  firmList: {
    firmList: state.firmList.firmList,
    firmLogoList: state.firmList.firmLogoList,
    firmListCount: state.firmList.firmListCount,
    loading: state.firmList.loading,
  },
  firmListCount: state.firmListCount,
});

export default connect(mapStateToProps, { firmLogoListApi, firmListCount, firmAddApi, firmUpdateApi, firmDeleteApi, firmSearchApi, firmLogoUpload })(UserPage);