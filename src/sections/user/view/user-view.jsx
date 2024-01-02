import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import { Grid, Select, MenuItem, TextField, InputLabel, FormControl } from '@mui/material';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

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

// ----------------------------------------------------------------------


export default function UserPage() {
  const [selectedRow, setSelectedRow] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0]; // Get the uploaded file
    const reader = new FileReader();
  
    reader.onload = (e) => {
      setUploadedImage(e.target.result);
    };
  
    // Read the uploaded file as a data URL
    reader.readAsDataURL(file);
  };
  


  const [firmaListesi, firmaListesiGuncelle] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/get_main_companies');
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

  const handleCompanyAdd = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/companies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          company_title: textInput1, // Assuming textInput1 holds the full company name
          short_name: textInput2, // Assuming textInput2 holds the short company name
          firm_type_id: selectValue1, // Assuming selectValue1 holds the company type
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

  const handleCompanyUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/companies/${selectedRow}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          company_title: textInput1Edit, // Yeni firma tam ünvanı
          short_name: textInput2Edit, // Yeni firma kısa adı
          firm_type_id: selectValue1Edit, // Yeni firma tipi
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
  
  const handleCompanyDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/companies/${selectedRow}`, {
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

  console.log(firmaListesi)
  const [textInput1Edit, setTextInput1Edit] = useState('');
  const [textInput2Edit, setTextInput2Edit] = useState('');
  const [selectValue1Edit, setSelectValue1Edit] = useState('');

  const [textInput1, setTextInput1] = useState('');
  const [textInput2, setTextInput2] = useState('');
  const [selectValue1, setSelectValue1] = useState('');

  const handleTextInput1ChangeEdit = (event) => {
    setTextInput1Edit(event.target.value);
  };

  const handleTextInput2ChangeEdit = (event) => {
    setTextInput2Edit(event.target.value);
  };

  const handleSelectChange1Edit = (event) => {
    setSelectValue1Edit(event.target.value);
  };

  const handleSubmitEdit = (event) => {
    event.preventDefault();
    // Burada form verilerini istediğiniz şekilde işleyebilirsiniz
    console.log('TextInput 1:', textInput1Edit);
    console.log('TextInput 2:', textInput2Edit);
    console.log('SelectBox 1:', selectValue1Edit);
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

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);
console.log(selectedRow);
  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
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

  const dataFiltered = applyFilter({
    inputData: firmaListesi,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/companies?search=${filterName}&per_page=${rowsPerPage}&parent_company_id=0`);
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const jsonData = await response.json();
        firmaListesiGuncelle(jsonData.original.data);
        console.log(jsonData)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [filterName, rowsPerPage])

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Firma Listesi</Typography>

        <Button onClick={handleOpen} variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          Firma Ekle
        </Button>
      </Stack>

      <Card>
        <UserTableToolbar
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
        <div style={{ maxHeight: '400px', overflowY: 'scroll' }}>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={firmaListesi.length}
                onRequestSort={handleSort}
                headLabel={[
                  { id: 'company', label: 'Firma' },
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
                      company_title={row.company_title}
                      short_name={row.short_name}
                      isVerified={row.isVerified}
                      handleOpenEdit={handleOpenEdit}
                      handleOpenDelete={handleOpenDelete}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, firmaListesi.length)}
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
          count={firmaListesi.length}
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
          <Button component="label" variant="contained">
            Fotoğraf Yükle
            <VisuallyHiddenInput type="file" onChange={handleImageUpload} />
          </Button>
        </Grid>
        <Grid item xs={12}>
          {uploadedImage && (
            <img
              src={uploadedImage}
              alt="Uploaded"
              style={{ maxWidth: 100, height: 100, borderRadius: '50%' }}
            />
          )}
        </Grid>
            <Grid item xs={12}>
              <TextField
                label="Firma Tam Ünvan"
                variant="outlined"
                value={textInput1}
                onChange={handleTextInput1Change}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Firma Kısa Ad"
                variant="outlined"
                value={textInput2}
                onChange={handleTextInput2Change}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Firma Tipi</InputLabel>
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
              <Button type="submit" variant="contained" color="primary" onClick={handleCompanyAdd}>
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
                label="Firma Tam Ünvan"
                variant="outlined"
                value={textInput1Edit}
                onChange={handleTextInput1ChangeEdit}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Firma Kısa Ad"
                variant="outlined"
                value={textInput2Edit}
                onChange={handleTextInput2ChangeEdit}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Firma Tipi</InputLabel>
                <Select
                  value={selectValue1Edit}
                  label="Firma Tipi"
                  onChange={handleSelectChange1Edit}
                  variant="outlined"
                >
                  <MenuItem value="0">Tüzel</MenuItem>
                  <MenuItem value="1">Firma</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button onClick={handleCompanyUpdate} type="submit" variant="contained" color="primary">
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
          onClick={handleCompanyDelete}
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
