const Orders = require("../models/orders");

var orderFunctions = {
  CreateOrder: async (req, res) => {
    var newOrder = new Orders({
      email: req.body.email,
      item_name: req.body.item_name,
      item_id: req.body.item_id,
      quantity: req.body.quantity,
      item_details: req.body.details,
    });
    try {
      const order = await newOrder.save();
      console.log(order);
      res.status(200).send({
        success: true,
        msg: "Order Placed Successfully !",
        orderDetails: order,
      });
    } catch (err) {
      console.log(err);
      res.status(408).send({
        success: false,
        msg: "Something went wrong !\n" + err,
      });
    }
  },
  GetUserOrders: async (req, res) => {
    try {
      const orders = await Orders.find({ email: req.body.email });
      console.log(orders);
      res.status(200).send({
        success: true,
        msg: "Fetched your orders successfully !",
        orderDetails: orders,
      });
    } catch (err) {
      console.log(err);
      res.status(408).send({
        success: false,
        msg: "Something went wrong !\n" + err,
      });
    }
  },
  CancelOrder: async (req, res) => {
    try {
      const order = await Orders.findOneAndUpdate(
        {
          _id: req.body.id,
          email: req.body.email,
        },
        { status: "cancelled" },
        { new: true }
      );

      console.log(order);
      res.status(200).send({
        success: true,
        msg: "Your Order has been cancelled .",
        orderDetails: order,
      });
    } catch (err) {
      console.log(err);
      res.status(408).send({
        success: false,
        msg: "Something went wrong !\n" + err,
      });
    }
  },
  RemoveOrder: async (req, res) => {
    try {
      const order = await Orders.findOneAndDelete({
        _id: req.body.id,
        email: req.body.email,
      });
      console.log(order);
      res.status(200).send({
        success: true,
        msg: "Order Removed Successfully !",
      });
      s;
    } catch (err) {
      console.log(err);
      res.status(408).send({
        success: false,
        msg: "Something went wrong !\n" + err,
      });
    }
  },
};
module.exports = { orderFunctions };