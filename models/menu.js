var mongoose = require("mongoose");
var schema = mongoose.Schema;

var menuSchema = new schema(
  {
    email: {
      type: String,
      required: true,
      default: "admin@gmail.com",
    },
    item_name: {
      type: String,
      required: true,
      unique: true,
    },
    item_price: {
      type: String,
      required: true,
    },
    item_description: {
      type: String,
      required: true,
      default: "No description provided .",
    },
    item_stock: {
      type: Number,
      required: true,
    },
    item_pic: {
      type: String,
      required: true,
      default: "img",
    },
  },
  { timestamps: true, collection: "menus" }
);

module.exports = mongoose.model("Menu", menuSchema);
