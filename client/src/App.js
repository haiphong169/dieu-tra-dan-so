import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import User from './pages/User';
import axios from 'axios';

function App() {
  axios.defaults.baseURL = 'http://localhost:3001';

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={<Home locationType="Tỉnh/Thành phố" />}
          />
          <Route path="/user/:username" element={<User />} />
          <Route path="/:tinhId" element={<Home locationType="Quận/Huyện" />} />
          <Route
            path="/:tinhId/:quanId"
            element={<Home locationType="Phường/Xã" />}
          />
          <Route
            path="/:tinhId/:quanId/:phuongId"
            element={<Home locationType="Thôn/Bản/Tổ dân phố" />}
          />
          <Route path="/:tinhId/:quanId/:phuongId/:thonId" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
