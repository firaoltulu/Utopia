const fs = require('fs');
var path = require('path');
const express = require("express");
var { graphqlHTTP } = require('express-graphql');
const multer = require('multer');
const schema = require("../../scheme/curriculumscheme");

const { existsCourseWithId } = require("../../models/Course.model");

const { getAllCurriculumContent } = require("../../models/child/Curriculum.model");

const {
    httpAddNewCurriculumModuleItem,
    httpEditCurriculumModuleItem,
    httpEditCurriculumModuleIndex,
    httpAddNewCurriculumModuleLectureItem,
    httpEditCurriculumModuleLectureItem,
    httpEditCurriculumModuleLectureIndex,
    httpAddCurriculumModuleLectureContent,
    httpStreamCurriculumModuleLectureContent,
    httpAddCurriculumModuleLectureContentExtraResource,
    httpDeleteCurriculumModuleLectureContentExtraResource,
    httpAddNewCurriculumModuleQuestionItem,
    httpEditNewCurriculumModuleQuestionItemContent,
    httpEditCurriculumModuleQuestionItem
    // httpGetAllCourses,
    // httpEditCourse,
    // httpDeleteCourse
} = require("./curriculum.controller");

const PERMITED_VIDEO_FILES = ["avi", "mpg", "mpeg", "mp4", "webm", "wmv"];

const PERMITED_DOCUMENTS_FILES = ["pdf"];

const PERMITED_RESOURCE_DOCUMENTS_FILES =
    [
        "pdf",
        "vnd.openxmlformats-officedocument.wordprocessingml.document",
        "vnd.openxmlformats-officedocument.wordprocessingml.template",
        "msword",

        "mspowerpoint",
        "vnd.ms-powerpoint",
        "vnd.openxmlformats-officedocument.presentationml.presentation",

        "vnd.ms-excel",
        "vnd.ms-excel.addin.macroEnabled.12",
        "vnd.ms-excel.sheet.binary.macroEnabled.12",
        "vnd.ms-excel.sheet.macroEnabled.12",
        "vnd.ms-excel.template.macroEnabled.12",
        "vnd.openxmlformats-officedocument.presentationml.presentation",
        "vnd.openxmlformats-officedocument.presentationml.slide",
        "vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "vnd.openxmlformats-officedocument.spreadsheetml.template",
    ];

const DEFAULT_EXTRA_RESOURCE_NUMBER = 100;

