const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BelagSchema = new Schema({
    Name: {
        type: String,
        required: true
    },
    Preis: {
        type: Number,
        required: true
    },
});

const ProduktSchema = new Schema({
    Name: {
        type: String,
        required: true
    },
    Beschreibung: {
        type: String,
        required: true
    },
    Preis: {
        type: Number,
        required: true
    },
    Belag: [BelagSchema]
});

const Produkt = mongoose.model("Produkt", ProduktSchema);

module.exports = Produkt;
