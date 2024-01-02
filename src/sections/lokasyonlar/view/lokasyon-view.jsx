import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import { Grid, Select, MenuItem, TextField, InputLabel, FormControl } from '@mui/material';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import TableNoDataNace from '../table-no-data-nace';
import UserTableToolbar from '../user-table-toolbar';
import UserTableRowNace from '../user-table-row-nace';
import UserTableHeadNace from '../user-table-head-nace';
import TableEmptyRowsNace from '../table-empty-rows-nace';
import UserTableToolbarNace from '../user-table-toolbar-nace';
import { emptyRows, applyFilter, getComparator } from '../utils';
import { emptyRowsNace, applyFilterNace, getComparatorNace } from '../utils-nace';

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

// ----------------------------------------------------------------------


export default function UserPage() {
  const [filterName, setFilterName] = useState('');
  const [firmaListesiNace, firmaListesiGuncelleNace] = useState([]);
  const [firmaListesiTablo, firmaListesiTabloGuncelle] = useState([]);
  const [isSelected, setIsSelected] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/nace_codes');
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const jsonData = await response.json();
        firmaListesiGuncelleNace(jsonData.original.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const [openNaceModal, setOpenNaceModal] = useState(false);
  const handleOpenNaceModal = () => setOpenNaceModal(true);
  const handleCloseNaceModal = () => setOpenNaceModal(false);

  const [adres, setAdres] = useState('');

  const handleAdresChange = (event) => {
    setAdres(event.target.value);
  };

  const [firmaListesi, firmaListesiGuncelle] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/get_main_companies`);
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const jsonData = await response.json();
        firmaListesiGuncelle(jsonData.original);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/get_main_companies?parent_company_id=${filterName}`);
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const jsonData = await response.json();
        firmaListesiTabloGuncelle(jsonData.original);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [filterName]);

  const [textInput1Edit, setTextInput1Edit] = useState('');
  const [textInput2Edit, setTextInput2Edit] = useState('');

  const [textInput1, setTextInput1] = useState('');
  const [textInput2, setTextInput2] = useState('');
  const [selectValue1, setSelectValue1] = useState('');

  const handleTextInput1ChangeEdit = (event) => {
    setTextInput1Edit(event.target.value);
  };

  const handleTextInput2ChangeEdit = (event) => {
    setTextInput2Edit(event.target.value);
  };

  const handleSubmitEdit = (event) => {
    event.preventDefault();
    // Burada form verilerini istediğiniz şekilde işleyebilirsiniz
    console.log('TextInput 1:', textInput1Edit);
    console.log('TextInput 2:', textInput2Edit);
  };

  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  const handleTextInput1Change = (event) => {
    setTextInput1(event.target.value);
  };

  const handleTextInput2Change = (event) => {
    setTextInput2(event.target.value);
  };

  const handleSelectChange1 = (event) => {
    setSelectValue1(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Burada form verilerini istediğiniz şekilde işleyebilirsiniz
    console.log('TextInput 1:', textInput1);
    console.log('TextInput 2:', textInput2);
    console.log('SelectBox 1:', selectValue1);
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');


  const [orderBy, setOrderBy] = useState('title');

  

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const [pageNace, setPageNace] = useState(0);

  const [orderNace, setOrderNace] = useState('asc');

  const [orderByNace, setOrderByNace] = useState('title');

  const [filterNameNace, setFilterNameNace] = useState('');

  const [rowsPerPageNace, setRowsPerPageNace] = useState(5);

  const handleSortNace = (event, id) => {
    const isAsc = orderByNace === id && orderNace === 'asc';
    if (id !== '') {
      setOrderNace(isAsc ? 'desc' : 'asc');
      setOrderByNace(id);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleChangePageNace = (event, newPage) => {
    setPageNace(newPage);
  };

  const handleChangeRowsPerPageNace = (event) => {
    setPageNace(0);
    setRowsPerPageNace(parseInt(event.target.value, 10));
  };

  const handleFilterByNameNace = (event) => {
    setPageNace(0);
    setFilterNameNace(event.target.value);
  };

  const dataFilteredNace = applyFilterNace({
    inputData: firmaListesiNace,
    comparator: getComparatorNace(orderNace, orderByNace),
    filterName: filterNameNace,
  });
  
  const notFoundNace = !dataFilteredNace.length && !!filterNameNace;

  const dataFiltered = applyFilter({
    inputData: typeof(filterName) === 'string' ? [] : firmaListesiTablo,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Lokasyonlar</Typography>

        <Button onClick={handleOpen} disabled={filterName === ''} variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          Lokasyon Ekle
        </Button>
      </Stack>

      <Card>
        <UserTableToolbar
          filterName={filterName}
          onFilterName={handleFilterByName}
          firmaListesi={firmaListesi}
        />

        <Scrollbar>
        <div style={{ maxHeight: '400px', overflowY: 'scroll' }}>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={firmaListesiTablo.length}
                onRequestSort={handleSort}
                headLabel={[
                  { id: 'lokasyon-adi', label: 'Lokasyon Adı' },
                  { id: 'sgk-numarasi', label: 'SGK Numrası' },
                  { id: 'nace-kodu', label: 'Nace Kodu' },
                  { id: 'tehlike-sinifi', label: 'Tehlike Sınıfı' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <UserTableRow
                      key={row.id}
                      handleOpenEdit={handleOpenEdit}
                      handleOpenDelete={handleOpenDelete}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, firmaListesiTablo.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
          </div>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={firmaListesiTablo.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      <Box sx={style}>
      <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Lokasyon Adı"
                variant="outlined"
                value={textInput1}
                onChange={handleTextInput1Change}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="SGK Numarası"
                variant="outlined"
                value={textInput2}
                onChange={handleTextInput2Change}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
            <Button
  variant="contained"
  onClick={handleOpenNaceModal}
>
  Nace Kodu Seç
</Button>
<span style={{ marginLeft: 10 }}>{isSelected}</span>
</Grid>

            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>İl Seçiniz</InputLabel>
                <Select
                  value={selectValue1}
                  label="Firma Tipi"
                  onChange={handleSelectChange1}
                  variant="outlined"
                >
                  <MenuItem value="0">Tüzel</MenuItem>
                  <MenuItem value="1">Firma</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>İlçe Seçiniz</InputLabel>
                <Select
                  value={selectValue1}
                  label="Firma Tipi"
                  onChange={handleSelectChange1}
                  variant="outlined"
                >
                  <MenuItem value="0">Tüzel</MenuItem>
                  <MenuItem value="1">Firma</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                label="Adres"
                variant="outlined"
                value={adres}
                onChange={handleAdresChange}
                fullWidth
                margin="normal"
              />
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
      <form onSubmit={handleSubmitEdit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Lokasyon Adı"
                variant="outlined"
                value={textInput1Edit}
                onChange={handleTextInput1ChangeEdit}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="SGK Numarası"
                variant="outlined"
                value={textInput2Edit}
                onChange={handleTextInput2ChangeEdit}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <OutlinedInput
                value={filterName}
                onChange={handleFilterByNameNace}
                placeholder="Nace Kodu ara..."
                startAdornment={
                  <InputAdornment position="start">
                    <Iconify
                      icon="eva:search-fill"
                      sx={{ color: 'text.disabled', width: 20, height: 20 }}
                    />
                  </InputAdornment>
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Tehlike Sınıfı"
                variant="outlined"
                value={textInput2Edit}
                onChange={handleTextInput2ChangeEdit}
                fullWidth
              />
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
          type="submit"
          variant="contained"
          color="primary"
          style={{ width: '100%', textAlign: 'center' }}
        >
          Evet
        </Button>
      </Grid>
      <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
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
<Modal
  open={openNaceModal}
  onClose={handleCloseNaceModal}
  aria-labelledby="nace-modal-title"
  aria-describedby="nace-modal-description"
  style={{ marginTop: 100 }}
>
<Container>


      <Card>
      <UserTableToolbarNace
          filterName={filterNameNace}
          onFilterName={handleFilterByNameNace}
          firmaListesi={firmaListesiNace}
        />

        <Scrollbar>
        <div style={{ maxHeight: '400px', overflowY: 'scroll' }}>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHeadNace
                order={order}
                orderBy={orderBy}
                rowCount={firmaListesiNace.length}
                onRequestSort={handleSortNace}
                headLabel={[
                  { id: 'nace-kodu', label: 'Nace Kodu' },
                  { id: 'faaliyet', label: 'Faaliyet' },
                  { id: 'tehlike-sinifi', label: 'Tehlike Sınıfı' },
                ]}
              />
              <TableBody>
                {dataFilteredNace
                  .slice(pageNace * rowsPerPageNace, pageNace * rowsPerPageNace + rowsPerPageNace)
                  .map((row) => (
                    <UserTableRowNace
                      key={row.id}
                      isSelected={isSelected}
                      setIsSelected={setIsSelected}
                      nace_code={row.nace_code}
                      business={row.business}
                      hazard_class={row.hazard_class}
                      isVerified={row.isVerified}
                      handleOpenEdit={handleOpenEdit}
                      handleOpenDelete={handleOpenDelete}
                      setOpenNaceModal={setOpenNaceModal}
                    />
                  ))}

                <TableEmptyRowsNace
                  height={77}
                  emptyRows={emptyRowsNace(pageNace, rowsPerPageNace, firmaListesiNace.length)}
                />

                {notFoundNace && <TableNoDataNace query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        </Scrollbar>

        <TablePagination
          page={pageNace}
          component="div"
          count={firmaListesiNace.length}
          rowsPerPage={rowsPerPageNace}
          onPageChange={handleChangePageNace}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPageNace}
        />
      </Card>


    </Container>
</Modal>

    </Container>
  );
}
