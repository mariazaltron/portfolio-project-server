const bcrypt = require("bcrypt");
const { Router } = require("express");
const { toJWT, toData } = require("../auth/jwt");
const authMiddleware = require("../auth/middleware");
const User = require("../models/").user;
const SharedWatchList = require("../models/").sharedWatchList;
const SharedWatchListSerie = require("../models/").SharedWatchListSerie;
const Serie = require("../models/").serie;
const { SALT_ROUNDS } = require("../config/constants");

const router = new Router();

//login
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "Please provide both email and password" });
    }

    const user = await User.findOne({ where: { email: email } });
    const sharedWatchList = await SharedWatchList.findOne({
      where: { owner: user.id },

    });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(400).send({
        message: "User with that email not found or password incorrect",
      });
    }

    delete user.dataValues["password"]; // don't send back the password hash
    const token = toJWT({ owner: user.id });
    return res.status(200).send({ token, user: user.dataValues, sharedWatchList: sharedWatchList });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

//signup
router.post("/signup", async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    return res.status(400).send("Please provide an email, password and a name");
  }

  try {
    const newUser = await User.create({
      email,
      password: bcrypt.hashSync(password, SALT_ROUNDS),
      name,
    });

    const newSharedWatchList = await SharedWatchList.create({
      owner: newUser.dataValues["id"],
      title: `${newUser.dataValues["name"]}'s lists`,
    });

    delete newUser.dataValues["password"]; // don't send back the password hash

    const token = toJWT({ id : newUser.id });

    res
      .status(201)
      .json({ token, id: newUser.dataValues, sharedWatchList: newSharedWatchList.dataValues });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res
        .status(400)
        .send({ message: "There is an existing account with this email" });
    }

    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

// The /me endpoint can be used to:
// - get the users email & name using only their token
// - checking if a token is (still) valid
router.get("/mylists", authMiddleware, async (req, res) => {
  // don't send back the password hash

  const auth =
    req.headers.authorization && req.headers.authorization.split(" ");
  if (!auth || !(auth[0] === "Bearer") || !auth[1]) {
    return res.status(401).send({
      message:
        "This endpoint requires an Authorization header with a valid token",
    });
  }
  const data = toData(auth[1]);
  const sharedWatchList = await SharedWatchList.findAll({
    where: { owner: data.userId },
    include: { model: SharedWatchListSerie },
  });

  console.log("oie", sharedWatchList);
  const user = await User.findOne({ where: { id: data.userId } });
  delete user.dataValues["password"]; // don't send back the password hash

  const token = toJWT({ userId: user.id });
  res.status(200).send({ token, user: user, sharedWatchList: sharedWatchList });
});

module.exports = router;
