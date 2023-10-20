const fs = require("fs");
const path = require("path");
const ffmpeg = require('fluent-ffmpeg');
// var AWS = require('aws-sdk');
const S3 = require('aws-sdk/clients/s3');
const { Readable } = require('stream');

// const intoStream = require('into-stream');

const streamBuffers = require('stream-buffers');

const {
    existsCourseWithId,
    EditCourseById,
} = require("../../models/Course.model");

const {
    getAllLanguage,
    existsLanguageWithId
} = require("../../models/Language.model");

const {
    existsUploadWithId,
    AddNewUpload,
    getAllUpload,
    EditUploadById,
    AbortuploadById
} = require("../../models/Upload.model");

const {
    AddNewCurriculumModules, getAllCurriculumContent,
    EditCurriculumitem, AddNewCurriculumModuleLecture,
    EditCurriculumModuleLectureItem,
    EditCurriculumModuleLectureIndex,
    AddCurriculumModuleQuestionItem,
    EditCurriculumModuleQuestionItem } = require("../../models/child/Curriculum.model");
const { type } = require("os");


// const { response } = require("express");

// const { setTokenCookie } =require("../../lib/cookies");
// const { verifyToken } = require("../../lib/verifytoken");
// const jwt= require("jsonwebtoken");

const bucketName = "uthiopia";
const aws_region = process.env.AWS_BUCKET_REGION;
const aws_access_key = process.env.AWS_ACCESS_KEY;
const aws_secret_key = process.env.AWS_SECRET_KEY;

const region = "us-east-1";
const accessKeyId = "AKIASN6GHXODWDXP6AHJ";
const secretAccessKey = "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";

// AWS.config.update({ region: aws_region });
// const S3 = require('aws-sdk/clients/s3')

// const bucketName = "uthiopia";
// const region = "us-east-1";
// const accessKeyId = "AKIASN6GHXODWDXP6AHJ";
// const secretAccessKey = "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";


async function httpAddNewCurriculumModuleItem(req, res) {

    // const launch = req.file;
    const body = req.body;

    try {

        const Title = body.Title;
        const Objective = body.Objective;
        const CourseID = parseInt(body.CourseID);
        const LanguageID = parseInt(body.LanguageID);

        const course = await existsCourseWithId(CourseID);
        const language = await existsLanguageWithId(LanguageID);

        if (!Title || !Objective || !CourseID || !course || !language) {
            throw new Error("Missing required property are not provided");
        }
        else {

            const newobj = Object.assign({}, {
                CourseID: CourseID,
                LanguageID: language.LanguageID,
                Objective: Objective,
                Title: Title,
                course: course,
                language: language
            });

            const response = await AddNewCurriculumModules(newobj);

            if (response.done) {

                return res.status(200).json({ done: true });
            }
            else {
                return res.status(400).json({ done: false });
            }

        }

    } catch (e) {

        console.log("error has happend");
        return res.status(400).json({ done: false });

    }

};

async function httpGetAllCurriculumItem(req, res) {
    const body = req.body;

    try {
        const CourseID = parseInt(body.CourseID);
        const { skip, limit } = req.query;

        const languages = await getAllCourse(skip, limit);

        return res.status(200).json(languages);


    } catch (e) {

    }
};

async function httpEditCurriculumModuleItem(req, res) {

    try {
        const body = req.body;
        const CourseID = parseInt(body.CourseID);
        const ModuleID = parseInt(body.ModuleID);
        const CurriculumID = parseInt(body.CurriculumID);
        const Objective = body.Objective;
        const Title = body.Title;

        if (Objective !== "" && Title !== "" && CourseID && ModuleID && CurriculumID) {

            const course = await existsCourseWithId(CourseID);
            // const language = await existsLanguageWithId(LanguageID);

            if (course) {

                const newobj = Object.assign({}, {
                    CourseID: course.CourseID
                });

                var Curriculumdestination = await getAllCurriculumContent(newobj);

                Curriculumdestination = Curriculumdestination.response;

                const foundCurriculum = Curriculumdestination.find((row, index) => {
                    if (row.CurriculumID === CurriculumID) {
                        return row;
                    }
                    else {
                        return null;
                    }
                });

                if (foundCurriculum) {

                    const newobj = Object.assign({}, {
                        Title: Title,
                        Objective: Objective,
                        CurriculumID: foundCurriculum.CurriculumID,
                        CourseID: course.CourseID,
                        ModuleID: ModuleID,
                        Edit: "title"
                    });

                    const editcurriculum = await EditCurriculumitem(newobj);

                    if (editcurriculum.done) {
                        const allcurr = await getAllCurriculumContent({ CourseID: course.CourseID, });
                        return res.status(200).json({ done: true, Curriculum: allcurr.response });

                    }
                    else {
                        return res.status(400).json({ done: false, message: "Error Try again" });
                    }


                }
                else {
                    return res.status(400).json({ done: false, message: "language and course with the id havnt been found..." });
                }
            }
            else {
                return res.status(400).json({ done: false, message: "language and course with the id havnt been found..." });
            }
        }
        else {
            return res.status(400).json({ done: false, message: "Should not be Null..." });
        }

    } catch (e) {
        return res.status(400).json({ done: false, message: "error happen try again..." });
    }

};

