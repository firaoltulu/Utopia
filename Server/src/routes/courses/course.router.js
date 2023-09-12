const fs = require('fs');
var path = require('path');
const express = require("express");
var { graphqlHTTP } = require('express-graphql');
const multer = require('multer');

const schema = require("../../scheme/coursescheme");

const { existsCourseWithId } = require("../../models/Course.model");

const {
    httpAddNewCourse,
    httpGetAllCourses,
    httpEditCourse,
    httpEditCourseContent,
    httpDeleteCourse,
    httpStreamCourseCover
} = require("./course.controller");

const PERMITED_IMAGE_FILES = ["jpg", "jpeg", "gif", "png"];

const storage = multer.diskStorage({

    destination: async function (req, file, cb) {

        try {
            const loc_path = req.path;

            if (loc_path === '/EditCourseContent') {

                const body = req.body;
                const CourseID = body.CourseID;
                const dest = path.join(__dirname, '..', '..', '..', '..', '..', '..', 'Dummy_Coursera_Course_Images', `${CourseID}`, `${body.Which}`);

                const fsexist = fs.existsSync(dest);

                if (!fsexist) {
                    fs.mkdirSync(dest, { recursive: true });
                }
                body.dest = dest;
                cb(null, dest);
            }
            else {
                cb(null, false);
            }
        } catch (error) {

            console.log("Error occur in the destination");

        }
    },

    filename: async function (req, file, cb) {

        try {

            const loc_path = req.path;
            if (loc_path === '/EditCourseContent') {

                const body = req.body;
                const Which = body.Which;

                if (Which !== "") {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                    const filename = file.fieldname + '-' + uniqueSuffix;
                    body.filename = filename;
                    cb(null, filename);
                }
                else {
                    cb(null, false);
                }

            }
            else {

                cb(null, false);

            }

        }
        catch (error) {
            cb(null, false);
        }

    }

});

const fileFilter = async (req, file, cb) => {

    try {

        const body = req.body;
        const loc_path = req.path;

        if (loc_path === '/EditCourseContent') {

            const Which = body.Which;
            const CourseID = body.CourseID;

            if (CourseID > 0) {

                const course = await existsCourseWithId(CourseID);

                if (course) {

                    if (Which !== "") {

                        body.CourseID = course.CourseID;

                        const mimetype = file.mimetype.split("/");

                        if (file !== null) {

                            const find_file_type = PERMITED_IMAGE_FILES.find((row, index) => {
                                if (mimetype[1] === row) {
                                    return row;
                                }
                                else {
                                    return null;
                                }
                            });

                            if (find_file_type) {

                                if (Which === "Image1") {
                                    body.Image1 = file;
                                    cb(null, true);
                                }
                                else if (Which === "Image2") {
                                    body.Image2 = file;
                                    cb(null, true);
                                }
                                else if (Which === "Image3") {
                                    body.Image3 = file;
                                    cb(null, true);
                                }
                                else if (Which === "Image4") {
                                    body.Image4 = file;
                                    cb(null, true);
                                }
                                else {
                                    cb(null, false);
                                    body.Image1 = null;
                                    body.Image2 = null;
                                    body.Image3 = null;
                                    body.Image4 = null;
                                }
                            }

                        }
                        else {
                            cb(null, false);
                        }
                    }
                    else {
                        cb(null, false);
                    }

                }
                else {
                    cb(null, false);
                    cb(new Error("Course with ID not Found"));
                }

            }
            else {
                cb(null, false);
            }

        }
        else {
            console.log("error return false");
            cb(null, false);
        }

    } catch (error) { }

};

const upload = multer({ storage: storage, fileFilter });
const NewCourseRouter = express.Router();

NewCourseRouter.use("/graphql/courses", graphqlHTTP({ schema: schema, graphiql: true }))
NewCourseRouter.use(upload.single('NewImage'));

NewCourseRouter.post("/AddNewCourse", httpAddNewCourse);
NewCourseRouter.get("/GetAllCourses", httpGetAllCourses);
NewCourseRouter.post("/EditCourses", httpEditCourse);
NewCourseRouter.post("/EditCourseContent", httpEditCourseContent);
NewCourseRouter.delete("/DeleteCourse/:CourseID", httpDeleteCourse);
NewCourseRouter.get("/StreamCourseCover/:ImageID", httpStreamCourseCover);
// NewCourseRouter.delete("/:id", httpDeleteAuthorization);

module.exports = NewCourseRouter;



