const orderMethods = require("../methods/orderActions");

const routesOrder = [
  {
    method: "GET",
    url: "/api/get-user-orders",
    handler: orderMethods.orderFunctions.GetUserOrders,
  },
  {
    method: "POST",
    url: "/api/create-orders",
    handler: orderMethods.orderFunctions.CreateOrder,
  },

  {
    method: "POST",
    url: "/api/cancel-orders",
    handler: orderMethods.orderFunctions.CancelOrder,
  },

  {
    method: "POST",
    url: "/api/delete-orders",
    handler: orderMethods.orderFunctions.RemoveOrder,
  },
];
module.exports = routesOrder;