async function httpEditCurriculumModuleIndex(req, res) {

    try {
        const body = req.body;
        const CourseID = parseInt(body.CourseID);
        const CurriculumID = parseInt(body.CurriculumID);
        const Module = JSON.parse(body.Module);

        if (Module.length > 0 && CourseID && CurriculumID) {

            const course = await existsCourseWithId(CourseID);
            // const language = await existsLanguageWithId(LanguageID);

            if (course) {

                const newobj = Object.assign({}, {
                    CourseID: course.CourseID
                });

                var Curriculumdestination = await getAllCurriculumContent(newobj);

                Curriculumdestination = Curriculumdestination.response;

                const foundCurriculum = Curriculumdestination.find((row, index) => {
                    if (row.CurriculumID === CurriculumID) {
                        return row;
                    }
                    else {
                        return null;
                    }
                });

                if (foundCurriculum) {

                    const newobj = Object.assign({}, {
                        Module: Module,
                        CourseID: course.CourseID,
                        CurriculumID: foundCurriculum.CurriculumID,
                        Edit: "index"
                    });

                    const editcurriculum = await EditCurriculumitem(newobj);

                    if (editcurriculum.done) {
                        const allcurr = await getAllCurriculumContent({ CourseID: course.CourseID, });
                        return res.status(200).json({ done: true, Curriculum: allcurr.response });
                    }
                    else {
                        return res.status(400).json({ done: false, message: "Error Try again" });
                    }

                }
                else {
                    return res.status(400).json({ done: false, message: "Error Try again" });
                }
            }
            else {
                return res.status(400).json({ done: false, message: "language and course with the id havnt been found..." });
            }
        }
        else {
            return res.status(400).json({ done: false, message: "Should not be Null..." });
        }

    } catch (e) {
        return res.status(400).json({ done: false, message: "error happen try again..." });
    }

};

async function httpAddNewCurriculumModuleLectureItem(req, res) {

    // const launch = req.file;
    const body = req.body;
    try {

        const Title = body.Title;
        const Description = body.Description;
        const Type = body.Type;
        const CourseID = parseInt(body.CourseID);
        const CurriculumID = parseInt(body.CurriculumID);
        const ModuleID = parseInt(body.ModuleID);

        const course = await existsCourseWithId(CourseID);

        if (Title !== "" && Description !== "" && CourseID !== ""
            && CurriculumID !== "" && ModuleID !== ""
            && course !== null && (Type == "lecture" || Type == "quiz")) {

            const newobj = Object.assign({}, {
                CourseID: course.CourseID,
                Title: Title,
                Description: Description,
                Type: Type,
                CurriculumID: CurriculumID,
                ModuleID: ModuleID,
            });

            const response = await AddNewCurriculumModuleLecture(newobj);

            if (response.done) {
                const allcurr = await getAllCurriculumContent({ CourseID: course.CourseID, });
                return res.status(200).json({ done: true, Curriculum: allcurr.response });
            }
            else {
                return res.status(400).json({ done: false });
            }
        }
        else {
            throw new Error("Missing required property are not provided");
        }

    } catch (e) {

        console.log("error has happend e = " + e);
        return res.status(400).json({ done: false });

    }

};

async function httpEditCurriculumModuleLectureItem(req, res) {

    try {
        const body = req.body;

        const CourseID = parseInt(body.CourseID);
        const CurriculumID = parseInt(body.CurriculumID);
        const ModuleID = parseInt(body.ModuleID);
        const LectureID = parseInt(body.LectureID);

        const Discription = body.Discription;
        const Title = body.Title;
        const Content = body.Content;
        const Content_Type = body.Content_Type;
        const Resource_Content = body.Resource_Content;
        const Resource_Content_Type = body.Resource_Content_Type;

        if (CourseID && CurriculumID
            && ModuleID && LectureID) {

            const course = await existsCourseWithId(CourseID);

            if (course) {

                const newobj = Object.assign({}, {

                    CourseID: course.CourseID,
                    CurriculumID: CurriculumID,
                    ModuleID: ModuleID,
                    LectureID: LectureID,

                    Discription: Discription,
                    Title: Title,
                    Content: Content,
                    Content_Type: Content_Type,
                    Resource_Content: Resource_Content,
                    Resource_Content_Type: Resource_Content_Type
                });


                const editcurriculum = await EditCurriculumModuleLectureItem(newobj);

                if (editcurriculum.done) {
                    const allcurr = await getAllCurriculumContent({ CourseID: course.CourseID, });
                    return res.status(200).json({ done: true, Curriculum: allcurr.response });

                }
                else {
                    return res.status(400).json({ done: false, message: "Error Try again" });
                }

            }
            else {
                return res.status(400).json({ done: false, message: "language and course with the id havnt been found..." });
            }
        }
        else {
            return res.status(400).json({ done: false, message: "Should not be Null..." });
        }

    } catch (e) {
        return res.status(400).json({ done: false, message: "error happen try again..." });
    }

};

