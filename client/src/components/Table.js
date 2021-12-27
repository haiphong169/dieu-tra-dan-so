import React, { useState, useEffect } from 'react';
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
import CreateNewAreaDialog from './createNewAreaDialog';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setTinh, setQuan, setPhuong, setThon } from '../redux/areaSlice';

export default function DataTable(props) {
  const { tinhId, quanId, phuongId } = useParams();
  const [open, setOpen] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const [newLocationName, setNewLocationName] = useState('');
  const [newLocationId, setNewLocationId] = useState('');
  const dispatch = useDispatch();
  const { tinh, quan, phuong, thon } = useSelector((state) => state.area);
  const { username } = useSelector((state) => state.user);
  let url = '';

  const openNewAreaDialog = () => {
    setOpen(true);
  };

  const handleDialogConfirmed = (locationName, locationId) => {
    setOpen(false);
    setNewLocationName(locationName);
    setNewLocationId(locationId);
  };

  const cancelCreateNewArea = () => {
    setOpen(false);
  };

  const setUpAccount = (id) => {
    let _tinhId, _quanId, _phuongId;
    if (!tinhId) {
      _tinhId = '';
    } else {
      _tinhId = tinhId;
    }
    if (!quanId) {
      _quanId = '';
    } else {
      _quanId = quanId;
    }
    if (!phuongId) {
      _phuongId = '';
    } else {
      _phuongId = phuongId;
    }
    const locId = `${_tinhId}${_quanId}${_phuongId}${id}`;
    const newAccount = {
      username: locId,
      name: locId,
      password: '123456',
    };

    axios.post('/createAccount', newAccount);
    props.onChange();
  };

  const setAuthorization = () => {
    if (tinhId) {
      console.log('tinh');
      url = url.concat(tinhId);
      if (quanId) {
        console.log('quan');
        url = url.concat(quanId);
        if (phuongId) {
          url = url.concat(phuongId);
        }
      }
    } else {
      url = 'admin';
    }
    setAuthorized(localStorage.getItem('username') === url || url === 'admin');
  };

  useEffect(() => {
    setAuthorization();
    if (newLocationId !== '' && newLocationName !== '') {
      createNewArea();
    }
  }, [newLocationName, newLocationId]);

  const createNewArea = async () => {
    let newArea = {
      name: newLocationName,
      id: newLocationId,
      population: 0,
    };
    if (tinhId) {
      newArea = {
        ...newArea,
        tinhId: tinhId,
      };
      if (quanId) {
        newArea = {
          ...newArea,
          quanId: quanId,
        };
        if (phuongId) {
          newArea = {
            ...newArea,
            phuongId: phuongId,
          };
          const res = await axios.post('/postNewArea/thon', newArea);
          dispatch(setThon([...thon, res.data]));
        } else {
          const res = await axios.post('/postNewArea/phuong', newArea);
          dispatch(setPhuong([...phuong, res.data]));
        }
      } else {
        const res = await axios.post('/postNewArea/quan', newArea);
        dispatch(setQuan([...quan, res.data]));
      }
    } else {
      const res = await axios.post('/postNewArea/tinh', newArea);
      dispatch(setTinh([...tinh, res.data]));
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{props.locationType}</TableCell>
              <TableCell>{`Mã ${props.locationType}`}</TableCell>
              <TableCell>Dân số&nbsp;(người)</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  onClick={openNewAreaDialog}
                  disabled={!authorized}
                >{`Tạo ${props.locationType} mới`}</Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.dataList &&
              props.dataList.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.population}</TableCell>
                  {item.hasAccount ? (
                    <Button variant="contained">Chi tiết</Button>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={() => setUpAccount(item.id)}
                      disabled={!authorized}
                    >
                      Cấp tài khoản
                    </Button>
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CreateNewAreaDialog
        open={open}
        confirm={handleDialogConfirmed}
        cancel={cancelCreateNewArea}
        locationType={props.locationType}
      />
    </>
  );
}
