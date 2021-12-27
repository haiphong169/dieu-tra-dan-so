const EmployeeModel = require('../models/Employee');
const TinhModel = require('../models/Tinh');
const QuanModel = require('../models/Quan');
const PhuongModel = require('../models/Phuong');
const ThonModel = require('../models/Thon');
const jwt = require('jsonwebtoken');

const tokenAge = 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, 'super secret', {
    expiresIn: tokenAge,
  });
};

const handleErrors = (err) => {
  console.log(err.message, err.code);
  let error = { username: '', name: '', password: '' };

  // incorrect email
  if (err.message === 'Sai mật khẩu') {
    error.password = 'Sai mật khẩu';
  }

  // incorrect password
  if (err.message === 'Tài khoản không tồn tại') {
    error.username = 'Tài khoản không tồn tại';
  }

  // duplicate username
  if (err.code === 11000) {
    error.username = 'Tài khoản cho khu vực này đã tồn tại';
    return error;
  }

  // validation errors
  if (err.message.includes('employees validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      error[properties.path] = properties.message;
    });
  }

  return error;
};

module.exports.createAccount = async (req, res) => {
  const { username, name, password } = req.body;
  try {
    const update = { hasAccount: true };
    const user = await EmployeeModel.create({ name, username, password });
    if (username.length === 2) {
      await TinhModel.findOneAndUpdate({ id: username }, update);
    } else if (username.length === 4) {
      await QuanModel.findOneAndUpdate(
        {
          tinhId: username.substring(0, 2),
          id: username.substring(2),
        },
        update
      );
    } else if (username.length === 6) {
      await PhuongModel.findOneAndUpdate(
        {
          tinhId: username.substring(0, 2),
          quanId: username.substring(2, 4),
          id: username.substring(4),
        },
        update
      );
    } else if (username.length === 8) {
      await ThonModel.findOneAndUpdate(
        {
          tinhId: username.substring(0, 2),
          quanId: username.substring(2, 4),
          phuongid: username.substring(4, 6),
          id: username.substring(6),
        },
        update
      );
    }
    res.json({ user: user._id });
  } catch (error) {
    const errors = handleErrors(error);
    res.json({ errors });
  }
};

module.exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await EmployeeModel.login(username, password);
    const token = createToken(user._id);
    res.cookie('auth', token, { httpOnly: true, maxAge: tokenAge * 1000 });
    res.setHeader('Set-Cookie', {
      id: token,
      httpOnly: true,
      maxAge: tokenAge * 1000,
    });
    EmployeeModel.findById(user._id, (error, result) => {
      if (!error) {
        res.json(result);
      } else {
        res.json(error);
      }
    });
  } catch (error) {
    const errors = handleErrors(error);
    res.json({ errors });
  }
};

module.exports.getUserData = (req, res) => {
  console.log(req.body);
  EmployeeModel.findById(req.body.userId, (error, result) => {
    if (!error) {
      res.json(result);
    } else {
      res.json(error);
    }
  });
};

module.exports.logOut = (req, res) => {
  //res.cookie('jwt', '', { maxAge: 1 });
};

module.exports.changePassword = async (req, res) => {
  const { username, newPassword } = req.body;
  const user = await EmployeeModel.find({ username: username });
  user.password = newPassword;
  await user.save();
};