async function httpEditCurriculumModuleLectureIndex(req, res) {

    try {

        const body = req.body;
        const CourseID = parseInt(body.CourseID);
        const CurriculumID = parseInt(body.CurriculumID);
        const ModuleID = parseInt(body.ModuleID);
        const Lecture = JSON.parse(body.Lecture);

        if (Lecture.length > 0 && CourseID
            && CurriculumID && ModuleID) {

            const course = await existsCourseWithId(CourseID);

            const findduplication = Lecture.some((element, index) => {
                return Lecture.indexOf(element) !== index
            });

            if (course && !findduplication) {

                const newobj = Object.assign({}, {
                    Lecture: Lecture,
                    CourseID: course.CourseID,
                    CurriculumID: CurriculumID,
                    ModuleID: ModuleID,
                });

                const editcurriculum = await EditCurriculumModuleLectureIndex(newobj);

                if (editcurriculum.done) {
                    const allcurr = await getAllCurriculumContent({ CourseID: course.CourseID, });
                    return res.status(200).json({ done: true, Curriculum: allcurr.response });

                }
                else {
                    return res.status(400).json({ done: false, message: "Error Try again" });
                }

            }
            else {
                return res.status(400).json({ done: false, message: "course with the id havnt been found Or duplicated input..." });
            }
        }
        else {
            return res.status(400).json({ done: false, message: "Should not be Null..." });
        }

    } catch (e) {
        return res.status(400).json({ done: false, message: "error happen try again..." });
    }

};

function bufferToStream(binary) {
    return new Readable({
        read() {
            this.push(binary);
            this.push(null);
        }
    });
}

async function createthumbnail(course_awss3 = null, UploadID = -1, NewFile = null) {

    if (UploadID !== -1 && course_awss3 !== null && NewFile !== null) {

        try {

            const readff = bufferToStream(NewFile.buffer);

            console.log({ readff });

            // const myReadableStreamBuffer = new streamBuffers.ReadableStreamBuffer({
            //     frequency: 10,   // in milliseconds.
            //     chunkSize: 2048  // in bytes.
            // });

            // console.log({ readstt });

            // const downloadParams = {
            //     Key: `Lihiq/${UploadID}`,
            //     Bucket: bucketName
            // };

            // const readStream = await course_awss3.getObject(downloadParams).createReadStream();

            // console.log({ readStream });

            const thumbnaildest = path.join(__dirname, '..', '..', '..', '..', '..', '..',
                'Lihiq_Thumbnail', `${UploadID}`);

            console.log({ NewFile });

            fs.mkdirSync(thumbnaildest, { recursive: true });

            ffmpeg(readff).on('filenames', (filenames) => {
                // console.log({ filenames });
                // console.log({ thumbnaildest });
            }).on('end', () => {
                console.log("End of ffmpeg");
            }).on('error', (err) => {
                console.log({ err });
                return res.status(400).json({ done: false, message: "Error Try again" });
            }).screenshot({
                count: 1,
                folder: thumbnaildest,
                size: "1920x1080",
                filename: UploadID.toString(),
            });

        } catch (error) {
            console.log("ERROR creat a thumbnail failed");
        }

    }
    else {

    }

}

async function httpAddCurriculumModuleLectureContent(req, res) {

    try {

        const NewFile = req.file;
        const body = req.body;
        const CourseID = body.CourseID;
        const CurriculumID = body.CurriculumID;
        const ModuleID = body.ModuleID;
        const LectureID = body.LectureID;
        const Type = body.Type;
        const originalname = body.originalname;
        const foundlecture = body.foundlecture;
        var dest = body.dest;


        if (foundlecture && foundlecture.Type === "lecture" &&
            (foundlecture.Content_Type === "" || foundlecture.Content_Type === NewFile.mimetype)) {

            const course_awss3 = new S3({
                region,
                accessKeyId,
                secretAccessKey
            });

            if (course_awss3) {

                const upload = await AddNewUpload({ Title: NewFile.originalname });

                if (upload.done) {
                    // console.log({ upload });

                    const uploadParams = {
                        Bucket: bucketName,
                        Body: NewFile.buffer,
                        Key: `Lihiq/${upload.response.UploadID}`//`Lihiq/${CourseID}/${CurriculumID}/${ModuleID}/${LectureID}`
                    };

                    const awsresponse = course_awss3.upload(uploadParams,
                        (err, data) => {
                            if (err) {
                                console.error(err);
                                return res.status(500).send('Error uploading file');
                            }
                            else {

                                if (Type === "Video_Content") {
                                    // createthumbnail(course_awss3, upload.response.UploadID, NewFile);
                                    // dest = path.join(dest, `${LectureID}`);
                                }

                                return data;
                            }
                        }
                    );

                    if (awsresponse) {

                        const newobj = Object.assign({}, {
                            CourseID: CourseID,
                            ModuleID: ModuleID,
                            LectureID: foundlecture.LectureID,
                            CurriculumID: CurriculumID,
                            Content_Type: NewFile.mimetype,
                            Content: NewFile.originalname,
                            AWS_S3_KEY: upload.response.UploadID
                        });

                        const editcurriculum = await EditCurriculumModuleLectureItem(newobj);

                        if (editcurriculum.done) {
                            const allcurr = await getAllCurriculumContent({ CourseID: CourseID, });

                            const edit = await EditUploadById(foundlecture.AWS_S3_KEY, { Active: false })

                            return res.status(200).json({ done: true, Curriculum: allcurr.response });
                        }
                        else {
                            return res.status(400).json({ done: false, message: "Error Try again" });
                        }

                    }


                } else {
                    return res.status(400).json({ error: "Upload Error Fail ID", done: false });
                }

            }

        }
        else {
            return res.status(400).json({ error: "NO Lecture exist in this With ID", done: false });
        }

    } catch (error) {
        return res.status(400).json({
            error: "Missing required property are not provided",
            done: false
        });
    }
};

