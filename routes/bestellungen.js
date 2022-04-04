const express = require("express");
const router = express.Router();
const Bestellung = require("../models/bestellung.model");
const { verifyUser } = require("../authenticate");

router
  .route("/")

  // zeige alle bestellungen, nur für admin
  .get(verifyUser, (req, res, next) => {
    
    //wenn eine query "status" existiert, suche nach status, sonst zeige alles
    let query = {};
    if(req.query.status){
      query = { Status: req.query.status};
    }
    Bestellung.find(query).then((data) => {
      res.json(data);
    });
  })

  // neue bestellung hinzufügen
  .post((req, res, next) => {
    Bestellung.create(req.body)
      .then((data) => res.json(data))
      .catch((err) => next(err));
  })
  .delete();

router
  .route("/:id")
  // zeige eine spezifische bestellung, nur admin?
  .get((req, res, next) => {
    Bestellung.findById(req.params.id)
      .then((data) => res.json(data))
      .catch((err) => next(err));
  })

  // update eine spezifische bestellung, nur admin
  .put(verifyUser, (req, res, next) => {
    Bestellung.findByIdAndUpdate(
      req.params.id,
      {
        Status: req.body.Status,
      },
      {
        new: true,
        runValidators: true,
      }
    )
      .then((data) => res.json(data))
      .catch((err) => next(err));
  });

  router.route("/reset")

  .get( (req, res, next) => {
    Bestellung.updateMany( {},  { Status: "offen" } )
      .then((data) => res.json(data))
      .catch((err) => next(err));
  })
  
module.exports = router;