const storage = multer.diskStorage({

    destination: async function (req, file, cb) {

        try {

            if (req.path === '/AddCurriculumModuleLectureContent') {
                const body = req.body;
                const CourseID = body.CourseID;
                const CurriculumID = body.CurriculumID;
                const ModuleID = body.ModuleID;
                const LectureID = body.LectureID;
                const Type = body.Type;
                const foundlecture = body.foundlecture;

                console.log({ foundlecture });

                if (foundlecture && foundlecture.Type === "lecture") {

                    const dest = path.join(__dirname, '..', '..', '..', '..', '..', '..', 'Coursera',
                        `${CourseID}`, `${ModuleID}`);
                    const fsexist = fs.existsSync(dest);
                    body.dest = dest;
                    if (!fsexist) {
                        console.log({ dest });
                        console.log({ fsexist });
                        fs.mkdirSync(dest, { recursive: true });
                    }
                    cb(null, dest);

                }
                else {
                    cb(new Error('I don\'t have a clue the Lecture!'));
                }

            }
            else if (req.path === '/AddCurriculumModuleLectureContentExtraResource') {

                const body = req.body;
                const CourseID = body.CourseID;
                const CurriculumID = body.CurriculumID;
                const ModuleID = body.ModuleID;
                const LectureID = body.LectureID;
                const foundlecture = body.foundlecture;

                if (foundlecture && foundlecture.Type === "lecture") {

                    const dest = path.join(__dirname, '..', '..', '..', '..', '..', '..', 'Coursera_Extra_Resources',
                        `${CourseID}`, `${ModuleID}`, `${LectureID}`);
                    const fsexist = fs.existsSync(dest);
                    body.dest = dest;

                    if (!fsexist) {
                        console.log({ dest });
                        console.log({ fsexist });
                        fs.mkdirSync(dest, { recursive: true });
                    }
                    cb(null, dest);

                }
                else {

                    cb(new Error('I don\'t have a clue the Lecture!'));

                }
            }
            else {
                throw new Error();
            }

        } catch (e) {
            req.body = null;
            cb(new Error('I don\'t have a clue!'));
        }

    },

    filename: async function (req, file, cb) {

        try {

            const body = req.body;
            const CourseID = body.CourseID;
            const CurriculumID = body.CurriculumID;
            const ModuleID = body.ModuleID;
            const LectureID = body.LectureID;
            const foundlecture = body.foundlecture;
            body.originalname = file.originalname;

            if (req.path === '/AddCurriculumModuleLectureContent') {
                if (foundlecture && foundlecture.Type === "lecture") {

                    cb(null, foundlecture.LectureID.toString());
                }
                else {

                    cb(null, false);
                    cb(new Error('I don\'t have a clue the Lecture!'));

                }
            }
            else if (req.path === '/AddCurriculumModuleLectureContentExtraResource') {

                if (foundlecture && foundlecture.Type === "lecture") {

                    if (foundlecture.Extra_Resource.length <= 0) {

                        body.Extra_Resource_ID = DEFAULT_EXTRA_RESOURCE_NUMBER;

                        cb(null, DEFAULT_EXTRA_RESOURCE_NUMBER.toString());
                    }
                    else if (foundlecture.Extra_Resource.length > 0) {
                        console.log(foundlecture.Extra_Resource);

                        const found_Extra_Resource_ID = foundlecture.Extra_Resource.reduce((row, nextrow) => {
                            if (row.Extra_Resource_ID > nextrow.Extra_Resource_ID) {
                                return row;
                            }
                            else {
                                return nextrow;
                            }
                        });

                        console.log({ found_Extra_Resource_ID });
                        if (found_Extra_Resource_ID) {

                            body.Extra_Resource_ID = found_Extra_Resource_ID.Extra_Resource_ID + 1;

                            cb(null, body.Extra_Resource_ID.toString());

                        }
                        else {
                            cb(null, false);
                            cb(new Error('I don\'t have a clue!'));
                        }

                    }
                    else {
                        cb(null, false);
                        cb(new Error('I don\'t have a clue!'));

                    }

                }
                else {

                    cb(null, false);
                    cb(new Error('I don\'t have a clue!'));

                }
            }

        }
        catch (e) {
            cb(null, false);
            cb(new Error('I don\'t have a clue!'));
        }
    }

});