async function httpStreamCurriculumModuleLectureContent(req, res) {

    try {

        const body = req.body;
        // var CourseID = parseInt(body.CourseID);
        // var CurriculumID = parseInt(body.CurriculumID);
        // var ModuleID = parseInt(body.ModuleID);
        // var LectureID = parseInt(body.LectureID);


        const CourseID = Number(req.params.CourseID);
        const CurriculumID = Number(req.params.CurriculumID);
        const ModuleID = Number(req.params.ModuleID);
        const LectureID = Number(req.params.LectureID);

        if (CourseID > 0 && CurriculumID > 0 && ModuleID > 0 && LectureID > 0) {

            const coursedestination = await existsCourseWithId(CourseID);

            if (coursedestination) {

                const newobj = Object.assign({}, {
                    CourseID: coursedestination.CourseID
                });

                var Curriculumdestination = await getAllCurriculumContent(newobj);

                Curriculumdestination = Curriculumdestination.response;

                const foundCurriculum = Curriculumdestination.find((row, index) => {
                    if (row.CurriculumID === CurriculumID) {
                        return row;
                    }
                    else {
                        return null;
                    }
                });

                if (foundCurriculum) {

                    const foundmodule = foundCurriculum.Modules.find((row, index) => {
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
                            const dest = path.join(__dirname, '..', '..', '..', '..', '..', '..', 'Coursera_Thumbnail',
                                `${coursedestination.CourseID}`, `${foundCurriculum.CurriculumID}`, `${foundmodule.ModuleID}`, `${foundlecture.LectureID}.png`);

                            // const range = req.headers.range;
                            // console.log({ dest });
                            // // if (!range) {
                            //     res.status(400).send("Requires Range header");
                            // }
                            // else {
                            // console.log({ range });
                            const videoSize = fs.statSync(dest).size;
                            // console.log({ videoSize });
                            const CHUNK_SIZE = 10 ** 6;
                            // const start = Number(range.replace(/\D/g, ""));
                            // const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
                            // const contentLength = end - start + 1;

                            // console.log({ CHUNK_SIZE });

                            // console.log({ start });
                            // console.log({ end });
                            // console.log({ contentLength });

                            const headers = {
                                // "Content-Range": `bytes ${start}-${end}/${videoSize}`,
                                "Accept-Ranges": "bytes",
                                "Content-Length": videoSize,//contentLength,
                                "Content-Type": foundlecture.Content_Type,
                            };
                            res.writeHead(206, headers);
                            const videoStream = fs.createReadStream(dest);//, { start, end });
                            videoStream.pipe(res);
                            // return res.status(200).json({ done: true });
                            // }

                        }
                        else if (foundlecture && foundlecture.Type === "quiz") {
                            return res.status(200).json({ done: true });
                        }
                        else {
                            return res.status(400).json({ done: false, message: "Error Wrong lecture Try again" });
                        }

                    }
                    else {
                        return res.status(400).json({ done: false, message: "Error Wrong Module Try again" });
                    }

                }
                else {
                    return res.status(400).json({ done: false, message: "Error Wrong Module Try again" });
                }
            }
            else {
                return res.status(400).json({ error: "NO Lecture exist in this With ID", done: false });
            }
        }
        else {
            return res.status(400).json({
                error: "Missing required property are not provided",
                done: false
            });
        }
    } catch (error) {
        return res.status(400).json({
            error: "Missing required property are not provided",
            done: false
        });
    }
};

