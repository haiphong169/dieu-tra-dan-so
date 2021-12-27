const router = require('express').Router();
const {
  getAllPeopleFromAThon,
  postNewPerson,
} = require('../controllers/peopleController');

router.post('/getAllPeopleFromAThon', getAllPeopleFromAThon);
router.post('/postNewPerson', postNewPerson);

module.exports = router;
