const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Vui lòng nhập tên nhân viên'],
  },
  username: {
    type: String,
    required: [true, 'Vui lòng nhập mã khu vực cho tên tài khoản'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Vui lòng nhập mật khẩu cho tài khoản'],
  },
});

EmployeeSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

EmployeeSchema.statics.login = async function (username, password) {
  const user = await this.findOne({ username });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('Sai mật khẩu');
  }
  throw Error('Tài khoản không tồn tại');
};

const EmployeeModel = mongoose.model('employees', EmployeeSchema);

module.exports = EmployeeModel;
