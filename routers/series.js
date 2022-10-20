const express = require("express");
const { Router } = require("express");
const Serie = require("../models").serie;
const auth = require("../auth/middleware");
const { movieDbImageUrl } = require("../config/constants");
// const sharedwatchlistseries = require("../models/sharedwatchlistseries");

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

router.post("/", async (request, response, next) => {
  try {
    console.log("HERE IN POST");
    const serieToSave = request.body;
    console.log(request.body);
    const serieFound = await Serie.findOne({
      where: { tmdb_id: serieToSave.id },
    });
    if (serieFound === null) {
      const serieCreated = await Serie.create({
        name: serieToSave.name,
        poster_path: movieDbImageUrl + serieToSave.poster_path,
        vote_average: serieToSave.vote_average,
        overview: serieToSave.overview,
        tmdb_id: serieToSave.id,
        backdrop_path: movieDbImageUrl + serieToSave.backdrop_path,
      });
      response.send(serieCreated);
    } else {
      response.send(serieFound);
    }
  } catch (e) {
    console.log(e);
    next(e);
  }
});

module.exports = router;