const fileFilter = async (req, file, cb) => {

    try {

        const path = req.path;
        const body = req.body;
        const CourseID = parseInt(body.CourseID);
        const CurriculumID = parseInt(body.CurriculumID);
        const ModuleID = parseInt(body.ModuleID);
        const LectureID = JSON.parse(body.LectureID);

        if (path === '/AddCurriculumModuleLectureContent') {

            const Type = body.Type;
            const coursedestination = await existsCourseWithId(CourseID);


            if (coursedestination) {

                const newobj = Object.assign({}, {
                    CourseID: coursedestination.CourseID
                });

                var Curriculumdestination = await getAllCurriculumContent(newobj);
                Curriculumdestination = Object.assign({ ...Curriculumdestination.response }, {});

                const foundmodule = Curriculumdestination[0].Modules.find((row, index) => {
                    if (row.ModuleID === ModuleID) {
                        return row;
                    }
                    else {
                        return null;
                    }
                });

                if (foundmodule) {

                    const foundlecture = foundmodule.Lectures.find((row, index) => {
                        if (row.LectureID === LectureID) {
                            return row;
                        }
                        else {
                            return null;
                        }
                    });

                    if (foundlecture && foundlecture.Type === "lecture"
                        && (foundlecture.Content_Type === "")) {

                        if (Type === "Video_Content") {

                            var pattern = /video*/;
                            if (file.mimetype.match(pattern)) {

                                body.foundlecture = foundlecture;
                                body.CourseID = coursedestination.CourseID;
                                body.CurriculumID = Curriculumdestination[0].CurriculumID;
                                body.ModuleID = foundmodule.ModuleID;
                                body.LectureID = foundlecture.LectureID;
                                body.Type = Type;
                                cb(null, true);

                            }
                            else {

                                body.foundlecture = null;
                                body.CourseID = 0;
                                body.CurriculumID = 0;
                                body.ModuleID = 0;
                                body.LectureID = 0;
                                body.Type = "";
                                cb(null, false);
                                cb(new Error('Wrong File Type only Videos are allowed!'))

                            }

                        }
                        else if (Type === "Resource_Content") {
                            if (file.mimetype === "application/pdf") {
                                body.foundlecture = foundlecture;
                                body.CourseID = coursedestination.CourseID;
                                body.CurriculumID = Curriculumdestination[0].CurriculumID;
                                body.ModuleID = foundmodule.ModuleID;
                                body.LectureID = foundlecture.LectureID;
                                body.Type = Type;
                                cb(null, true);
                            }
                            else {
                                body.foundlecture = null;
                                body.CourseID = 0;
                                body.CurriculumID = 0;
                                body.ModuleID = 0;
                                body.LectureID = 0;
                                body.Type = "";
                                cb(null, false);
                                cb(new Error('Wrong File Type only PDf are allowed!'))
                            }
                        }
                        else {
                            cb(null, false);
                            cb(new Error('I don\'t have a clue the image you provide is Not Accepted!'));
                        }

                    }
                    else if (foundlecture && foundlecture.Type === "lecture" &&
                        (foundlecture.Content_Type !== "")) {

                        var video_pattern = /video*/;
                        var document_pattern = /application*/;

                        if (Type === "Video_Content") {

                            const mimetype = file.mimetype.split("/");

                            const find_file_type = PERMITED_VIDEO_FILES.find((row, index) => {
                                if (mimetype[1] === row) {
                                    return row;
                                }
                                else {
                                    return null;
                                }
                            });

                            if (find_file_type) {
                                body.foundlecture = foundlecture;
                                body.CourseID = coursedestination.CourseID;
                                body.CurriculumID = Curriculumdestination[0].CurriculumID;
                                body.ModuleID = foundmodule.ModuleID;
                                body.LectureID = foundlecture.LectureID;
                                body.Type = Type;
                                cb(null, true);
                            }
                            else {
                                body.foundlecture = null;
                                body.CourseID = 0;
                                body.CurriculumID = 0;
                                body.ModuleID = 0;
                                body.LectureID = 0;
                                body.Type = "";
                                cb(null, false);
                                cb(new Error('Wrong File Type!'))
                            }

                        }
                        else if (Type === "Resource_Content") {

                            const mimetype = file.mimetype.split("/");

                            const find_file_type = PERMITED_DOCUMENTS_FILES.find((row, index) => {
                                if (mimetype[1] === row) {
                                    return row;
                                }
                                else {
                                    return null;
                                }
                            });

                            if (find_file_type) {
                                body.foundlecture = foundlecture;
                                body.CourseID = coursedestination.CourseID;
                                body.CurriculumID = Curriculumdestination[0].CurriculumID;
                                body.ModuleID = foundmodule.ModuleID;
                                body.LectureID = foundlecture.LectureID;
                                body.Type = Type;
                                cb(null, true);
                            }
                            else {
                                body.foundlecture = null;
                                body.CourseID = 0;
                                body.CurriculumID = 0;
                                body.ModuleID = 0;
                                body.LectureID = 0;
                                body.Type = "";
                                cb(null, false);
                                cb(new Error('Wrong File!'))
                            }

                        }
                        else {
                            console.log("error Resource_Content");
                            cb(new Error('I don\'t have a Wrong Type!'));
                        }

                    }
                    else {
                        cb(new Error('I don\'t have a clue the Lecture filter!'));
                    }

                }
                else {
                    cb(new Error('I don\'t have a clue the Module!'));
                }

            }
            else {
                cb(new Error('I don\'t have a clue the Course!'));
            }

        }
        else if (path === '/AddCurriculumModuleLectureContentExtraResource') {

            const coursedestination = await existsCourseWithId(CourseID);

            if (coursedestination) {

                const newobj = Object.assign({}, {
                    CourseID: coursedestination.CourseID
                });

                var Curriculumdestination = await getAllCurriculumContent(newobj);

                Curriculumdestination = Object.assign({ ...Curriculumdestination.response }, {});

                const foundmodule = Curriculumdestination[0].Modules.find((row, index) => {
                    if (row.ModuleID === ModuleID) {
                        return row;
                    }
                    else {
                        return null;
                    }
                });

                if (foundmodule) {

                    const foundlecture = foundmodule.Lectures.find((row, index) => {
                        if (row.LectureID === LectureID) {
                            return row;
                        }
                        else {
                            return null;
                        }
                    });

                    if (foundlecture && foundlecture.Type === "lecture") {

                        const mimetype = file.mimetype.split("/");

                        const find_file_type = PERMITED_RESOURCE_DOCUMENTS_FILES.find((row, index) => {
                            if (mimetype[1] === row) {
                                return row;
                            }
                            else {
                                return null;
                            }
                        });

                        if (find_file_type) {

                            body.foundlecture = foundlecture;
                            body.CourseID = coursedestination.CourseID;
                            body.CurriculumID = Curriculumdestination[0].CurriculumID;
                            body.ModuleID = foundmodule.ModuleID;
                            body.LectureID = foundlecture.LectureID;
                            cb(null, true);

                        }
                        else {

                            cb(null, false);
                            cb(new Error('I don\'t have a clue the Extra Resources you provide is Not Accepted!'));

                        }

                    }
                    else {

                        cb(new Error('I don\'t have a clue the Lecture filter!'));

                    }

                }
                else {

                    cb(new Error('I don\'t have a clue the Module!'));

                }

            }
            else {

                cb(new Error('I don\'t have a clue the Course!'));

            }

        }
        else {

            cb(null, false);
            cb(new Error('I don\'t have a clue!'));

        }

    } catch (error) {

    }

};

