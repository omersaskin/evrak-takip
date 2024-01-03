import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import { Grid, Select, MenuItem, TextField, InputLabel, FormControl } from '@mui/material';

import Scrollbar from 'src/components/scrollbar';

import './styles.css';
import TableNoData from '../table-no-data';
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
  const [passengersList, setPassengersList] = useState([]);
  const [passengersCount, setPassengersCount] = useState(0);
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 5,
    filterName: ''
  });
  

  useEffect(() => {
    const getData = async () => {
      const url = `http://localhost:8000/api/nace_codes?per_page=${controller.rowsPerPage}&page=${controller.page+1}&search=${controller.filterName}`
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

  


  const [textInput1, setTextInput1] = useState('');
  const [textInput2, setTextInput2] = useState('');
  const [selectValue1, setSelectValue1] = useState('');
  const [selectValue2, setSelectValue2] = useState('');








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
    console.log('SelectBox 2:', selectValue2);
  };

  const [open, setOpen] = useState(false);
  
  const handleClose = () => setOpen(false);




  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('title');

  
  

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = passengersList.map((n) => n.title);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };



  

  

  

  const dataFiltered = applyFilter({
    inputData: passengersList,
    comparator: getComparator(order, orderBy),
    filterName: controller.filterName,
  });

  const notFound = !dataFiltered.length && !!controller.filterName;
  
  const handlePageChange = (event, newPage) => {
    setPassengersList([]);
    setController({
      ...controller,
      page: newPage
    });
  };

  const handleChangeRowsPerPage = (event) => {
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

  console.log(controller.filterName)

  return (
    <Container>

<Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Nace Kodları</Typography>

      
      </Stack>

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
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
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'nace-kodu', label: 'Nace Kodu' },
                  { id: 'faaliyet', label: 'Faaliyet' },
                  { id: 'tehlike-sinifi', label: 'Tehlike Sınıfı' },
                ]}
              />
              
              <TableBody>
              {
                passengersList.map((passenger) => (
                  <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>

                <TableCell>{passenger.nace_code}</TableCell>
                <TableCell>{passenger.business}</TableCell>
                <TableCell>
                  <Typography variant="body2" noWrap style={{ backgroundColor: 'orange', color: '#fff', padding: 5, borderRadius: 10 }}>
                    {passenger.hazard_class}
                  </Typography>  
                </TableCell>

              </TableRow>
                ))
              }

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(controller.page, controller.rowsPerPage, passengersCount)}
                />

                {notFound && <TableNoData query={controller.filterName} />}
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
              <FormControl fullWidth>
                <InputLabel>Müşteri Seçiniz</InputLabel>
                <Select
                  value={selectValue2}
                  label="Müşteri Seçiniz"
                  onChange={handleSelectChange2}
                  variant="outlined"
                >
                  {passengersList.map(item => (
                    <MenuItem value={item.title}>{item.title}</MenuItem>
                  ))}
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

  
    </Container>
  );
}
