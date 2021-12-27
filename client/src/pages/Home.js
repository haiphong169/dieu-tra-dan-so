import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import DataTable from '../components/Table';
import SearchDropdowns from '../components/SearchDropdowns';
import ResidentsList from '../components/ResidentsList';
import axios from 'axios';
import { setTinh, setQuan, setPhuong, setThon } from '../redux/areaSlice';
import { Button } from '@mui/material';
import './css/Home.css';

export default function Home(props) {
  const { tinhId, quanId, phuongId, thonId } = useParams();
  const { tinh, quan, phuong, thon } = useSelector((state) => state.area);
  const dispatch = useDispatch();
  const username = localStorage.getItem('username');

  useEffect(async () => {
    if (tinhId) {
      dispatch(
        setTinh((await axios.post('/getTinhById', { id: tinhId })).data)
      );

      if (quanId) {
        dispatch(
          setQuan(
            (await axios.post('/getQuanById', { tinhId: tinhId, id: quanId }))
              .data
          )
        );
        if (phuongId) {
          dispatch(
            setPhuong(
              (
                await axios.post('/getPhuongById', {
                  tinhId: tinhId,
                  quanId: quanId,
                  id: phuongId,
                })
              ).data
            )
          );
          if (thonId) {
            dispatch(
              setThon(
                (
                  await axios.post('/getThonById', {
                    tinhId: tinhId,
                    quanId: quanId,
                    phuongId: phuongId,
                    id: thonId,
                  })
                ).data
              )
            );
          } else {
            dispatch(
              setThon(
                (
                  await axios.post('/getAllAreas/thon', {
                    tinhId: tinhId,
                    quanId: quanId,
                    phuongId: phuongId,
                  })
                ).data
              )
            );
          }
        } else {
          dispatch(
            setPhuong(
              (
                await axios.post('/getAllAreas/phuong', {
                  tinhId: tinhId,
                  quanId: quanId,
                })
              ).data
            )
          );
        }
      } else {
        dispatch(
          setQuan(
            (await axios.post('/getAllAreas/quan', { tinhId: tinhId })).data
          )
        );
      }
    } else {
      dispatch(setTinh((await axios.get('/getAllAreas/tinh')).data));
    }
  }, []);

  if (!localStorage.getItem('authenticated')) {
    window.location.assign('/');
    return;
  }

  const onSetUpAccountForTinh = () => {
    console.log('hihi');
    setTimeout(async () => {
      dispatch(setTinh((await axios.get('/getAllAreas/tinh')).data));
    }, 700);
  };

  const onSetUpAccountForQuan = () => {
    setTimeout(async () => {
      dispatch(
        setQuan(
          (await axios.post('/getAllAreas/quan', { tinhId: tinhId })).data
        )
      );
    }, 700);
  };

  const onSetUpAccountForPhuong = () => {
    setTimeout(async () => {
      dispatch(
        setPhuong(
          (
            await axios.post('/getAllAreas/phuong', {
              tinhId: tinhId,
              quanId: quanId,
            })
          ).data
        )
      );
    }, 700);
  };

  const onSetUpAccountForThon = () => {
    setTimeout(async () => {
      dispatch(
        setThon(
          (
            await axios.post('/getAllAreas/thon', {
              tinhId: tinhId,
              quanId: quanId,
              phuongId: phuongId,
            })
          ).data
        )
      );
    }, 700);
  };

  const logOut = () => {
    // axios.get('/logOut');
    localStorage.clear();
    window.location.assign('/');
  };

  const handleChangeAtTinh = (value) => {
    const url = `/${value}`;
    window.location.assign(url);
  };

  const handleChangeAtQuan = (value) => {
    const url = `/${tinhId}/${value}`;
    window.location.assign(url);
  };

  const handleChangeAtPhuong = (value) => {
    const url = `/${tinhId}/${quanId}/${value}`;
    window.location.assign(url);
  };

  const handleChangeAtThon = (value) => {
    const url = `/${tinhId}/${quanId}/${phuongId}/${value}`;
    window.location.assign(url);
  };

  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={2}>
          {username.includes('admin') ? (
            <h2
              onClick={() => window.location.assign('/home')}
              className="homeButton"
            >
              Home
            </h2>
          ) : (
            <h2>Home</h2>
          )}
        </Grid>
        <Grid item xs={7} />
        <Grid item xs={1}>
          Xin chào, {localStorage.getItem('name')}!
        </Grid>
        <Grid item xs={1}>
          <Button variant="contained" onClick={logOut}>
            Đăng xuất
          </Button>
        </Grid>
        <Grid item xs={1}>
          <Link to={`/user/${localStorage.getItem('username')}`}>
            Tài khoản
          </Link>
        </Grid>
        <Grid item xs={3}>
          <SearchDropdowns
            locationType="Tỉnh/Thành phố"
            list={tinh}
            onChange={handleChangeAtTinh}
            disabled={!username.includes('admin')}
          />
        </Grid>
        <Grid item xs={3}>
          <SearchDropdowns
            locationType="Quận/Huyện"
            list={quan}
            onChange={handleChangeAtQuan}
            disabled={username.length > 2 && !username.includes('admin')}
          />
        </Grid>
        <Grid item xs={3}>
          <SearchDropdowns
            locationType="Phường/Xã"
            list={phuong}
            onChange={handleChangeAtPhuong}
            disabled={username.length > 4 && !username.includes('admin')}
          />
        </Grid>
        <Grid item xs={3}>
          <SearchDropdowns
            locationType="Thôn/Bản/Tổ dân phố"
            list={thon}
            onChange={handleChangeAtThon}
            disabled={username.length > 6 && !username.includes('admin')}
          />
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={10}>
          {!thonId ? (
            <DataTable
              locationType={props.locationType}
              dataList={
                phuongId ? thon : quanId ? phuong : tinhId ? quan : tinh
              }
              onChange={
                phuongId
                  ? onSetUpAccountForThon
                  : quanId
                  ? onSetUpAccountForPhuong
                  : tinhId
                  ? onSetUpAccountForQuan
                  : onSetUpAccountForTinh
              }
            />
          ) : (
            <ResidentsList />
          )}
        </Grid>
        <Grid item xs={1} />
      </Grid>
    </div>
  );
}
