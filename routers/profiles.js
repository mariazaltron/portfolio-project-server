const express = require("express");
const { Router } = require("express");
const auth = require("../auth/middleware");
const User = require("../models/").user;
const SharedWatchListSeries = require("../models").sharedWatchListSeries;
const SharedWatchList = require("../models").sharedWatchList;
const Serie = require("../models").serie;
const router = new Router();

// get all profiles
router.get("/", async (request, response, next) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    response.send(users);
    
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});

module.exports = router;
