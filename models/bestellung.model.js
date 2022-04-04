const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProduktSchema = new Schema({
  Name: {
    type: String,
    required: true,
  },
  Belag: {
    type: String,
    required: true,
  },
  Preis: {
    type: Number,
    required: true,
  },
});

const AddressSchema = new Schema({
  vorname: {
    type: String,
    required: true,
  },
  nachname: {
    type: String,
    required: true,
  },
  strasse: {
    type: String,
    required: true,
  },
  zusatz: {
    type: String,
  },
  hausnummer: {
    type: Number,
    required: true,
    min: 1,
    max: 999,
  },
  plz: {
    type: Number,
    required: true,
    min: 10000,
    max: 99999,
  },
  stadt: {
    type: String,
    required: true,
  },
  firma: {
    type: String,
  },
  telefonnummer: {
    type: String,
    required: true,
  },
});

const BestellungSchema = new Schema(
  {
    Produkte: [ProduktSchema],
    Preis: {
      type: Number,
      required: true,
    },
    KontaktDaten: AddressSchema,
    Status: {
      type: String,
      enum: ["offen", "in Bearbeitung", "abgeschlossen", "storniert"],
      default: "offen",
    },
  },
  {
    timestamps: true,
  }
);

const Bestellung = mongoose.model("Bestellung", BestellungSchema);

module.exports = Bestellung;
