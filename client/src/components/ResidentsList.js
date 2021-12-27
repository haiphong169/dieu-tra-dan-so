import React, { useEffect, useState } from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CreateNewPersonDialog from './createNewPersonDialog';
import ResidentsDetailsDialog from './ResidentsDetailsDialog';

export default function ResidentsList(props) {
  const [list, setList] = useState(null);
  const { tinhId, quanId, phuongId, thonId } = useParams();
  const location = `${tinhId}${quanId}${phuongId}${thonId}`;
  const [open, setOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const username = localStorage.getItem('username');

  const openDialog = () => {
    setOpen(true);
  };

  const onDetailsCanceled = () => {
    setDetailsOpen(false);
  };

  const openDetails = () => {
    setDetailsOpen(true);
  };

  const handleDialogConfirmed = async (newPersonData) => {
    const newPerson = {
      ...newPersonData,
      locationId: location,
    };
    setOpen(false);
    await axios.post('/postNewPerson', newPerson);
    setList([...list, newPerson]);
  };

  const handleDialogCanceled = () => {
    setOpen(false);
  };

  useEffect(() => {
    axios
      .post('/getAllPeopleFromAThon', {
        locationId: location,
      })
      .then((res) => {
        setList(res.data);
      });
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Họ và tên</TableCell>
              <TableCell>Ngày sinh</TableCell>
              <TableCell>Giới tính</TableCell>
              <Button
                variant="contained"
                onClick={openDialog}
                disabled={username.length < 6 || username.includes('admin')}
              >
                Thêm người mới
              </Button>
            </TableRow>
          </TableHead>
          <TableBody>
            {list ? (
              list.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.birthday}</TableCell>
                  <TableCell>{item.sex}</TableCell>
                  <TableCell>
                    <Button variant="contained" onClick={openDetails}>
                      Chi tiết
                    </Button>
                  </TableCell>
                  <ResidentsDetailsDialog
                    open={detailsOpen}
                    cancel={onDetailsCanceled}
                    details={item}
                  ></ResidentsDetailsDialog>
                </TableRow>
              ))
            ) : (
              <p>Loading...</p>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <CreateNewPersonDialog
        open={open}
        confirm={handleDialogConfirmed}
        cancel={handleDialogCanceled}
      />
    </>
  );
}
