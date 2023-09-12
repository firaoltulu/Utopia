const fs = require("fs");
var path = require("path");
const sharp = require("sharp");

const {
    existsCourseWithId,
    AddNewCourse,
    getAllCourse,
    // EditLanguageById,
    EditCourseById,
    AbortCourseById,
    EditCourseContentById,
    existsCourseWithLanguageId,
} = require("../../models/Course.model");

const {
    getAllLanguage,
    existsLanguageWithId
} = require("../../models/Language.model");

const { existsImageIDWithId } = require("../../models/child/Image.model")


// const { response } = require("express");

// const { setTokenCookie } =require("../../lib/cookies");
// const { verifyToken } = require("../../lib/verifytoken");
// const jwt= require("jsonwebtoken");


async function httpAddNewCourse(req, res) {

    // const launch = req.file;
    const body = req.body;

    const languages = await getAllLanguage();

    try {

        const Titles = JSON.parse(body.Titles).map((row, index) => {
            var newobj = Object.assign({}, {
                LanguageID: row.languageID,
                Title: row.title,
            });
            if (newobj.Title === "" || parseInt(newobj.LanguageID) === NaN) {
                throw new Error("Title should not be empty");

            }
            else {
                return newobj;
            }

        });

        const Discriptions = JSON.parse(body.Discriptions).map((row, index) => {
            var newobj = Object.assign({}, {
                LanguageID: row.languageID,
                Discription: row.discription,
            });
            if (newobj.Discription === "" || parseInt(newobj.LanguageID) === NaN) {
                throw new Error("Discription should not be empty");

            }
            else {
                return newobj;
            }

        });

        const CourseLanguage = parseInt(body.courselanguage);
        const CourseLevel = parseInt(body.courselevel);

        if (!CourseLanguage || !CourseLevel || !(Discriptions.length > 0) || !(Titles.length > 0)
        ) {
            throw new Error("Missing required property are not provided");
        }
        else {

            var foundcourselanguage = languages.filter((row, index) => {
                if (CourseLanguage === row.LanguageID) {
                    return row;
                }
                return null;
            });

            if (!foundcourselanguage.length > 0) {
                console.log({ foundcourselanguage });
                throw new Error("Missing required property are not provided");
            };

            var foundcourseduplicatedTitles = Titles.filter((row, firstindex) => {

                var locobj = Titles.filter((title, secondindex) => {
                    if (title.LanguageID === row.LanguageID && firstindex !== secondindex) {
                        return title;
                    }
                    else {
                        return null;
                    }
                });

                if (locobj.length > 0) {
                    throw new Error("Missing required property are not provided");
                }
                else {
                    return null;
                }

            });


            var foundcourseduplicatedDiscriptions = Discriptions.filter((row, firstindex) => {

                var locobj = Discriptions.filter((Discription, secondindex) => {
                    if (Discription.LanguageID === row.LanguageID && firstindex !== secondindex) {
                        return Discription;
                    }
                    else {
                        return null;
                    }
                });

                if (locobj.length > 0) {
                    throw new Error("Missing required property are not provided");
                }
                else {
                    return null;
                }

            });

            var foundcourselanguageTitles = Titles.map((row, firstindex) => {

                var locobj = languages.map((language, secondindex) => {
                    if (language.LanguageID === row.LanguageID) {
                        return true;
                    }
                    else {
                        return false;
                    }
                });

                if (locobj.includes(true)) {
                    return true;
                }
                else {
                    throw new Error("Missing required property are not provided");
                }

            });

            var foundcourselanguageDiscriptions = Discriptions.map((row, firstindex) => {


                var locobj = languages.map((language, secondindex) => {
                    if (language.LanguageID === row.LanguageID) {
                        return true;
                    }
                    else {
                        return false;
                    }
                });

                if (locobj.includes(true)) {

                    return true;
                }
                else {
                    throw new Error("Missing required property are not provided");
                }

            });

            const newobj = Object.assign({}, {

                Titles: Titles,
                Discriptions: Discriptions,
                CourseLanguage: CourseLanguage,
                CourseLevel: CourseLevel

            });

            const response = await AddNewCourse(newobj);

            if (response.done) {
                return res.status(200).json({ done: true });
            }
            else {
                return res.status(400).json({ done: false });
            }

        }

    } catch (e) {

        console.log("error has happend e = " + e);
        return res.status(400).json({ done: false });
    }

}

