import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import { Grid, TextField } from '@mui/material';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

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

// ----------------------------------------------------------------------


export default function UserPage() {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);

    if(newValue === 0) {
      setSelectValue1("Personel Evrakları");
    } else if(newValue === 1)
    {
      setSelectValue1("Firma Evrakları");
    } else if(newValue === 2)
    {
      setSelectValue1("Sağlık Evrakları");
    }
  };

  const [firmaListesi, firmaListesiGuncelle] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const jsonData = await response.json();
        firmaListesiGuncelle(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  const [textInput1, setTextInput1] = useState('');
  const [selectValue1, setSelectValue1] = useState('');

  const handleTextInput1Change = (event) => {
    setTextInput1(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Burada form verilerini istediğiniz şekilde işleyebilirsiniz
    console.log('TextInput 1:', textInput1);
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

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('title');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = firmaListesi.map((n) => n.title);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, title) => {
    const selectedIndex = selected.indexOf(title);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, title);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
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

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Belge Tipleri</Typography>

        
      </Stack>

      <Tabs value={currentTab} onChange={handleTabChange}>
        <Tab label="Personel Evrakları" />
        <Tab label="Firma Evrakları" />
        <Tab label="Sağlık Evrakları" />
      </Tabs>
    
      {currentTab === 0 && (
        // İlk sekmenin içeriği
        <div style={{ marginTop: 15 }}>
<Card>

<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  <div style={{ flex: '1' }}>
    <UserTableToolbar
      numSelected={selected.length}
      filterName={filterName}
      onFilterName={handleFilterByName}
    />
  </div>

  <div style={{ marginLeft: 'auto', marginRight: '20px' }}>
    <Button
     
      onClick={handleOpen}
      variant="contained"
      color="inherit"
      startIcon={<Iconify icon="eva:plus-fill" />}
    >
      Belge Ekle
    </Button>
  </div>
</div>


        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={firmaListesi.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'company', label: 'Belge Adı' },
                  { id: 'company', label: 'Belge Tipi' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <UserTableRow
                      key={row.id}
                      name={row.title}
                      role={row.role}
                      status={row.status}
                      company={row.title}
                      avatarUrl={row.avatarUrl}
                      isVerified={row.isVerified}
                      selected={selected.indexOf(row.title) !== -1}
                      handleClick={(event) => handleClick(event, row.title)}
                     
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
        </div>
      )}
      {currentTab === 1 && (
        // İkinci sekmenin içeriği
        <div style={{ marginTop: 15 }}>
<Card>
<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  <div style={{ flex: '1' }}>
    <UserTableToolbar
      numSelected={selected.length}
      filterName={filterName}
      onFilterName={handleFilterByName}
    />
  </div>

  <div style={{ marginLeft: 'auto', marginRight: '20px' }}>
    <Button
     
      onClick={handleOpen}
      variant="contained"
      color="inherit"
      startIcon={<Iconify icon="eva:plus-fill" />}
    >
      Belge Ekle
    </Button>
  </div>
</div>

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={firmaListesi.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'company', label: 'Belge Adı' },
                  { id: 'company', label: 'Belge Tipi' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <UserTableRow
                      key={row.id}
                      name={row.title}
                      role={row.role}
                      status={row.status}
                      company={row.title}
                      avatarUrl={row.avatarUrl}
                      isVerified={row.isVerified}
                      selected={selected.indexOf(row.title) !== -1}
                      handleClick={(event) => handleClick(event, row.title)}
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
        </div>
      )}
      {currentTab === 2 && (
        // Üçüncü sekmenin içeriği
        <div style={{ marginTop: 15 }}>
<Card>
<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  <div style={{ flex: '1' }}>
    <UserTableToolbar
      numSelected={selected.length}
      filterName={filterName}
      onFilterName={handleFilterByName}
    />
  </div>

  <div style={{ marginLeft: 'auto', marginRight: '20px' }}>
    <Button
     
      onClick={handleOpen}
      variant="contained"
      color="inherit"
      startIcon={<Iconify icon="eva:plus-fill" />}
    >
      Belge Ekle
    </Button>
  </div>
</div>

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={firmaListesi.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'company', label: 'Belge Adı' },
                  { id: 'company', label: 'Belge Tipi' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <UserTableRow
                      key={row.id}
                      name={row.title}
                      role={row.role}
                      status={row.status}
                      company={row.title}
                      avatarUrl={row.avatarUrl}
                      isVerified={row.isVerified}
                      selected={selected.indexOf(row.title) !== -1}
                      handleClick={(event) => handleClick(event, row.title)}
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
        </div>
      )}

      

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
                label="Belge Adı"
                variant="outlined"
                value={textInput1}
                onChange={handleTextInput1Change}
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

    </Container>
  );
}
