const mongoose = require("mongoose");

const LanguageSchema = new mongoose.Schema({
    LanguageID: {
        type: Number,
        required: true,
    },
    Title: {
        type: String,
        required: true,
    },
    EnglishTitle: {
        type: String,
        required: true,
    },
    AddedDate: {
        type: String,
        required: true,
    },
    ModifedDate: {
        type: String,
        required: true,
    },

});

// Connects launchesSchema with the "launches" collection
module.exports = mongoose.model("Language", LanguageSchema);