async function httpStreamCurriculumModuleLectureVideoContent(req, res) {

    try {

        const body = req.body;
        var CourseID = parseInt(body.CourseID || req.headers.CourseID);
        var CurriculumID = parseInt(body.CurriculumID || req.headers.CurriculumID);
        var ModuleID = parseInt(body.ModuleID || req.headers.ModuleID);
        var LectureID = parseInt(body.LectureID || req.headers.LectureID);


        // const CourseID = Number(req.params.CourseID);
        // const CurriculumID = Number(req.params.CurriculumID);
        // const ModuleID = Number(req.params.ModuleID);
        // const LectureID = Number(req.params.LectureID);

        if (CourseID > 0 && CurriculumID > 0 && ModuleID > 0 && LectureID > 0) {

            const coursedestination = await existsCourseWithId(CourseID);

            if (coursedestination) {

                const newobj = Object.assign({}, {
                    CourseID: coursedestination.CourseID
                });

                var Curriculumdestination = await getAllCurriculumContent(newobj);

                Curriculumdestination = Curriculumdestination.response;

                const foundCurriculum = Curriculumdestination.find((row, index) => {
                    if (row.CurriculumID === CurriculumID) {
                        return row;
                    }
                    else {
                        return null;
                    }
                });

                if (foundCurriculum) {

                    const foundmodule = foundCurriculum.Modules.find((row, index) => {
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

                            const dest = path.join(__dirname, '..', '..', '..', '..', '..', '..', 'Coursera',
                                `${coursedestination.CourseID}`, `${foundCurriculum.CurriculumID}`, `${foundmodule.ModuleID}`, `${foundlecture.LectureID}`);

                            const range = req.headers.range || '';
                            const fsexist = fs.existsSync(dest);

                            if (fsexist) {
                                console.log({ dest });
                                console.log({ fsexist })
                                // console.log({ range });
                                const videoSize = fs.statSync(dest).size;
                                if (!range) {
                                    const headers = {
                                        "Content-Length": videoSize,
                                        "Content-Type": foundlecture.Content_Type,
                                        "CourseID": CourseID,
                                        "CurriculumID": CurriculumID,
                                        "ModuleID": ModuleID,
                                        "LectureID": LectureID
                                    };

                                    console.log({ headers });

                                    res.writeHead(200, headers);
                                    const videoStream = fs.createReadStream(dest);
                                    videoStream.pipe(res);
                                }
                                else {
                                    console.log({ range });

                                    const CHUNK_SIZE = 10 ** 6;
                                    const start = Number(range.replace(/\D/g, ""));
                                    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
                                    const contentLength = end - start + 1;

                                    console.log({ videoSize });
                                    console.log({ CHUNK_SIZE });

                                    console.log({ start });
                                    console.log({ end });
                                    console.log({ contentLength });

                                    const headers = {
                                        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
                                        "Accept-Ranges": "bytes",
                                        "Content-Length": contentLength,
                                        "Content-Type": foundlecture.Content_Type,
                                        "CourseID": CourseID,
                                        "CurriculumID": CurriculumID,
                                        "ModuleID": ModuleID,
                                        "LectureID": LectureID
                                    };

                                    res.writeHead(206, headers);
                                    const videoStream = fs.createReadStream(dest, { start, end });
                                    // console.log({ videoStream });
                                    await videoStream.pipe(res);
                                }
                            }
                            else {
                                return res.status(400).json({ done: false });
                            }

                        }
                        else if (foundlecture && foundlecture.Type === "quiz") {
                            return res.status(200).json({ done: true });
                        }
                        else {
                            return res.status(400).json({ done: false, message: "Error Wrong lecture Try again" });
                        }

                    }
                    else {
                        return res.status(400).json({ done: false, message: "Error Wrong Module Try again" });
                    }

                }
                else {
                    return res.status(400).json({ done: false, message: "Error Wrong Module Try again" });
                }
            }
            else {
                return res.status(400).json({ error: "NO Lecture exist in this With ID", done: false });
            }
        }
        else {
            return res.status(400).json({
                error: "Missing required property are not provided",
                done: false
            });
        }

    } catch (error) {
        return res.status(400).json({
            error: "Missing required property are not provided",
            done: false
        });
    }
};

async function httpAddCurriculumModuleLectureContentExtraResource(req, res) {

    try {

        const NewFile = req.file;
        const body = req.body;
        const CourseID = body.CourseID;
        const CurriculumID = body.CurriculumID;
        const ModuleID = body.ModuleID;
        const LectureID = body.LectureID;
        const Type = body.Type;
        const Extra_Resource_ID = body.Extra_Resource_ID;
        const originalname = body.originalname;
        const foundlecture = body.foundlecture;
        var dest = body.dest;

        if (foundlecture && foundlecture.Type === "lecture") {

            const course_awss3 = new S3({
                region,
                accessKeyId,
                secretAccessKey
            });

            if (course_awss3) {


                const upload = await AddNewUpload({ Title: NewFile.originalname });

                const uploadParams = {
                    Bucket: bucketName,
                    Body: NewFile.buffer,
                    Key: `Lihiq_Extra_Resource/${upload.response.UploadID}`//`Lihiq/${CourseID}/${CurriculumID}/${ModuleID}/${LectureID}`
                };

                const awsresponse = course_awss3.upload(uploadParams,
                    (err, data) => {
                        if (err) {
                            console.error(err);
                            return res.status(500).send('Error uploading file');
                        }
                        else {
                            return data;
                        }
                    }
                );

                if (awsresponse) {

                    const newobj = Object.assign({}, {
                        CourseID: CourseID,
                        ModuleID: ModuleID,
                        LectureID: foundlecture.LectureID,
                        CurriculumID: CurriculumID,
                        Extra_Resource: [{
                            Extra_Resource_AWS_S3_KEY: upload.response.UploadID,
                            Extra_Resource_ID: Extra_Resource_ID,
                            Resource_Content: NewFile.originalname,
                            Resource_Content_type: NewFile.mimetype,
                        }],

                    });

                    const editcurriculum = await EditCurriculumModuleLectureItem(newobj);
                    if (editcurriculum.done) {
                        const allcurr = await getAllCurriculumContent({ CourseID: CourseID, });

                        const edit = await EditUploadById(foundlecture?.AWS_S3_KEY, { Active: false })

                        return res.status(200).json({ done: true, Curriculum: allcurr.response });
                    }
                    else {
                        return res.status(400).json({ done: false, message: "Error Try again" });
                    }
                }



            }



        }
        else {
            return res.status(400).json({ error: "NO Lecture exist in this With ID", done: false });
        }

    } catch (error) {

        return res.status(400).json({
            error: "Missing required property are not provided",
            done: false
        });

    }
};

