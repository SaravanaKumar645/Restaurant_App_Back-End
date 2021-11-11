const User = require("../models/user");
const { OAuth2Client } = require("google-auth-library");
const utils = require("./utils");
const client = new OAuth2Client(process.env.GOOGLE_OAUTH_CLIENT_ID);
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

var functions = {
  Home: async (req, res) => {
    res.send({ msg: "Hello there he !", success: true });
  },
  RegisterUser: async (req, res) => {
    const { name, email, password, mobile } = req.body;
    await User.findOne({ email: email }, async (err, user) => {
      if (err) {
        console.log(err);
        return res
          .status(400)
          .send({ success: false, msg: "Something went wrong ! Try again ." });
      }
      if (user) {
        console.log(user);
        res.code(202);
        return res.send({
          success: false,
          msg: "User already exists ! Try with different email",
        });
      }
      const newUser = User({
        name: name,
        email: email,
        password: password,
        mobileNumber: mobile,
      });
      await newUser.save(async function (err, newUser) {
        if (err || !newUser) {
          console.log(err);
          res.status(400).send({
            success: false,
            msg: "Something went wrong ! Try again .",
          });
        }
        if (newUser) {
          console.log(newUser);
          const accessToken = utils.generateAccessToken(newUser);

          res.status(200).send({
            success: true,
            msg: "User Created Successfully !",
            accessToken: accessToken,
            name: newUser.name,
            picture: newUser.picture,
            email: newUser.email,
          });
        }
      });
    })
      .clone()
      .catch(function (err) {
        console.log(err);
      });
  },

  LoginUser: async (req, res) => {
    const { email, password } = req.body;
    await User.findOne({ email: email }, function (err, user) {
      if (err) {
        console.log(err);
        res.status(408);
        return res.send({
          success: false,
          msg: "Authentication Failed. ERROR :" + err,
        });
      }
      if (user === null) {
        console.log(user);
        res.status(202);
        return res.send({ success: false, msg: "User does not exist" });
      } else {
        console.log(user);
        user.comparePassword(password, async function (err, isMatch) {
          if (isMatch && !err) {
            const accessToken = utils.generateAccessToken(user);

            res.status(200).send({
              success: true,
              msg: "Login Successfull !",
              accessToken: accessToken,
              name: user.name,
              picture: user.picture,
              email: user.email,
            });
          } else {
            res.status(203).send({
              success: false,
              msg: "Authentication failed ! Wrong password !",
            });
          }
        });
      }
    })
      .clone()
      .catch(function (err) {
        console.log(err);
      });
  },

  LoginUserGoogle: async (req, res) => {
    console.log(req.body.tokenid);
    const { tokenid } = req.body;
    await client
      .verifyIdToken({
        idToken: tokenid,
        audience: process.env.OAUTH_CLIENT_ID,
      })
      .then((response) => {
        const { email_verified, name, email, picture } = response.payload;
        const password = email.split("@");

        console.log(response.payload);

        if (email_verified) {
          User.findOne({ email }, async function (err, user) {
            if (err) {
              console.log(err);
              res.code(400);
              return res.send({
                success: false,
                msg: "Something went wrong ! Try again",
              });
            } else {
              if (user) {
                user.picture = picture;
                await user.save(async function (err, newUser) {
                  if (err) {
                    console.log(err);
                    res.code(408);
                    return res.send({
                      sucess: false,
                      msg: "Failed to create User !. Try again",
                    });
                  } else {
                    var userCompany = await Company.findOne({ email: email });
                    const accessToken = utils.generateAccessToken(newUser);
                    const refreshToken = utils.generateRefreshToken(newUser);

                    refreshTokens.push(refreshToken);
                    res.code(200);
                    return res.send({
                      success: true,
                      msg: "Successfully created user ! : " + response.mail,
                      accessToken: accessToken,
                      refreshToken: refreshToken,
                      name: newUser.name,
                      email: newUser.email,
                      picture: newUser.picture,
                      companyDetails: JSON.stringify(userCompany),
                    });
                  }
                });
              } else {
                var newUser = User({
                  name: name,
                  email: email,
                  password: password[0],
                  picture: picture,
                  expireToken: Date.now() + 180000000,
                });
                await newUser.save(async function (err, newUser) {
                  if (err) {
                    console.log(err);
                    res.code(408);
                    return res.send({
                      sucess: false,
                      msg: "Failed to create User !. Try again",
                    });
                  } else {
                    const accessToken = utils.generateAccessToken(newUser);
                    const refreshToken = utils.generateRefreshToken(newUser);

                    refreshTokens.push(refreshToken);
                    res.code(200);
                    return res.send({
                      success: true,
                      msg: "Successfully created user ! : " + response.mail,
                      accessToken: accessToken,
                      refreshToken: refreshToken,
                      name: newUser.name,
                      email: newUser.email,
                      picture: newUser.picture,
                      companyDetails: null,
                    });
                  }
                });
              }
            }
          });
        } else {
          console.log("Email:" + email_verified);
          res.code(408);
          return res.send({
            success: false,
            msg: "Email not verified !. Try again",
          });
        }
      });
  },

  LoginUserFacebook: async (req, res) => {
    const { accessToken, userID } = req.body;
    let urlGraphFacebook = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email,picture&access_token=${accessToken}`;
    fetch(urlGraphFacebook, {
      method: "GET",
    })
      .then((result) => result.json())
      .then((result) => {
        const email = result.email;
        const name = result.name;
        const picture = result.picture.data.url;
        const password = email.split("@");
        console.log(result);

        User.findOne({ email }, async function (err, user) {
          if (err) {
            console.log(err);
            res.code(400);
            return res.send({
              success: false,
              msg: "Something went wrong ! Try again",
            });
          } else {
            if (user) {
              user.picture = picture;
              await user.save(async function (err, newUser) {
                if (err) {
                  console.log(err);
                  res.code(408);
                  return res.send({
                    sucess: false,
                    msg: "Failed to create User !. Try again",
                  });
                } else {
                  var userCompany = await Company.findOne({ email: email });
                  const accessToken = utils.generateAccessToken(newUser);
                  const refreshToken = utils.generateRefreshToken(newUser);

                  refreshTokens.push(refreshToken);
                  res.code(200);
                  return res.send({
                    success: true,
                    msg: "Successfully created user !",
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    name: newUser.name,
                    email: newUser.email,
                    picture: newUser.picture,
                    companyDetails: JSON.stringify(userCompany),
                  });
                }
              });
            } else {
              var freshUser = User({
                name: name,
                email: email,
                password: password[0],
                picture: picture,
                expireToken: Date.now() + 180000000,
              });
              await freshUser.save(function (err, newUser) {
                if (err) {
                  console.log(err);
                  res.code(408);
                  return res.send({
                    sucess: false,
                    msg: "Failed to create User !. Try again",
                  });
                } else {
                  const accessToken = utils.generateAccessToken(newUser);
                  const refreshToken = utils.generateRefreshToken(newUser);

                  refreshTokens.push(refreshToken);
                  res.code(200);
                  return res.send({
                    success: true,
                    msg: "Successfully created user !",
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    name: newUser.name,
                    email: newUser.email,
                    picture: newUser.picture,
                    companyDetails: null,
                  });
                }
              });
            }
          }
        });
      });
  },
};
module.exports = { functions };
