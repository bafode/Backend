const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const Product = require("../models/product");
const Cancel = require("../models/cancel");

// sendgrid for email npm i @sendgrid/mail
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(
  "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"
);

const { errorHandler } = require("../helpers/dbErrorHandler");

exports.cancelById = (req, res, next, id) => {
  Cancel.findById(id)
    .populate("product")
    .exec((err, cancel) => {
      if (err || !cancel) {
        return res.status(400).json({
          error: "Product not found",
        });
      }
      req.cancel = cancel;
      next();
    });
};

exports.read = (req, res) => {
  return res.json(req.cancel);
};
// exports.create = (req, res) => {
//   console.log("CANCEL ORDER: ", req.body);
//   // req.body.user = req.profile;

//   const cancel = new Cancel(req.body);
//   cancel.save((error, data) => {
//     if (error) {
//       return res.status(400).json({
//         error: errorHandler(error),
//       });
//     }
//     // send email alert to admin
//     // order.address
//     // order.products.length
//     // order.amount
//     const emailData = {
//       to: "gonzalobafode@gmail.com",
//       from: "noreply@ecommerce.com",
//       subject: `A new order is cancelled`,
//       html: `
//             <p>Customer:${req.body.userId}</p>
//             <p>ProductId: ${req.body.product}</p>
//             <p>Login to dashboard to the order in detail.</p>
//         `,
//     };
//     sgMail.send(emailData);
//     res.json(data);
//   });
// };

exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }
    // check for all fields
    const { text, product, user } = fields;

    if (!text || !product || !user) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    let cancel = new Cancel(fields);

    cancel.save((err, result) => {
      if (err) {
        console.log("cancel CREATE ERROR ", err);
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(result);
    });
  });

  const emailData = {
    to: "gonzalobafode@gmail.com",
    from: "noreply@ecommerce.com",
    subject: `A new order is cancelled`,
    html: `
              <p>Customer:${req.body.userId}</p>
              <p>ProductId: ${req.body.product}</p>
              <p>Login to dashboard to the order in detail.</p>
          `,
  };
  sgMail.send(emailData);
  res.json(data);
  console.log("email data", emailData);
};