async function httpDeleteCurriculumModuleLectureContentExtraResource(req, res) {

    const body = req.body;
    try {

        const CourseID = parseInt(body.CourseID);
        const CurriculumID = parseInt(body.CurriculumID);
        const ModuleID = parseInt(body.ModuleID);
        const LectureID = parseInt(body.ModuleID);
        const Extra_Resource_ID = parseInt(body.Extra_Resource_ID);

        const course = await existsCourseWithId(CourseID);

        if (CourseID > 0 && CurriculumID > 0 && ModuleID > 0 && LectureID > 0 && Extra_Resource_ID > 0) {

            const coursedestination = await existsCourseWithId(CourseID);

            if (coursedestination) {

                const newobj = Object.assign({}, {
                    CourseID: coursedestination.CourseID
                });

                var Curriculumdestination = await getAllCurriculumContent(newobj);
                // Curriculumdestination = Object.assign({ ...Curriculumdestination.response }, {});

                Curriculumdestination = Curriculumdestination.response;

                const foundCurriculum = Curriculumdestination.find((row, index) => {
                    if (row.CurriculumID === CurriculumID) {
                        return row;
                    }
                    else {
                        return null;
                    }
                });
                if (foundCurriculum) {

                    const foundmodule = foundCurriculum.Modules.find((row, index) => {
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

                            const foundExtra_resource = foundlecture.Extra_Resource.find((row, index) => {
                                if (row.Extra_Resource_ID === Extra_Resource_ID) {
                                    return row;
                                }
                                else {
                                    return null;
                                }
                            });

                            if (foundExtra_resource) {

                                const dest = path.join(__dirname, '..', '..', '..', '..', '..', '..', 'Coursera_Extra_Resources',
                                    `${CourseID}`, `${CurriculumID}`, `${ModuleID}`, `${LectureID}`, `${foundExtra_resource.Extra_Resource_ID}`);

                                // const fsexist = fs.existsSync(dest);
                                // fs.rm(dest, callback);

                                console.log({ dest });
                                console.log({ foundExtra_resource });

                            }
                            else {
                                return res.status(400).json({ done: false });
                            }

                        }
                        else {

                            return res.status(400).json({ done: false });

                        }

                    }
                    else {

                        return res.status(400).json({ done: false });

                    }
                }
                else {
                    return res.status(400).json({ done: false });
                }

                // const response = await AddNewCurriculumModuleLecture(newobj);
                // if (response.done) {
                //     return res.status(200).json({ done: true });
                // }
                // else {
                //     return res.status(400).json({ done: false });
                // }

            }
            else {
                return res.status(400).json({ done: false });
            }

        }
    } catch (e) {

        console.log("error has happend e = " + e);
        return res.status(400).json({ done: false });

    }

};

async function httpAddNewCurriculumModuleQuestionItem(req, res) {

    try {

        const body = req.body;

        const CourseID = parseInt(body.CourseID);
        const CurriculumID = parseInt(body.CurriculumID);
        const ModuleID = parseInt(body.ModuleID);
        const LectureID = parseInt(body.LectureID);

        const Answer = JSON.parse(body.Answer);
        const Question = body.Question;

        if (CourseID && CurriculumID && ModuleID && LectureID && Answer.length > 1) {

            const errfound = Answer.find((row, index) => {
                if (row.AnswerTitle === "") {
                    return row;
                }
            });

            const errNorightfound = Answer.find((row, index) => {
                if (row.RightAnswer === true) {
                    return row;
                }
            });

            if (!(errfound && errNorightfound)) {


                const course = await existsCourseWithId(CourseID);

                if (course) {

                    const newobj = Object.assign({}, {
                        CourseID: course.CourseID
                    });

                    var Curriculumdestination = await getAllCurriculumContent(newobj);

                    Curriculumdestination = Curriculumdestination.response;

                    const foundCurriculum = Curriculumdestination.find((row, index) => {
                        if (row.CurriculumID === CurriculumID) {
                            return row;
                        }
                        else {
                            return null;
                        }
                    });

                    if (foundCurriculum) {

                        const newobj = Object.assign({}, {

                            CourseID: course.CourseID,
                            CurriculumID: foundCurriculum.CurriculumID,
                            ModuleID: ModuleID,
                            LectureID: LectureID,
                            Question: Question,
                            Answer: Answer,

                        });

                        const editcurriculum = await AddCurriculumModuleQuestionItem(newobj);

                        if (editcurriculum.done) {

                            const allcurr = await getAllCurriculumContent({ CourseID: course.CourseID, });

                            console.log({ allcurr });
                            return res.status(200).json({ done: true, Curriculum: allcurr.response });

                        }
                        else {

                            return res.status(400).json({ done: false, message: "Error Try again" });

                        }

                    }

                }
                else {
                    return res.status(400).json({ done: false, message: "course with the id havnt been found..." });
                }
            }
            else {
                return res.status(400).json({ done: false, message: "error happen try again..." });
            }
        }
        else {
            return res.status(400).json({ done: false, message: "Should not be Null..." });
        }

    } catch (e) {
        return res.status(400).json({ done: false, message: "error happen try again..." });
    }
};

