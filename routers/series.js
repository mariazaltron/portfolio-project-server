const express = require("express");
const { Router } = require("express");
const Serie = require("../models").serie;
const auth = require("../auth/middleware");

const router = new Router();

//get all the series by id
router.get("/:id", async (request, response, next) => {
  try {
    const serieId = request.params.id;
    const serieById = await Serie.findByPk(serieId);
    response.send(serieById);
  } catch (e) {
    next(e);
  }
});

module.exports = router;

