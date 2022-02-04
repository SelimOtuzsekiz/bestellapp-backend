const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProduktSchema = new Schema({
  Name: {
    type: String,
    required: true
  },
  Belag: {
    type: String,
    required: true
  },
  Preis: {
    type: Number,
    required: true
  },
  Kommentar: {
    type: String
  },
  Anzahl: {
      type: Number,
      default: 1
  }
});

const AddressSchema = new Schema({
  Vorname: {
    type: String,
    required: true
  },
  Nachname: {
    type: String,
    required: true
  },
  Adresse: {
    type: String,
    required: true
  },
  Zusatz: {
    type: String,
  },
  Hausnummer: {
    type: Number,
    required: true,
    min: 1,
    max: 999
  },
  Firma: {
    type: String,
    required: true
  },
  Telefonnummer: {
    type: Number,
    required: true
  },
});

const BestellungSchema = new Schema({
  Produkte: [ProduktSchema],
  Preis: {
    type: Number,
    required: true
  },
  KontaktDaten: AddressSchema,
  Status: {
      type: String,
      enum: ["offen", "in Bearbeitung", "abgeschlossen","storniert"],
      default: "offen"
  }
});

const Bestellung = mongoose.model("Bestellung", BestellungSchema);

module.exports = Bestellung;
