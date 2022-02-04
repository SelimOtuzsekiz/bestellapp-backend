var express = require("express");
var router = express.Router();
const Produkte = require("../models/produkt.model");
const { verifyUser } = require("../authenticate");

router
  .route("/")

  // zeige alle produkte
  .get((req, res, next) => {
    Produkte.find({}).then((data) => {
      res.json(data);
    });
  })

  // neue produkt hinzufügen
  .post(verifyUser, (req, res, next) => {
    Produkte.create(req.body)
      .then((data) => res.json(data))
      .catch((err) => next(err));
  })
  .put()
  .delete();

router
  .route("/:id")

  // zeige eine spezifische produkt, nur admin?
  .get((req, res, next) => {
    Produkte.findById(req.params.id)
      .then((data) => res.json(data))
      .catch((err) => next(err));
  })

  // neue belag hinzufügen
  .post(verifyUser, (req, res, next) => {
    Produkte.findById(req.params.id)
      .then((data) => {
        data.Belag.push(req.body);
        data.save().then((data) => res.json(data));
      })
      .catch((err) => next(err));
  })

  // update den Preis einer spezifischen bestellung, nur admin
  .put(verifyUser, (req, res, next) => {
    Produkte.findByIdAndUpdate(
      req.params.id,
      {
        Name: req.body.Name,
        Preis: req.body.Preis,
        Beschreibung: req.body.Beschreibung
      },
      {
        new: true,
        runValidators: true,
      }
    )
      .then((data) => res.json(data))
      .catch((err) => next(err));
  })

  .delete(verifyUser, (req, res, next) => {
    Produkte.findByIdAndDelete(req.params.id)
      .then((data) => res.json(data))
      .catch((err) => next(err));
  });

router
  .route("/:id/:belagid")
  .get((req, res, next) => {
    Produkte.findById(req.params.id)
      .then((data) => res.json(data.Belag.id(req.params.belagid)))
      .catch((err) => next(err));
  })

  // update den Preis oder name einer spezifischen belag, nur admin
  .put(verifyUser, (req, res, next) => {
    Produkte.findById(req.params.id)
      .then((data) => {
        if (req.body.Name)
          data.Belag.id(req.params.belagid).Name = req.body.Name;
        if (req.body.Preis)
          data.Belag.id(req.params.belagid).Preis = req.body.Preis;
        data.save().then((data) => res.json(data));
      })
      .catch((err) => next(err));
  })

  // lösche eine spezifischen belag, nur admin
  .delete(verifyUser, (req, res, next) => {
    Produkte.findById(req.params.id)
      .then((data) => {
        data.Belag.pull(req.params.belagid);
        data.save().then((data) => res.json(data));
      })

      .catch((err) => next(err));
  });

module.exports = router;