async function httpEditNewCurriculumModuleQuestionItemContent(req, res) {
    try {

        const body = req.body;

        const CourseID = parseInt(body.CourseID);
        const CurriculumID = parseInt(body.CurriculumID);
        const ModuleID = parseInt(body.ModuleID);
        const LectureID = parseInt(body.LectureID);
        const QuestionID = parseInt(body.QuestionID);

        const Answer = JSON.parse(body.Answer);
        const Question = body.Question;

        if (CourseID && CurriculumID && ModuleID && LectureID
            && Answer.length > 1 && QuestionID && Question !== "") {

            const course = await existsCourseWithId(CourseID);

            if (course) {

                const errfound = Answer.find((row, index) => {
                    if (row.AnswerTitle === "") {
                        return row;
                    }
                });

                const errNorightfound = Answer.find((row, index) => {
                    if (row.RightAnswer === true) {
                        return row;
                    }
                });

                if (!(errfound && errNorightfound)) {

                    const newobj = Object.assign({}, {

                        CourseID: course.CourseID,
                        CurriculumID: CurriculumID,
                        ModuleID: ModuleID,
                        LectureID: LectureID,
                        QuestionID: QuestionID,
                        Question: Question,
                        Answer: Answer,

                    });

                    const editcurriculum = await EditCurriculumModuleQuestionItem(newobj);

                    if (editcurriculum.done) {

                        return res.status(200).json({ done: true });

                    }
                    else {

                        return res.status(400).json({ done: false, message: "Error Try again" });

                    }
                }
                else {
                    return res.status(400).json({ done: false, message: "No Right Answer Selected or Answer Cant be Empty..." });
                }


            }
            else {
                return res.status(400).json({ done: false, message: "course with the id havnt been found..." });
            }

        }
        else {
            return res.status(400).json({ done: false, message: "Should not be Null..." });
        }

    } catch (e) {
        return res.status(400).json({ done: false, message: "error happen try again..." });
    }
};

async function httpEditCurriculumModuleQuestionItem(req, res) {

    try {
        const body = req.body;

        const CourseID = parseInt(body.CourseID);
        const CurriculumID = parseInt(body.CurriculumID);
        const ModuleID = parseInt(body.ModuleID);
        const LectureID = parseInt(body.LectureID);

        const Discription = body.Discription;
        const Title = body.Title;


        if (CourseID && CurriculumID
            && ModuleID && LectureID && Title !== "" && Discription !== "") {

            const course = await existsCourseWithId(CourseID);

            // console.log({ course });

            if (course) {

                const newobj = Object.assign({}, {

                    CourseID: course.CourseID,
                    CurriculumID: CurriculumID,
                    ModuleID: ModuleID,
                    LectureID: LectureID,
                    Title: Title,
                    Discription: Discription

                });


                const editcurriculum = await EditCurriculumModuleQuestionItem(newobj);

                if (editcurriculum.done) {
                    const allcurr = await getAllCurriculumContent({ CourseID: course.CourseID, });
                    return res.status(200).json({ done: true, Curriculum: allcurr.response });

                }
                else {
                    return res.status(400).json({ done: false, message: "Error Try again" });
                }

            }
            else {
                return res.status(400).json({ done: false, message: "language and course with the id havnt been found..." });
            }
        }
        else {
            return res.status(400).json({ done: false, message: "Should not be Null..." });
        }

    } catch (e) {
        return res.status(400).json({ done: false, message: "error happen try again..." });
    }

};


// async function httpDeleteCourse(req, res) {

//     const LanguageID = Number(req.params.LanguageID);

//     if (LanguageID > 0) {
//         const language = await existsLanguageWithId(LanguageID);
//         if (language) {

//             const deletelanguage = await AbortLanguageById(language.LanguageID, language);
//             if (deletelanguage.done) {
//                 console.log("deleted successfully");
//                 return res.status(200).json({ done: true });
//             } else {
//                 return res.status(400).json({ done: false });
//             }

//         }
//         else {
//             return res.status(400).json({ done: false, message: "language with the id havnt been found..." });
//         }
//     }
//     else {
//         return res.status(400).json({ done: false, message: "LanguageID should be specified..." });
//     }
// }

// async function httpAssignEmployee(req, res) {
//     const body = req.body;
//     const request = await existsRequestWithId(body.RequestID);
//     // console.log("In the HTTP Assign employee Request Controller");
//     // console.log(body.RequestID);
//     if (request) {
//         const employee = await existsEmployeeWithId(body.AssignedEmployee);
//         if (employee) {
//             const response = await AssignEmployee(employee.employeeid, request.Work_servey);
//             return res.status(201).json(response);
//         }
//         else {
//             return res.status(400).json({
//                 error: "Employee with that ID Doesn't Exist",
//             });
//         }
//     }
//     else {
//         return res.status(400).json({
//             error: "Request With That ID Doesn't Exist",
//         });
//     }
// }