async function httpGetAllCourses(req, res) {

    const { skip, limit } = req.query;

    const Courses = await getAllCourse(skip, limit);

    return res.status(200).json(Courses);

}

async function httpEditCourse(req, res) {

    try {
        const body = req.body;
        const LanguageID = parseInt(body.LanguageID);
        const CourseID = parseInt(body.CourseID);
        const ContentID = parseInt(body.ContentID);
        const Which = body.Which;
        const Update = body.Update;

        if (Which !== "" && Update !== "" && LanguageID > 0 && CourseID > 0) {
            const language = await existsLanguageWithId(LanguageID);
            const course = await existsCourseWithId(CourseID);

            if (language && course) {

                if (Which === "title") {

                    var newLaunch = Object.assign({}, {
                        Title: Update,
                        CourseID: course.CourseID,
                        LanguageID: language.LanguageID,
                    });

                    const editcourse = await EditCourseById(newLaunch.CourseID, newLaunch, Which);

                    if (editcourse.done) {
                        return res.status(200).json({ done: true });
                    }
                    else {
                        return res.status(400).json({ done: false, message: "Error Try again" });
                    }
                }
                else if (Which === "discription") {
                    newLaunch = Object.assign({}, {
                        Discription: Update,
                        CourseID: course.CourseID,
                        LanguageID: language.LanguageID,
                    });

                    const editcourse = await EditCourseById(newLaunch.CourseID, newLaunch, Which);

                    if (editcourse.done) {
                        return res.status(200).json({ done: true });
                    }
                    else {
                        return res.status(400).json({ done: false, message: "Error Try again" });
                    }
                }
                else {

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

async function httpDeleteCourse(req, res) {

    // const LanguageID = Number(req.params.LanguageID);

    // if (LanguageID > 0) {
    //     const language = await existsLanguageWithId(LanguageID);
    //     if (language) {

    //         const deletelanguage = await AbortLanguageById(language.LanguageID, language);
    //         if (deletelanguage.done) {
    //             console.log("deleted successfully");
    //             return res.status(200).json({ done: true });
    //         } else {
    //             return res.status(400).json({ done: false });
    //         }

    //     }
    //     else {
    //         return res.status(400).json({ done: false, message: "language with the id havnt been found..." });
    //     }
    // }
    // else {
    //     return res.status(400).json({ done: false, message: "LanguageID should be specified..." });
    // }

};

async function httpEditCourseContent(req, res) {

    try {

        const body = req.body;
        const CourseID = parseInt(body.CourseID);
        var Requirements = [];
        var Goals = [];
        var IntendedLearners = [];

        var Image1 = null;
        var Image2 = null;
        var Image3 = null;
        var Image4 = null;

        try {

            try {
                IntendedLearners = JSON.parse(body.IntendedLearners);
            }
            catch (error) {

            }
            try {
                Requirements = JSON.parse(body.Requirements);
            }
            catch (error) { }
            try {
                Goals = JSON.parse(body.Goals);
            }
            catch (error) { }
            try {
                Image1 = body.Image1;
            }
            catch (error) { }
            try {
                Image2 = body.Image2;
            }
            catch (error) { }
            try {
                Image3 = body.Image3;
            }
            catch (error) { }
            try {
                Image4 = body.Image4;
            }
            catch (error) { }

        } catch (e) {
            return res.status(400).json({ done: false, message: "Should not be Null..." });
        }

        if (CourseID > 0) {

            const course = await existsCourseWithId(CourseID);

            if (course) {

                const editRequirements = [];
                if (Requirements.length > 0) {

                    try {

                        const not = await Promise.all(Requirements.map(async (row, index) => {

                            if (row.Requirement instanceof String || typeof row.Requirement === 'string') {

                                var foundRequirement = course.Requirements.find((inrowrow, index) => {
                                    try {
                                        if (inrowrow.RequirementID === row.RequirementID) {
                                            return inrowrow;
                                        }
                                        else {
                                            return null;
                                        }

                                    } catch (e) {
                                        return null;
                                    }
                                });

                                if (foundRequirement) {

                                    if (editRequirements.length > 0) {

                                        var foundduplicate = editRequirements.find((ininrow, index) => {
                                            if (ininrow) {
                                                if (foundRequirement.RequirementID === ininrow.RequirementID) {
                                                    return ininrow;
                                                }
                                                else {
                                                    return null;
                                                }
                                            }
                                            else {
                                                return null;
                                            }
                                        });

                                        if (!foundduplicate) {
                                            editRequirements.push(row);
                                        }
                                        else {

                                        }

                                    }
                                    else {
                                        editRequirements.push(row);
                                    }

                                }
                                else {
                                    var inlanlenght = 0;

                                    course.Requirements.map((inrow, inindex) => {
                                        if (inrow.LanguageID === row.LanguageID) {
                                            inlanlenght++;
                                        }
                                    });

                                    console.log({ inlanlenght });

                                    if ((inlanlenght + Requirements.length) <= 5) {

                                        if (row.Requirement !== "" && row.LanguageID > 0) {

                                            const foundlanguage = await existsLanguageWithId(row.LanguageID);

                                            if (foundlanguage) {

                                                var content = Object.assign({}, {
                                                    Requirement: row.Requirement,
                                                    LanguageID: foundlanguage.LanguageID,
                                                    RequirementID: -1,
                                                });

                                                editRequirements.push(content);
                                            }
                                            else {
                                                throw new Error("language havent been found");
                                            }

                                        }
                                        else {

                                            throw new Error("Wrong Inuput");

                                        }

                                    }
                                    else {
                                        throw new Error("max lenght Reached for Requirements");
                                    }

                                }

                            }
                            else {
                                throw new Error("Invalid Type");
                            }

                        }));

                    } catch (error) {

                        return res.status(400).json({ done: false, message: error.message });

                    }

                }

                const editIntendedLearners = [];
                if (IntendedLearners.length > 0) {

                    try {

                        const not = await Promise.all(IntendedLearners.map(async (row, index) => {

                            if (row.IntendedLearner instanceof String || typeof row.IntendedLearner === 'string') {

                                var foundIntendedLearners = course.IntendedLearners.find((inrowrow, index) => {
                                    try {
                                        if (inrowrow.IntendedLearnerID === row.IntendedLearnerID) {
                                            return inrowrow;
                                        }
                                        else {
                                            return null;
                                        }

                                    } catch (e) {
                                        return null;
                                    }
                                });

                                if (foundIntendedLearners) {

                                    if (editIntendedLearners.length > 0) {

                                        var foundduplicate = editIntendedLearners.find((ininrow, index) => {
                                            if (ininrow) {
                                                if (foundIntendedLearners.IntendedLearnerID === ininrow.IntendedLearnerID) {
                                                    return ininrow;
                                                }
                                                else {
                                                    return null;
                                                }
                                            }
                                            else {
                                                return null;
                                            }
                                        });

                                        if (!foundduplicate) {
                                            editIntendedLearners.push(row);
                                        }
                                        else {

                                        }
                                    }
                                    else {
                                        editIntendedLearners.push(row);
                                    }

                                }
                                else {

                                    var inlanlenght = 0;

                                    course.IntendedLearners.map((inrow, inindex) => {
                                        if (inrow.LanguageID === row.LanguageID) {
                                            inlanlenght++;
                                        }
                                    });

                                    console.log({ inlanlenght });

                                    if ((inlanlenght + IntendedLearners.length) <= 5) {

                                        if (row.IntendedLearner !== "" && row.LanguageID > 0) {

                                            const foundlanguage = await existsLanguageWithId(row.LanguageID);

                                            if (foundlanguage) {

                                                var content = Object.assign({}, {
                                                    IntendedLearner: row.IntendedLearner,
                                                    LanguageID: foundlanguage.LanguageID,
                                                    IntendedLearnerID: -1,
                                                });

                                                editIntendedLearners.push(content);
                                            }
                                            else {
                                                throw new Error("Language with an ID havent been Found");
                                            }

                                        }
                                        else {

                                            throw new Error("Wrong Input");

                                        }
                                    }
                                    else {
                                        throw new Error("max lenght Reached For The IntendedLearners");
                                    }

                                }
                            }
                            else {
                                throw new Error("Invalid Type");
                            }
                        }));

                    } catch (error) {
                        return res.status(400).json({ done: false, message: error.message });
                    }


                }

                const editGoals = [];
                if (Goals.length > 0) {

                    try {

                        const not = await Promise.all(Goals.map(async (row, index) => {

                            if (row.Goal instanceof String || typeof row.Goal === 'string') {

                                var foundGoal = course.Goals.find((inrowrow, index) => {
                                    try {
                                        if (inrowrow.GoalID === row.GoalID) {
                                            return inrowrow;
                                        }
                                        else {
                                            return null;
                                        }

                                    } catch (e) {
                                        return null;
                                    }
                                });

                                if (foundGoal) {

                                    if (editGoals.length > 0) {

                                        var foundduplicate = editGoals.find((ininrow, index) => {
                                            if (ininrow) {
                                                if (foundGoal.GoalID === ininrow.GoalID) {
                                                    return ininrow;
                                                }
                                                else {
                                                    return null;
                                                }
                                            }
                                            else {
                                                return null;
                                            }
                                        });

                                        if (!foundduplicate) {
                                            editGoals.push(row);
                                        }
                                        else {

                                        }

                                    }
                                    else {
                                        editGoals.push(row);
                                    }

                                }
                                else {

                                    var inlanlenght = 0;

                                    course.Goals.map((inrow, inindex) => {
                                        if (inrow.LanguageID === row.LanguageID) {
                                            inlanlenght++;
                                        }
                                    });

                                    console.log({ inlanlenght });

                                    if ((inlanlenght + Goals.length) <= 15) {

                                        if (row.Goal !== "" && row.LanguageID > 0) {

                                            const foundlanguage = await existsLanguageWithId(row.LanguageID);

                                            if (foundlanguage) {

                                                var content = Object.assign({}, {
                                                    Goal: row.Goal,
                                                    LanguageID: foundlanguage.LanguageID,
                                                    GoalID: -1,
                                                });

                                                editGoals.push(content);
                                            }
                                            else {
                                                throw new Error("Language With ID havent been Found");
                                            }

                                        }
                                        else {

                                            throw new Error("Wrong Input");

                                        }
                                    }
                                    else {
                                        throw new Error("max lenght Reached For The Goals");
                                    }

                                }

                            }
                            else {
                                throw new Error("Invalid Input");
                            }

                        }));

                    } catch (error) {

                        return res.status(400).json({ done: false, message: error.message });

                    }

                }

                var editImage1 = null;
                if (Image1 !== null) {

                    const dest = body.dest;
                    const filename = body.filename;

                    try {

                        const files = await fs.readdirSync(dest);

                        const checker = async (files) => {

                            var found = 0;

                            files.forEach(file => {

                                if (file === filename) {
                                    found += 1;
                                }

                            });

                            if (found === 1) {

                                // const img = sharp(req.file.buffer);
                                const img = sharp(dest + "\\" + filename);
                                var metadata = await img.metadata();


                                console.log({ metadata });

                                if (metadata.height === 422 && metadata.width === 750) {
                                    console.log("size fit so no error");
                                    try {

                                        const dest = path.join(__dirname, '..', '..', '..', '..', '..', '..', 'Coursera_Course_Images',
                                            `${course.CourseID}`, `${body.Which}`);
                                        const fsexist = fs.existsSync(dest);

                                        if (!fsexist) {
                                            fs.mkdirSync(dest, { recursive: true });
                                        }

                                        await img
                                            .resize({
                                                width: 750,
                                                height: 422
                                            }).
                                            toFormat("jpeg", {
                                                mozjpeg: true,
                                                quality: 100,
                                                chromaSubsampling: '4:4:4'
                                            }).
                                            // toBuffer({ resolveWithObject: true });
                                            toFile(dest + "/" + filename);

                                        editImage1 = Object.assign({}, {
                                            Path: dest,
                                            originalname: Image1.originalname,
                                            fieldname: filename,
                                            mimetype: "jpeg",
                                        });

                                    } catch (error) {
                                        return { done: false, reason: 2 };
                                    }

                                }
                                else if (metadata.height > 422 && metadata.width > 750) {
                                    console.log("size big crop");
                                    editImage1 = null;
                                    return { done: false, reason: 3 };

                                }
                                else {
                                    console.log("size dont fit");
                                    return { done: false, reason: 1 };
                                }

                            }
                            else {

                            }

                        };

                        const ww = await checker(files);

                        if (!ww.done) {
                            return res.status(200).json({ done: false, reason: ww.reason });
                        }


                    } catch (error) {


                    }

                }

                if (editIntendedLearners.length > 0 || editRequirements.length > 0 || editGoals.length > 0 || editImage1 !== null) {

                    var newLaunch = Object.assign({}, {
                        CourseID: course.CourseID,
                        IntendedLearners: editIntendedLearners,
                        Requirements: editRequirements,
                        Goals: editGoals,
                        Image1: editImage1
                    });

                    const editcourse = await EditCourseContentById(newLaunch.CourseID, newLaunch);

                    if (editcourse.done) {

                        const updatecourse = await existsCourseWithId(course.CourseID);
                        return res.status(200).json({ done: true, course: updatecourse });

                    }
                    else {

                        return res.status(400).json({ done: false, message: "Error Try again" });
                    }

                }
                else {
                    console.log("1");
                    return res.status(400).json({ done: false, message: "Try Again..." });
                }

            }
            else {
                console.log("2");
                return res.status(400).json({ done: false, message: "Course with the id havnt been found..." });
            }

        }
        else {
            console.log("3");
            return res.status(400).json({ done: false, message: "Course ID Should not be Empty..." });

        }

    } catch (e) {
        console.log("4");
        return res.json({ done: false, message: "error happen try again..." });
    }

};

async function httpDeleteCourseContent(req, res) {

    try {



    } catch (error) {

        return res.status(400).json({ done: false, message: error.message });

    }

};

async function httpStreamCourseCover(req, res) {

    try {

        const body = req.body;
        const ImageID = Number(req.params.ImageID);

        if (ImageID) {

            const foundImage = await existsImageIDWithId(ImageID);

            if (foundImage) {

                console.log({ foundImage });
                const dest = path.join(foundImage.Path);

                console.log({ dest });

                await fs.readdir(dest, (err, files) => {
                    var found = 0;

                    try {

                        files.forEach(file => {

                            if (file === foundImage.Name) {
                                found += 1;
                                console.log({ file });
                            }

                        });

                        if (found === 1) {
                            try {
                                const videoSize = fs.statSync(dest + "\\" + foundImage.Name).size;
                                console.log({ videoSize });
                                // const CHUNK_SIZE = 10 ** 6;

                                // console.log({ CHUNK_SIZE });

                                const headers = {
                                    "Accept-Ranges": "bytes",
                                    "Content-Length": videoSize,
                                    "Content-Type": "image/jpeg",
                                };
                                res.writeHead(206, headers);
                                const videoStream = fs.createReadStream(dest + "\\" + foundImage.Name);
                                videoStream.pipe(res);
                            } catch (error) {
                                console.log({ error });
                            }
                        }
                        else {

                        }

                    } catch (error) {
                        return res.status(400).json({ error: "Try Again", done: false });
                    }

                });


            }
            else {
                return res.status(400).json({ error: "NO Image exist in this With ID", done: false });
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

    httpAddNewCourse,
    httpGetAllCourses,
    httpEditCourse,
    httpDeleteCourse,
    httpEditCourseContent,
    httpStreamCourseCover
    // httpAddNewRequest,
    // httpGetAllRequest,
    // httpEditRequest,
    // httpAssignEmployee,
    // httpAssignedWork,
    // httpSubmitServey,
    // DownloadWorkServey
};
