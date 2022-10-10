const express = require("express");
const { Router } = require("express");
const SharedWatchList = require("../models").SharedWatchList;
const auth = require("../auth/middleware");

const router = new Router();

//get all the sharedWatchLists
router.get("/", async (request, response, next) => {
  try {
    const allSharedWatchLists = await SharedWatchList.findAll();
    response.send(allSharedWatchLists);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
