const Menu = require("../models/menu");
const recepies = [
  {
    email: "admin@gmail.com",
    item_name: "Boori and Channa",
    item_price: "90",
    item_description: "Perfect Tiffin item .",
    item_stock: 20,
    item_pic:
      "https://trade-go.s3.ap-south-1.amazonaws.com/Restauran-app/boori-channa.jpg",
  },
  {
    email: "admin@gmail.com",
    item_name: "Full Meals",
    item_price: "120",
    item_description: "Full meals with deserts free .",
    item_stock: 10,
    item_pic:
      "https://trade-go.s3.ap-south-1.amazonaws.com/Restauran-app/full-meals.jpeg",
  },
  {
    email: "admin@gmail.com",
    item_name: "Tiffin with Snacks",
    item_price: "100",
    item_description: "Perfect Tiffin with spicy snacks.",
    item_stock: 50,
    item_pic:
      "https://trade-go.s3.ap-south-1.amazonaws.com/Restauran-app/full-tiffin.jpg",
  },
  {
    email: "admin@gmail.com",
    item_name: "Ghee Roast",
    item_price: "40",
    item_description: "Roasted with ghee and it will satisfy you.",
    item_stock: 10,
    item_pic:
      "https://trade-go.s3.ap-south-1.amazonaws.com/Restauran-app/ghee-roast.jpg",
  },
  {
    email: "admin@gmail.com",
    item_name: "Idly-Coconut Gravy",
    item_price: "5",
    item_description: "Your favorite Getti chatni.",
    item_stock: 40,
    item_pic:
      "https://trade-go.s3.ap-south-1.amazonaws.com/Restauran-app/idly-coconutgravy.jpeg",
  },
  {
    email: "admin@gmail.com",
    item_name: "Idly with Vada",
    item_price: "10",
    item_description: "Favorite idly with tasty Vada.",
    item_stock: 40,
    item_pic:
      "https://trade-go.s3.ap-south-1.amazonaws.com/Restauran-app/idly-vada.jpg",
  },
  {
    email: "admin@gmail.com",
    item_name: "Masal Vada",
    item_price: "10/Pair",
    item_description: "Spicy masal vada. ",
    item_stock: 35,
    item_pic:
      "https://trade-go.s3.ap-south-1.amazonaws.com/Restauran-app/masal-vada.jpg",
  },
  {
    email: "admin@gmail.com",
    item_name: "Pizza with extra Cheese",
    item_price: "160",
    item_description: "Delicious veg Pizza for you.",
    item_stock: 5,
    item_pic:
      "https://trade-go.s3.ap-south-1.amazonaws.com/Restauran-app/pizza-crust2.jpg",
  },
  {
    email: "admin@gmail.com",
    item_name: "Pizza with Red Pepper",
    item_price: "260",
    item_description: "Delicious Chicken Pizza extra spices.",
    item_stock: 4,
    item_pic:
      "https://trade-go.s3.ap-south-1.amazonaws.com/Restauran-app/pizza-redpepper.jpg",
  },
  {
    email: "admin@gmail.com",
    item_name: "Ven Pongal",
    item_price: "70",
    item_description: "Traditional pongal with Sambar.",
    item_stock: 14,
    item_pic:
      "https://trade-go.s3.ap-south-1.amazonaws.com/Restauran-app/pongal-gravy.jpg",
  },
  {
    email: "admin@gmail.com",
    item_name: "Pot Tea",
    item_price: "10",
    item_description: "Hot tea with sweet taste.",
    item_stock: 120,
    item_pic:
      "https://trade-go.s3.ap-south-1.amazonaws.com/Restauran-app/pot-tea.jpeg",
  },
  {
    email: "admin@gmail.com",
    item_name: "Soft Fritter",
    item_price: "10/Pair",
    item_description: "Your favorite methu vadai.",
    item_stock: 19,
    item_pic:
      "https://trade-go.s3.ap-south-1.amazonaws.com/Restauran-app/soft-fritter.jpeg",
  },
  {
    email: "admin@gmail.com",
    item_name: "Masala Roast",
    item_price: "100",
    item_description: "Delicious masala roast and potato stuff.",
    item_stock: 5,
    item_pic:
      "https://trade-go.s3.ap-south-1.amazonaws.com/Restauran-app/spice-roast-stuff.jpg",
  },
  {
    email: "admin@gmail.com",
    item_name: "Vermicelli Pudding",
    item_price: "60",
    item_description: "Extreme sweet pudding with add ons.",
    item_stock: 25,
    item_pic:
      "https://trade-go.s3.ap-south-1.amazonaws.com/Restauran-app/vermicelli-pudding.jpg",
  },
];

var menuFunctions = {
  GetAllItems: async (req, res) => {
    try {
      const menus = await Menu.find({});
      console.log(menus);
      res.status(200).send({
        success: true,
        msg: "Fetched all menu items !",
        menuDetails: menus,
      });
    } catch (err) {
      console.log(err);
      res.status(408).send({
        success: false,
        msg: "Something went wrong !\n" + err,
      });
    }
  },
  SaveMenu: async (req, res) => {
    var inc = 0;
    recepies.map(async (value) => {
      var newMenu = new Menu({
        email: value.email,
        item_name: value.item_name,
        item_price: value.item_price,
        item_description: value.item_description,
        item_stock: value.item_stock,
        item_pic: value.item_pic,
      });
      try {
        const savedMenu = await newMenu.save();
        console.log(savedMenu);
        inc++;
        if (inc === recepies.length) {
          res.send({ msg: "Success \n" + savedMenu });
        }
      } catch (err) {
        res.send({ msg: "Went Wrong !\n" + err });
      }
    });
  },
};
module.exports = { menuFunctions };
