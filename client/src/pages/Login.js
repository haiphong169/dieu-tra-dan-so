import React, { useState } from 'react';
import { TextField, Grid, Button } from '@mui/material';
import logo from '../images/tcds_logo.jpg';
import './css/Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUserData } from '../redux/userSlice';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ username: '', password: '' });

  const handleLogin = async (event) => {
    event.preventDefault();
    setErrors({ username: '', password: '' });
    const userData = {
      username,
      password,
    };
    const res = await axios.post('/login', userData);
    if (res.data.errors) {
      setErrors(res.data.errors);
    } else {
      dispatch(getUserData(res.data));
      localStorage.setItem('username', res.data.username);
      localStorage.setItem('name', res.data.name);
      localStorage.setItem('authenticated', true);
      if (username.includes('admin')) {
        navigate('/home');
      } else if (username.length === 2) {
        navigate(`/${username}`);
      } else if (username.length === 4) {
        navigate(`/${username.substring(0, 2)}/${username.substring(2)}`);
      } else if (username.length === 6) {
        navigate(
          `/${username.substring(0, 2)}/${username.substring(
            2,
            4
          )}/${username.substring(4)}`
        );
      } else if (username.length === 8) {
        navigate(
          `/${username.substring(0, 2)}/${username.substring(
            2,
            4
          )}/${username.substring(4, 6)}/${username.substring(6)}`
        );
      }
    }
  };

  return (
    <Grid container spacing={2} className="form">
      <Grid item sm />
      <Grid item sm>
        <img src={logo} alt="Logo của Tổng cục dân số" />
        <form noValidate onSubmit={handleLogin}>
          <TextField
            name="username"
            type="text"
            label="Tên tài khoản/ Mã khu vực"
            className="TextField"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            helperText={errors.username}
            fullWidth
          />
          <TextField
            name="password"
            type="password"
            label="Mật khẩu"
            className="TextField"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            helperText={errors.password}
            fullWidth
          />
          <Button type="submit" variant="contained" className="Button">
            Đăng nhập
          </Button>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
}
