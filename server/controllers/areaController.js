const TinhModel = require('../models/Tinh');
const QuanModel = require('../models/Quan');
const PhuongModel = require('../models/Phuong');
const ThonModel = require('../models/Thon');

module.exports.getAllTinhs = (req, res) => {
  TinhModel.find({}, (error, result) => {
    if (!error) {
      res.json(result);
    } else {
      res.json(error);
    }
  });
};

module.exports.getTinhById = (req, res) => {
  TinhModel.find({ id: req.body.id }, (error, result) => {
    if (!error) {
      res.json(result);
    } else {
      res.json(error);
    }
  });
};
module.exports.getQuanById = (req, res) => {
  QuanModel.find(
    { tinhId: req.body.tinhId, id: req.body.id },
    (error, result) => {
      if (!error) {
        res.json(result);
      } else {
        res.json(error);
      }
    }
  );
};
module.exports.getPhuongById = (req, res) => {
  PhuongModel.find(
    { tinhid: req.body.tinhId, quanId: req.body.quanId, id: req.body.id },
    (error, result) => {
      if (!error) {
        res.json(result);
      } else {
        res.json(error);
      }
    }
  );
};
module.exports.getThonById = (req, res) => {
  ThonModel.find(
    {
      tinhId: req.body.tinhId,
      quanId: req.body.quanId,
      phuongId: req.body.phuongId,
      id: req.body.id,
    },
    (error, result) => {
      if (!error) {
        res.json(result);
      } else {
        res.json(error);
      }
    }
  );
};

module.exports.getAllQuans = (req, res) => {
  QuanModel.find({ tinhId: req.body.tinhId }, (error, result) => {
    if (!error) {
      res.json(result);
    } else {
      res.json(error);
    }
  });
};

module.exports.getAllPhuongs = (req, res) => {
  PhuongModel.find(
    { tinhId: req.body.tinhId, quanId: req.body.quanId },
    (error, result) => {
      if (!error) {
        res.json(result);
      } else {
        res.json(error);
      }
    }
  );
};

module.exports.getAllThons = (req, res) => {
  ThonModel.find(
    {
      tinhId: req.body.tinhId,
      quanId: req.body.quanId,
      phuongId: req.body.phuongId,
    },
    (error, result) => {
      if (!error) {
        res.json(result);
      } else {
        res.json(error);
      }
    }
  );
};

module.exports.postNewTinh = async (req, res) => {
  const newData = req.body;
  await TinhModel.create(newData);
  res.json(newData);
};

module.exports.postNewQuan = async (req, res) => {
  const newData = req.body;
  await QuanModel.create(newData);
  res.json(newData);
};

module.exports.postNewPhuong = async (req, res) => {
  const newData = req.body;
  await PhuongModel.create(newData);
  res.json(newData);
};

module.exports.postNewThon = async (req, res) => {
  const newData = req.body;
  await ThonModel.create(newData);
  res.json(newData);
};