// async function httpAssignedWork(req, res) {
//     const user = req.user;
//     console.log({ user });
//     if (user) {
//         const response = await AssignedWork(user.employeeid);
//         console.log("In the HTTP Assigned Work Request Controller");

//         if (response) {
//             //   let looc = [];
//             //   for (let i = 0; i < response.length; i++) {
//             //     let RequestID = response[i].RequestID;
//             //     let ll = await existsRequestWithId(RequestID);
//             //     let ltt = ll;
//             //     ltt.Workservey = response[i];
//             //     looc.push(ltt);
//             // }
//             // console.log({looc});
//             return res.status(201).json(response);
//         }
//         else {
//             return res.status(200).json({
//                 Message: "No Work Have Been Assigned To You",
//             });
//         }
//     }
//     else {

//     }
// }

// async function httpSubmitServey(req, res) {
//     const launch = req.file;
//     const body = req.body;
//     const user = req.user;
//     if (!body.WorkServeyID) {
//         return res.status(400).json({
//             error: "Missing required property are not provided",
//             done: false
//         });
//     }
//     else {
//         const existworkservey = await existsWorkServeyWithId(body.WorkServeyID);
//         if (existworkservey) {
//             if (user.employeeid === existworkservey.AssignedEmployee) {
//                 let response;
//                 try {
//                     response = await SubmitWorkServey(launch, existworkservey.WorkServeyID);
//                 } catch (error) {
//                     return res.status(400).json({ error: error.Message, done: false });
//                 }
//                 res.status(201).json({ done: true });
//             }
//         }
//         else {
//             return res.status(400).json({ error: "NO WorkServey exist in this id", done: false });
//         }
//     }
// }

// async function DownloadWorkServey(req, res) {
//     // const launch = req.file;
//     const body = req.body;
//     const user = req.user;
//     const WorkServeyID = body.WorkServeyID;

//     if (WorkServeyID) {
//         const WorkServey = await existsWorkServeyWithId(WorkServeyID);
//         if (WorkServey) {
//             const fileName = WorkServey.WorkServey_File_name;
//             console.log({ WorkServey });
//             let ends;

//             switch (WorkServey) {
//                 case 'application/pdf':
//                     ends = ".pdf";
//                     break;
//                 case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
//                     ends = ".docx";
//                     break;
//                 case 'application/msword':
//                     break;
//                 default:
//                     break;

//             }

//             const directoryPath = `D:\\projects\\Project_one\\server\\uploads\\` + fileName;
//             console.log({ directoryPath });
//             try {
//                 res.sendFile(directoryPath, fileName + ends, (err) => {
//                     if (err) {
//                         res.status(500).send({
//                             message: "Could not download the file. " + err,
//                         });
//                     }
//                 });
//             } catch (error) {
//                 return res.status(400).json({ error: "Downloading WorkServey Fails", done: false });
//             }
//             // res.status(200).json({ done: true });
//         }
//     }
// }

// async function  httpVerifyAuthorizationToken(req, res) {
//   const token = req.headers ? req.headers?.cookie : null; 
//   var didToken = token ? token.substr(6) : "";
//    if (!didToken) {
//      const bb = req.body;
//      didToken = bb.token ? bb.token.substr(6) : "";;
//     //  console.log({ didToken });
//    }
//   const user = await verifyToken(didToken);
//   console.log({ user });
//   if(!user){
//      return res.status(400).json({
//        error: "The specified password and id is wrong",
//        done: false,
//      });
//   }

//   if (!user.employeeid) {
//     return res.status(400).json({
//       error: "Missing required id property",
//       done: false,
//     });
//   }
//   const id = await existsLaunchWithId(user.employeeid);
//   if (!id) {
//     return res.status(400).json({
//       error: "The specified id doesnt exist in Database",
//       done: false,
//     });
//   }

//   if (!id.password && !user.password) {
//     return res.status(200).json({ done: true });
//   }

//   if (user.password == id.password) {
//     return res.status(200).json({ done: true });
//   }

//   return res
//     .status(400)
//     .json({ error: "The specified password and id is wrong", done: false });
// }

// async function httpDeleteAuthorization(req, res) {
//   const launchId = Number(req.params.id);

//   const existsLaunch = await existsLaunchWithId(launchId);
//   if (!existsLaunch) {
//     return res.status(404).json({
//       error: "Launch not found",
//     });
//   }

//   const aborted = await abortLaunchById(launchId);
//   if (!aborted) {
//     return res.status(400).json({
//       error: "Launch not aborted",
//     });
//   }

//   return res.status(200).json({
//     ok: true,
//   });
// }

module.exports = {

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
    httpEditCurriculumModuleQuestionItem,
    httpStreamCurriculumModuleLectureVideoContent
    // httpGetAllCourses,
    // httpEditCourse,
    // httpDeleteCourse

    // httpAddNewRequest,
    // httpGetAllRequest,
    // httpEditRequest,
    // httpAssignEmployee,
    // httpAssignedWork,
    // httpSubmitServey,
    // DownloadWorkServey

};



