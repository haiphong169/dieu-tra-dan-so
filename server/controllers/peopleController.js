const PersonModel = require('../models/Person');
const TinhModel = require('../models/Tinh');
const QuanModel = require('../models/Quan');
const PhuongModel = require('../models/Phuong');
const ThonModel = require('../models/Thon');

module.exports.getAllPeopleFromAThon = (req, res) => {
  PersonModel.find({ locationId: req.body.locationId }, (error, result) => {
    if (!error) {
      res.json(result);
    } else {
      res.json(error);
    }
  });
};

module.exports.postNewPerson = async (req, res) => {
  console.log(req.body);
  const newPerson = req.body;
  const location = newPerson.locationId;
  const tinhId = location.substring(0, 2);
  const quanId = location.substring(2, 4);
  const phuongId = location.substring(4, 6);
  const thonId = location.substring(6);
  try {
    const update = { $inc: { population: 1 } };
    await PersonModel.create(newPerson);
    await TinhModel.findOneAndUpdate({ id: tinhId }, update);
    await QuanModel.findOneAndUpdate({ tinhId: tinhId, id: quanId }, update);
    await PhuongModel.findOneAndUpdate(
      {
        tinhId: tinhId,
        quanId: quanId,
        id: phuongId,
      },
      update
    );
    await ThonModel.findOneAndUpdate(
      {
        tinhId: tinhId,
        quanId: quanId,
        phuongId: phuongId,
        thonId: thonId,
      },
      update
    );
    res.json(newPerson);
  } catch (error) {
    console.log(error);
    res.json({ message: error.message });
  }
};
