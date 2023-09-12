const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
    ImageID: {
        type: Number,
        required: true,
    },
    OrginalName: {
        type: String,
        required: true,
    },
    FieldName: {
        type: String,
        required: true,
    },
    MimeType: {
        type: String,
        required: true,
    }
});

const TitleSchema = new mongoose.Schema({
    LanguageID: {
        type: Number,
        required: true,
    },
    Title: {
        type: String,
        required: true,
    },
});

const DiscriptionSchema = new mongoose.Schema({
    LanguageID: {
        type: Number,
        required: true,
    },
    Discription: {
        type: String,
        required: true,
    },
});

const GoalSchema = new mongoose.Schema({
    GoalID: {
        type: Number,
        required: true,
    },
    LanguageID: {
        type: Number,
        required: true,
    },
    Goal: {
        type: String,
        required: true,
    },
    AddedDate: {
        type: String,
        required: true,
    },
    ModifyDate: {
        type: [String],
    },
});

const RequirementsSchema = new mongoose.Schema({
    RequirementID: {
        type: Number,
        required: true,
    },
    LanguageID: {
        type: Number,
        required: true,
    },
    Requirement: {
        type: String,
        required: true,
    },
    AddedDate: {
        type: String,
        required: true,
    },
    ModifyDate: {
        type: [String],
    },
});

const IntendedLearnerSchema = new mongoose.Schema({
    IntendedLearnerID: {
        type: Number,
        required: true,
    },
    LanguageID: {
        type: Number,
        required: true,
    },
    IntendedLearner: {
        type: String,
        required: true,
    },
    AddedDate: {
        type: String,
        required: true,
    },
    ModifyDate: {
        type: [String],
    },
});

const LecturerSchema = new mongoose.Schema({

    LecturerID: {
        type: Number,
        required: true,
    },
    LanguageID: {
        type: Number,
        required: true,
    },
    LecturerTitle: {
        type: String,
        required: true,
    },
    LecturerName: {
        type: String,
        required: true,
    },

});

const CourseSchema = new mongoose.Schema({

    CourseID: {
        type: Number,
        required: true,
    },
    Titles: {
        type: [TitleSchema],
        required: true,
    },
    Discriptions: {
        type: [DiscriptionSchema],
        required: true,
    },
    Goals: {
        type: [GoalSchema],
        required: true,
    },
    Requirements: {
        type: [RequirementsSchema],
        required: true,
    },
    IntendedLearners: {
        type: [IntendedLearnerSchema],
        required: true,
    },

    Lecturers: {
        type: [LecturerSchema],
        required: true,
    },
    CourseLanguage: {
        type: Number,
        required: true,
    },
    CourseLevel: {
        type: Number,
        required: true,
    },
    Image1: {
        type: [ImageSchema],
        required: true,
    },
    Image2: {
        type: ImageSchema,
        required: true,
    },
    Image3: {
        type: ImageSchema,
        required: true,
    },
    Image4: {
        type: ImageSchema,
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
    Modules: {
        type: String,
        required: true,
    },

});

// Connects launchesSchema with the "launches" collection
module.exports = mongoose.model("Course", CourseSchema);