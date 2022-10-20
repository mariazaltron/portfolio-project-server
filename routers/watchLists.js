const express = require("express");
const { Router } = require("express");
const auth = require("../auth/middleware");
const WatchListSeries = require("../models").watchListSeries;
const SharedWatchList = require("../models").sharedWatchList;
const WatchList = require("../models").watchList;
const Serie = require("../models").serie;
const User = require("../models").user;
const { Sequelize } = require("sequelize");
const { movieDbImageUrl } = require("../config/constants");

const router = new Router();

router.get("/", auth, async (req, res) => {
  const user = req.user;

  const listsWithMe = await WatchList.findAll({
    include: [
      { model: Serie },
      {
        model: User,
        where: { id: user.id },
      },
    ],
  });
  const listsWithOthers = await WatchList.findAll({
    where: { owner: user.id },
    include: [
      { model: Serie },
      {
        model: User,
        where: {
          id: {
            [Sequelize.Op.not]: user.id,
          },
        },
        required: false,
      },
    ],
  });
  res.status(200).send({
    userId: user.id,
    withMe: listsWithMe,
    withOthers: listsWithOthers,
  });
});

router.post("/", auth, async (req, res) => {
  console.log("hello post endpoint");
  const user = req.user;
  const sharedWatchList = await WatchList.create({
    owner: user.id,
    name: req.body.name,
  });
  return res.status(200).send({ sharedWatchList });
});

router.patch("/:id/series/:serieId", async (req, res, next) => {
  try {
    const watchList = await WatchListSeries.findOne({
      where: { serieId: req.params.serieId, watchListId: req.params.id },
    });

    if (watchList === null) {
      return res.status(404).send({ message: "WatchList not found" });
    }
    const serie = await Serie.findByPk(req.params.serieId);
    if (serie === null) {
      return res.status(404).send({ message: "Serie not found" });
    }

    const statusToUpdate = req.body.status;
    await watchList.update({
      status: statusToUpdate,
    });
    return res.status(200).send({ watchList });
  } catch (e) {
    console.log(e.message);
    next();
  }
});

router.post("/:id/series", auth, async (req, res) => {
  const serieToSave = req.body;
  const serieFound = await Serie.findOne({
    where: { tmdb_id: serieToSave.id },
  });
  const serieCreated =
    serieFound === null
      ? await Serie.create({
          name: serieToSave.name,
          poster_path: movieDbImageUrl + serieToSave.poster_path,
          vote_average: serieToSave.vote_average,
          overview: serieToSave.overview,
          tmdb_id: serieToSave.id,
          backdrop_path: movieDbImageUrl + serieToSave.backdrop_path,
        })
      : serieFound;

  const sharedWatchListSeries = await WatchListSeries.create({
    serieId: serieCreated.id,
    status: "watching",
    watchListId: req.params.id,
  });
  const sharedWatchList = await WatchList.findOne({
      where: { owner: req.user.id },
      include: { model: Serie },
  });
  return res.status(200).send(sharedWatchList);
});

router.delete("/:id/series/:serieId", auth, async (req, res, next) => {
  try {
    const watchList = await WatchListSeries.findOne({
      where: {
        sharedWatchListId: req.params.id,
        serieId: req.params.serieId,
      },
    });
    if (watchList === null) {
      return res.status(404).send({ message: "WatchList not found" });
    }

    await watchList.destroy();

    res.send({ message: "ok" });
  } catch (e) {
    next(e);
  }
});

router.post("/:id/users/:userId", auth, async (req, res) => {
  const profile = await User.findByPk(req.params.userId);
  if (profile === null) {
    return res.status(404).send({ message: "Profile not found" });
  }
  const watchList = await WatchList.findByPk(req.params.id);
  if (watchList === null) {
    return res.status(404).send({ message: "WatchList not found" });
  }

  const sharedWatchListUsers = await SharedWatchList.create({
    userId: profile.id,
    watchListId: watchList.id,
  });
  return res.status(200).send({ user: profile, sharedWatchList: watchList.id });
});

module.exports = router;
