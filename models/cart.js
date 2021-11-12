var mongoose = require("mongoose");
var schema = mongoose.Schema;

var cartSchema = new schema({
  email: {
    type: String,
    required: true,
  },
  item_name: {
    type: String,
    required: true,
  },
  item_id: {
    type: String,
    required: true,
  },
  item_details: {
    type: Object,
    required: true,
  },
});

module.exports = mongoose.model("Cart", cartSchema);
