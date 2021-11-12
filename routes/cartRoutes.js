const cartMethods = require("../methods/cartActions");

const routesCart = [
  {
    method: "GET",
    url: "/api/get-cart-items",
    handler: cartMethods.cartFunctions.FetchUserCart,
  },
  {
    method: "POST",
    url: "/api/add-cart-item",
    handler: cartMethods.cartFunctions.AddToCart,
  },

  {
    method: "POST",
    url: "/api/delete-cart-item",
    handler: cartMethods.cartFunctions.RemoveFromCart,
  },
];
module.exports = routesCart;
