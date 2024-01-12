import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import Container from '@mui/material/Container';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
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
  const [selectedRow, setSelectedRow] = useState(null);
  const [filterName, setFilterName] = useState('');
  const [naceCodeId, naceCodeIdGuncelle] = useState('');
  const [firmaListesiTablo, firmaListesiTabloGuncelle] = useState([]);
  const [isSelected, setIsSelected] = useState('');

  const [passengersList, setPassengersList] = useState([]);
  const [passengersCount, setPassengersCount] = useState(0);
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 5,
    filterName: ''
  });
  
  useEffect(() => {
    const getData = async () => {
      const url = `${import.meta.env.VITE_API_URL}/nace_codes?per_page=${controller.rowsPerPage}&page=${controller.page+1}&search=${controller.filterName}`
      try {
        const response = await fetch(url);
        if (response.statusText === 'OK') {
          const data = await response.json();
          console.log(data);
          setPassengersList(data.original.data);
          setPassengersCount(data.original.total);
        } else {
          throw new Error('Request failed')
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [controller, controller.filterName]);

  const handlePageChange = (event, newPage) => {
    setPassengersList([]);
    setController({
      ...controller,
      page: newPage
    });
  };

  const handleChangeRowsPerPageNace = (event) => {
    setPassengersList([]);
    setController({
      ...controller,
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0
    });
  };

  const handleChangeSearch= (event) => {
    setPassengersList([]);
    setController({
      ...controller,
      filterName: event.target.value,
      page: 0
    });
  };

  const [openNaceModal, setOpenNaceModal] = useState(false);
  const handleOpenNaceModal = () => setOpenNaceModal(true);
  const handleCloseNaceModal = () => setOpenNaceModal(false);

  const [adres, setAdres] = useState('');

  const handleAdresChange = (event) => {
    setAdres(event.target.value);
  };

  const [firmaListesi, firmaListesiGuncelle] = useState([]);
  const [ilListesi, ilListesiGuncelle] = useState([]);
  const [ilceListesi, ilceListesiGuncelle] = useState([]);

  const [textInput1Edit, setTextInput1Edit] = useState('');
  const [textInput2Edit, setTextInput2Edit] = useState('');

  const [textInput1, setTextInput1] = useState('');
  const [textInput2, setTextInput2] = useState('');
  const [selectValue1, setSelectValue1] = useState('');
  const [selectValue2, setSelectValue2] = useState('');

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

  const handleSelectChange2 = (event) => {
    setSelectValue2(event.target.value);
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


  const [orderNace, setOrderNace] = useState('asc');

  const [orderByNace, setOrderByNace] = useState('title');


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
  console.log(textInput1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/get_main_companies`);
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
        const response = await fetch(`${import.meta.env.VITE_API_URL}/provinces`);
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const jsonData = await response.json();
        ilListesiGuncelle(jsonData);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    ilListesi.forEach(element => {
      if(element.id === selectValue1) {
        ilceListesiGuncelle(element.district)
      }
    });
  }, [selectValue1, ilListesi]);
  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/companies?parent_company_id=${filterName}`);
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const jsonData = await response.json();
        firmaListesiTabloGuncelle(jsonData.original.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [filterName]);
  
  const handleLocationAdd = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/companies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          company_title: textInput1, // Assuming textInput1 holds the full company name
          short_name: "null",
          parent_company_id: filterName,
          nace_code_id: naceCodeId,
          firm_sgk: textInput2,
          province_id: selectValue1,
          district_id: selectValue2,
          firm_adres: "adres"
          // Add other necessary fields as needed
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add company');
      }
      
      handleClose(); // Close the modal after adding the company
    } catch (error) {
      console.error('Error adding company:', error);
      // Handle error, show a message, etc.
    }
  };
console.log(adres, naceCodeId)
  const handleLocationUpdate = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/companies/${selectedRow}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          company_title: textInput1Edit, // Yeni firma tam ünvanı
          firm_sgk: textInput2Edit, // Yeni firma tam ünvanı
          nace_code_id: naceCodeId, // Yeni firma tam ünvanı
          // Diğer gerekli alanları buraya ekleyin
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update company');
      }
      
      handleCloseEdit(); // Güncelleme işleminden sonra modalı kapatın
    } catch (error) {
      console.error('Error updating company:', error);
      // Hata yönetimi yapabilir, bir mesaj gösterebilirsiniz
    }
  };
  
  const handleLocationDelete = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/companies/${filterName}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete company');
      }
  
      handleCloseDelete(); // Close the modal after successful deletion
      // Potentially, you might want to update the list of companies after deletion
      // You could refetch the data or remove the deleted item from the local state
    } catch (error) {
      console.error('Error deleting company:', error);
      // Handle error, show a message, etc.
    }
  };


  console.log(naceCodeId);

  const dataFilteredNace = applyFilterNace({
    inputData: passengersList,
    comparator: getComparatorNace(orderNace, orderByNace),
    filterName: controller.filterName,
  });
  
  const notFoundNace = !dataFilteredNace.length && !!controller.filterName;

  const dataFiltered = applyFilter({
    inputData: typeof(filterName) === 'string' ? [] : firmaListesiTablo,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  const handleRowClick = (nace_code, hazard_class, id) => {
    setIsSelected(`${nace_code} - ${hazard_class}`);
    setOpenNaceModal(false);
    naceCodeIdGuncelle(id);
    console.log(hazard_class);
  };


  const rowStyles = {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#F4F6F8', // Change the color to your desired hover color
    },
  };

  const hazardColors = {
    Tehlikeli: "orange",
    'Az Tehlikeli': "green",
    default: "red"
  };

  return (
    <Container>
      
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Lokasyonlar</Typography>

      </Stack>
      
      <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  <div style={{ flex: '1' }}>
    <UserTableToolbar
      filterName={filterName}
      onFilterName={handleFilterByName}
      firmaListesi={firmaListesi}
    />
  </div>

  <div style={{ marginLeft: 'auto', marginRight: '20px' }}>
    <Button
      disabled={filterName === ''}
      onClick={handleOpen}
      variant="contained"
      color="inherit"
      startIcon={<Iconify icon="eva:plus-fill" />}
    >
      Lokasyon Ekle
    </Button>
  </div>
</div>

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
                      id={row.id}
                      setSelectedRow={setSelectedRow}
                      passengersList={passengersList}
                      handleOpenEdit={handleOpenEdit}
                      handleOpenDelete={handleOpenDelete}
                      naceCodeId={naceCodeId}
                      filterName={filterName}
                      firmaListesi={firmaListesiTablo}
                      firm_sgk={row.firm_sgk}
                      company_title={row.company_title}
                      hazard_class={row.hazard_class}
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
                  {
                    ilListesi.map(i => (
                      <MenuItem value={i.id}>{i.title}</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>İlçe Seçiniz</InputLabel>
                <Select
                  value={selectValue2}
                  label="Firma Tipi"
                  onChange={handleSelectChange2}
                  variant="outlined"
                >
                  {
                    ilceListesi.map(i => (
                      <MenuItem value={i.id}>{i.name}</MenuItem>
                    ))
                  }
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
                multiline
                rows={3}
              />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button onClick={handleLocationAdd} type="submit" variant="contained" color="primary">
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
            <Button
  variant="contained"
  onClick={handleOpenNaceModal}
>
  Nace Kodu Seç
</Button>
<span style={{ marginLeft: 10 }}>{isSelected}</span>
</Grid>
            <Grid item xs={12}>
              <Button onClick={handleLocationUpdate} type="submit" variant="contained" color="primary">
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
          onClick={handleLocationDelete}
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
          filterName={controller.filterName}
          onFilterName={handleChangeSearch}
        />

        <Scrollbar>
        <div style={{ maxHeight: '400px', overflowY: 'scroll' }}>
          <TableContainer sx={{ overflow: 'unset' }}>
          {passengersList.length === 0 && (
                  <LinearProgress />
                )}
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={passengersCount}
                onRequestSort={handleSortNace}
                headLabel={[
                  { id: 'nace-kodu', label: 'Nace Kodu' },
                  { id: 'faaliyet', label: 'Faaliyet' },
                  { id: 'tehlike-sinifi', label: 'Tehlike Sınıfı' },
                ]}
              />
              <TableBody>
              {
                passengersList.map((passenger, key) => (
                  <TableRow 
                    hover 
                    tabIndex={-1} 
                    role="checkbox" 
                    selected={isSelected} 
                    onClick={() => handleRowClick(passenger.nace_code, passenger.hazard_class, passenger.id)}
                    style={rowStyles} // Change background color based on isSelected
                  >
                    <TableCell>{passenger.nace_code}</TableCell>
                    <TableCell>{passenger.business}</TableCell>
                    <TableCell>
                      <Typography variant="body2" noWrap style={{ backgroundColor: hazardColors[passenger.hazard_class] || hazardColors.default, color: '#fff', padding: 5, borderRadius: 10 }}>
                        {passenger.hazard_class}
                      </Typography>  
                    </TableCell>
                  </TableRow>
                ))
              }

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRowsNace(controller.page, controller.rowsPerPageNace, passengersCount)}
                />

                {notFoundNace && <TableNoDataNace query={controller.filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
          </div>
        </Scrollbar>

        <TablePagination
          page={controller.page}
          component="div"
          count={passengersCount}
          rowsPerPage={controller.rowsPerPage}
          onPageChange={handlePageChange}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPageNace}
        />
      </Card>


    </Container>
</Modal>

    </Container>
  );
}