const upload = multer({ storage: storage, fileFilter });

const NewCurriculumRouter = express.Router();

NewCurriculumRouter.use("/graphql/curriculum", graphqlHTTP({ schema: schema, graphiql: true }));
NewCurriculumRouter.use(upload.single('NewFile'));

NewCurriculumRouter.post("/AddNewCurriculumItem", httpAddNewCurriculumModuleItem);
NewCurriculumRouter.post("/EditCurriculumModuleItem", httpEditCurriculumModuleItem);
NewCurriculumRouter.post("/EditCurriculumModuleIndex", httpEditCurriculumModuleIndex);
NewCurriculumRouter.post("/AddNewCurriculumModuleLectureItem", httpAddNewCurriculumModuleLectureItem);
NewCurriculumRouter.post("/EditCurriculumModuleLectureItem", httpEditCurriculumModuleLectureItem);
NewCurriculumRouter.post("/EditCurriculumModuleLectureIndex", httpEditCurriculumModuleLectureIndex);
NewCurriculumRouter.post("/AddCurriculumModuleLectureContent", httpAddCurriculumModuleLectureContent);
NewCurriculumRouter.get("/StreamCurriculumModuleLectureContent/:CourseID/:CurriculumID/:ModuleID/:LectureID", httpStreamCurriculumModuleLectureContent);
NewCurriculumRouter.post("/StreamCurriculumModuleLectureContent", httpStreamCurriculumModuleLectureContent);

NewCurriculumRouter.post("/AddCurriculumModuleLectureContentExtraResource", httpAddCurriculumModuleLectureContentExtraResource);
NewCurriculumRouter.post("/DeleteCurriculumModuleLectureContentExtraResource", httpDeleteCurriculumModuleLectureContentExtraResource);

NewCurriculumRouter.post("/AddNewCurriculumModuleQuestionItem", httpAddNewCurriculumModuleQuestionItem);
NewCurriculumRouter.post("/EdiCurriculumModuleQuestionItem", httpEditCurriculumModuleQuestionItem);
NewCurriculumRouter.post("/EditNewCurriculumModuleQuestionItemContent", httpEditNewCurriculumModuleQuestionItemContent);

module.exports = NewCurriculumRouter;