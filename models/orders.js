var mongoose = require("mongoose");
var schema = mongoose.Schema;

var orderSchema = new schema({
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
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  item_details: {
    type: Object,
    required: true,
  },
  delivery_status: {
    type: String,
    default: "pending",
    enum: ["pending", "delivered", "cancelled"],
  },
});

module.exports = mongoose.model("Order", orderSchema);
