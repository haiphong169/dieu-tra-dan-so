const router = require('express').Router();
const {
  getAllTinhs,
  getAllQuans,
  getAllPhuongs,
  getAllThons,
  postNewTinh,
  postNewQuan,
  postNewPhuong,
  postNewThon,
  getTinhById,
  getQuanById,
  getPhuongById,
  getThonById,
} = require('../controllers/areaController');

router.post('/getTinhById', getTinhById);
router.post('/getQuanById', getQuanById);
router.post('/getPhuongById', getPhuongById);
router.post('/getThonById', getThonById);
router.get('/getAllAreas/tinh', getAllTinhs);
router.post('/getAllAreas/quan', getAllQuans);
router.post('/getAllAreas/phuong', getAllPhuongs);
router.post('/getAllAreas/thon', getAllThons);
router.post('/postNewArea/tinh', postNewTinh);
router.post('/postNewArea/quan', postNewQuan);
router.post('/postNewArea/phuong', postNewPhuong);
router.post('/postNewArea/thon', postNewThon);

module.exports = router;
