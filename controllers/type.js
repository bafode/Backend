const Type = require("../models/type");
const Product = require("../models/product");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.typeById = (req, res, next, id) => {
  Type.findById(id).exec((err, type) => {
    if (err || !type) {
      return res.status(400).json({
        error: "Category does not exist",
      });
    }
    req.type = type;
    next();
  });
};

exports.create = (req, res) => {
  const type = new Type(req.body);
  type.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({ data });
  });
};

exports.read = (req, res) => {
  return res.json(req.type);
};

exports.update = (req, res) => {
  console.log("req.body", req.body);
  console.log("type update param", req.params.typeId);

  const type = req.type;
  type.name = req.body.name;
  type.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};

exports.remove = (req, res) => {
  const type = req.type;
  Product.find({ type }).exec((err, data) => {
    if (data.length >= 1) {
      return res.status(400).json({
        message: `Sorry. You cant delete ${type.name}. It has ${data.length} associated products.`,
      });
    } else {
      type.remove((err, data) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        res.json({
          message: "Type deleted",
        });
      });
    }
  });
};

exports.list = (req, res) => {
  Type.find().exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};
