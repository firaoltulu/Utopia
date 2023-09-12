const mongoose = require("mongoose");

const ImageIDSchema = new mongoose.Schema({

    ImageID_ID: {
        type: Number,
        required: true,
    },
    CourseID: {
        type: Number,
        required: true,
    },
    Name: {
        type: String,
        required: true,
    },
    Path: {
        type: String,
        required: true,
    },
    AddedDate: {
        type: String,
        required: true,
    },
    ModifyDate: {
        type: [String],
        required: true,
    },

});

module.exports = mongoose.model("ImageID", ImageIDSchema);