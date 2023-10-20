const mongoose = require("mongoose");

const UploadSchema = new mongoose.Schema({
    UploadID: {
        type: Number,
        required: true,
    },
    Title: {
        type: String,
        required: true,
    },
    Active: {
        type: Boolean,
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
module.exports = mongoose.model("Upload", UploadSchema);