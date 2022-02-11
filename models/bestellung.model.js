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
  Kommentar: {
    type: String,
  },
  Anzahl: {
    type: Number,
    default: 1,
  },
});

const AddressSchema = new Schema({
  Vorname: {
    type: String,
    required: true,
  },
  Nachname: {
    type: String,
    required: true,
  },
  Strasse: {
    type: String,
    required: true,
  },
  Zusatz: {
    type: String,
  },
  Hausnummer: {
    type: Number,
    required: true,
    min: 1,
    max: 999,
  },
  PLZ: {
    type: Number,
    required: true,
    min: 10000,
    max: 99999,
  },
  Stadt: {
    type: String,
    required: true,
  },
  Firma: {
    type: String,
  },
  Telefonnummer: {
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
