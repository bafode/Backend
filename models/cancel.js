const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const cancelSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    product: {
      type: ObjectId,
      ref: "Product",
      // required: true,
    },
    user: {
      type: ObjectId,
      ref: "User",
      //required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cancel", cancelSchema);
