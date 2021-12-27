const router = require('express').Router();
const {
  login,
  createAccount,
  logOut,
  getUserData,
  changePassword,
} = require('../controllers/employeeController');

router.post('/login', login);
router.post('/createAccount', createAccount);
router.get('/logOut', logOut);
router.get('/user', getUserData);
router.post('/changePassword', changePassword);

module.exports = router;
