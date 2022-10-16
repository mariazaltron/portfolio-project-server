const express = require("express");
const { Router } = require("express");
const auth = require("../auth/middleware");
const SharedWatchListSeries = require("../models").sharedWatchListSeries;
const SharedWatchList = require("../models").sharedWatchList;
const Serie = require("../models").serie;
const router = new Router();

router.patch("/:id/series/:serieId", auth, async (req, res) => {
  const watchList = await SharedWatchListSeries.findByPk(req.params.id);
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
});

module.exports = router;

router.post("/:id/series/:serieId", auth, async (req, res) => {
  const serieInDB = await Serie.findByPk(req.params.serieId);
  if (serieInDB === null) {
    return res.status(404).send({ message: "Serie not found" });
  }

  const sharedWathListSeries = await SharedWatchListSeries.create({
    serieId: serieInDB.id,
    status: req.body.status,
    sharedWatchListId: req.params.id,
  });
  const sharedWatchList = await SharedWatchList.findByPk(req.params.id, {
    include: { model: Serie },
  });
  return res.status(200).send({ sharedWatchList });
});

module.exports = router;
