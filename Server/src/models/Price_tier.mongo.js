const mongoose = require("mongoose");

const Price_Tier_Schema = new mongoose.Schema({
    Price_Tier_ID: {
        type: Number,
        required: true,
    },
    Min_Price_Tier: {
        type: Number,
        required: true,
    },
    Max_Price_Tier: {
        type: Number,
        required: true,
    },
    Currency_ID: {
        type: String,
        required: true,
    },
    AddedDate: {
        type: String,
        required: true,
    },
    ModifedDate: {
        type: [String],
        required: true,
    },
});

module.exports = mongoose.model("Price_Tier", Price_Tier_Schema);