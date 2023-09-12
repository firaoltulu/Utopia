const mongoose = require("mongoose");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const Coursedatabase = require("./Course.mongo");

const { existsCurriculumWithId,
    AddNewCurriculumItem,
    AddNewCurriculum,
    getAllCurriculum, } = require("./child/Curriculum.model");

const {
    EditImageIDById,
    getAllImageID,
    AddNewImageID,
    existsImageIDWithId
} = require("./child/Image.model");

// const { getLatestRequestImageNumber, saveRequestImage, existsRequestImageWithId, updateRequestImage } = require("./Request_Image.model");


const DEFAULT_COURSE_NUMBER = 100;
const DEFAULT_GOAL_NUMBER = 100;
const DEFAULT_REQUIRMENT_NUMBER = 100;
const DEFAULT_INTENDED_LEARNER_NUMBER = 100;


async function findCourse(filter) {
    return await Coursedatabase.findOne(filter);
}

async function existsCourseWithId(launchId) {
    return await findCourse({
        CourseID: launchId,
    });
}

async function getLatestCourseNumber() {
    const latestCourse = await Coursedatabase.findOne().sort("-CourseID");

    if (!latestCourse) {
        return DEFAULT_COURSE_NUMBER;
    }

    return latestCourse.CourseID;
}

async function saveCourse(launch) {

    const newlaunch = Object.assign({}, {
        CourseID: launch.CourseID,
        Titles: launch.Titles,
        Discriptions: launch.Discriptions,
        Goals: launch.Goals,
        Lecturers: launch.Lecturers,

        CourseLanguage: launch.CourseLanguage,
        CourseLevel: launch.CourseLevel,
        Image1: launch.Image1,
        Image2: launch.Image2,
        Image3: launch.Image3,
        Image4: launch.Image4,
        AddedDate: launch.AddedDate,
        ModifyDate: launch.ModifyDate,
        Modules: launch.Modules,
    });

    const response = await Coursedatabase.findOneAndUpdate(
        {
            CourseID: newlaunch.CourseID,
        },
        newlaunch,
        {
            new: true,
            upsert: true,
        }
    );
    if (response) {

        return response;
    } else {
        return null;
    }

}

async function AddNewCourse(body = null) {
    try {

        const newCourseID = (await getLatestCourseNumber()) + 1;

        if (body !== null) {

            const newLaunch = Object.assign({}, {
                CourseID: newCourseID,
                Titles: body.Titles,
                Discriptions: body.Discriptions,
                CourseLanguage: body.CourseLanguage,
                CourseLevel: body.CourseLevel,
                AddedDate: new Date().toISOString(),
                Goals: [],
                Lecturers: [],
                Image1: [],
                Image2: null,
                Image3: null,
                Image4: null,
                ModifyDate: [],
                Modules: ""
            });

            const response = await saveCourse(newLaunch);

            if (response) {
                const newCurriculum = Object.assign({}, {
                    CourseID: newLaunch.CourseID
                });
                const Curriculumresponse = await AddNewCurriculumItem(newLaunch.CourseID, newCurriculum);


                if (Curriculumresponse.done) {
                    return { done: true };
                }

            }
            else {
                return { done: false };
            }

        }
        else {

            return { done: false, error: "error Creating Course" };

        }

    } catch (error) {
        return { done: false };
    }

}

async function getAllCourse(skip, limit) {
    const res = await Coursedatabase
        .find({}, { _id: 0, __v: 0 })
        .sort({ CourseID: 1 })
        .skip(skip)
        .limit(limit);
    return res;
}

async function updateCourse(CourseID, course) {

    const updatecourse = await Coursedatabase.updateOne(
        {
            CourseID: CourseID,
        },
        course,
        {
            returnOriginal: false
        }
    );
    if (updatecourse) {
        return updatecourse;
    } else {
        return null;
    }

}

async function EditCourseById(CourseID = 0, body = null, updatewho = "") {

    if (CourseID !== 0) {

        const course = await existsCourseWithId(CourseID);

        if (course && body !== null) {

            if (updatewho === "title") {

                const found = course.Titles.find((row, index) => {
                    if (row.LanguageID === body.LanguageID) {
                        row.Title = body.Title;
                        return row;
                    }
                    else {

                        return null;

                    }
                });

                if (found) {

                    course.ModifyDate.push(new Date().toISOString());

                    const newobj = Object.assign({}, {
                        AddedDate: course.AddedDate,
                        CourseLanguage: course.CourseLanguage,
                        CourseLevel: course.CourseLevel,
                        Discriptions: course.Discriptions,
                        Goals: course.Goals,
                        Image1: course.Image1,
                        Image2: course.Image2,
                        Image3: course.Image3,
                        Image4: course.Image4,
                        Lecturers: course.Lecturers,
                        ModifyDate: course.ModifyDate,
                        Modules: course.Modules,
                        Titles: course.Titles,
                    });

                    if (newobj) {

                        const response = await updateCourse(course.CourseID, newobj);
                        if (response) {
                            return { done: true };
                        }
                        else {
                            return { done: false };
                        }

                    }
                    else {
                        return { done: false };
                    }

                }
                else {
                    if (body.Title !== "") {

                        course.ModifyDate.push(new Date().toISOString());

                        const newele = Object.assign({}, {
                            LanguageID: body.LanguageID,
                            Title: body.Title
                        });

                        course.Titles.push(newele);

                        const newobj = Object.assign({}, {
                            AddedDate: course.AddedDate,
                            CourseLanguage: course.CourseLanguage,
                            CourseLevel: course.CourseLevel,
                            Discriptions: course.Discriptions,
                            Goals: course.Goals,
                            Image1: course.Image1,
                            Image2: course.Image2,
                            Image3: course.Image3,
                            Image4: course.Image4,
                            Lecturers: course.Lecturers,
                            ModifyDate: course.ModifyDate,
                            Modules: course.Modules,
                            Titles: course.Titles,
                        });

                        console.log({ newobj });
                        if (newobj) {

                            const response = await updateCourse(course.CourseID, newobj);
                            if (response) {
                                return { done: true };
                            }
                            else {
                                return { done: false };
                            }

                        }
                        else {
                            return { done: false };
                        }
                    }
                    else {
                        return { done: false };
                    }
                }

            }
            else if (updatewho === "discription") {

                console.log({ body });

                const found = course.Discriptions.find((row, index) => {
                    if (row.LanguageID === body.LanguageID) {
                        row.Discription = body.Discription;
                        return row;
                    }
                    else {
                        return null;

                    }
                });

                if (found) {

                    course.ModifyDate.push(new Date().toISOString());

                    const newobj = Object.assign({}, {
                        AddedDate: course.AddedDate,
                        CourseLanguage: course.CourseLanguage,
                        CourseLevel: course.CourseLevel,
                        Discriptions: course.Discriptions,
                        Goals: course.Goals,
                        Image1: course.Image1,
                        Image2: course.Image2,
                        Image3: course.Image3,
                        Image4: course.Image4,
                        Lecturers: course.Lecturers,
                        ModifyDate: course.ModifyDate,
                        Modules: course.Modules,
                        Titles: course.Titles,
                    });

                    if (newobj) {

                        const response = await updateCourse(course.CourseID, newobj);
                        if (response) {
                            return { done: true };
                        }
                        else {
                            return { done: false };
                        }

                    }
                    else {
                        return { done: false };
                    }

                }
                else {
                    if (body.Discription !== "") {

                        course.ModifyDate.push(new Date().toISOString());

                        const newele = Object.assign({}, {
                            LanguageID: body.LanguageID,
                            Discription: body.Discription
                        });

                        course.Discriptions.push(newele);

                        const newobj = Object.assign({}, {
                            AddedDate: course.AddedDate,
                            CourseLanguage: course.CourseLanguage,
                            CourseLevel: course.CourseLevel,
                            Goals: course.Goals,
                            Image1: course.Image1,
                            Image2: course.Image2,
                            Image3: course.Image3,
                            Image4: course.Image4,
                            Lecturers: course.Lecturers,
                            ModifyDate: course.ModifyDate,
                            Modules: course.Modules,
                            Titles: course.Titles,
                            Discriptions: course.Discriptions,
                        });

                        console.log({ newobj });
                        if (newobj) {

                            const response = await updateCourse(course.CourseID, newobj);
                            if (response) {
                                return { done: true };
                            }
                            else {
                                return { done: false };
                            }

                        }
                        else {
                            return { done: false };
                        }
                    }
                    else {
                        return { done: false };
                    }
                }

            }
            else if (updatewho === "Goal") {

                if (body.GoalID > -1) {

                    const foundGoal = course.Goals.find((row, index) => {
                        if (row.GoalID === body.GoalID) {
                            return row;
                        }
                        else {
                            return null;
                        }
                    });

                    if (foundGoal) {

                        foundGoal.Goal = body.Goal;
                        foundGoal.ModifyDate.push(new Date().toISOString());

                        const response = await updateCourse(course.CourseID, course);
                        if (response) {
                            return { done: true };
                        }
                        else {
                            return { done: false };
                        }

                    }
                    else {
                        return { done: false, error: "Goal haven't been find.." };
                    }

                }
                else if (body.GoalID === -1) {

                    if (course.Goals.length === 0) {

                        const newLaunch = Object.assign({}, {
                            Goal: body.Goal,
                            LanguageID: body.LanguageID,
                            GoalID: DEFAULT_GOAL_NUMBER,
                            AddedDate: new Date().toISOString(),
                            ModifyDate: []
                        });

                        course.Goals.push(newLaunch);

                        const response = await updateCourse(course.CourseID, course);
                        if (response) {

                            return { done: true };
                        }
                        else {
                            return { done: false };
                        }

                    }
                    else if (course.Goals.length > 0) {

                        const foundgoal = course.Goals.reduce((rowx, rowy) => {
                            if (rowx.GoalID > rowy.GoalID) {
                                return rowx;
                            }
                            else {
                                return rowy;
                            }
                        });

                        const GoalID = foundgoal.GoalID + 1;

                        const newLaunch = Object.assign({}, {
                            Goal: body.Goal,
                            LanguageID: body.LanguageID,
                            GoalID: GoalID,
                            AddedDate: new Date().toISOString(),
                            ModifyDate: []
                        });

                        course.Goals.push(newLaunch);

                        const response = await updateCourse(course.CourseID, course);

                        if (response) {

                            return { done: true };
                        }
                        else {
                            return { done: false };
                        }

                    }
                    else {
                        return { done: false, error: "There Have Been Error.." };
                    }

                }
                else {
                    return { done: false, error: "There Have Been Error Try Again.." };
                }
            }
            else if (updatewho === "Requirement") {

                if (body.RequirementID > -1) {

                    const foundRequirement = course.Requirements.find((row, index) => {
                        if (row.RequirementID === body.RequirementID) {
                            return row;
                        }
                        else {
                            return null;
                        }
                    });

                    if (foundRequirement) {

                        foundRequirement.Requirement = body.Requirement;
                        foundRequirement.ModifyDate.push(new Date().toISOString());

                        const response = await updateCourse(course.CourseID, course);
                        if (response) {
                            return { done: true };
                        }
                        else {
                            return { done: false };
                        }

                    }
                    else {
                        return { done: false, error: "Requirement haven't been find.." };
                    }
                }
                else if (body.RequirementID === -1) {

                    if (course.Requirements.length === 0) {

                        const newLaunch = Object.assign({}, {
                            Requirement: body.Requirement,
                            LanguageID: body.LanguageID,
                            RequirementID: DEFAULT_REQUIRMENT_NUMBER,
                            AddedDate: new Date().toISOString(),
                            ModifyDate: []
                        });

                        console.log({ newLaunch });

                        course.Requirements.push(newLaunch);

                        const response = await updateCourse(course.CourseID, course);
                        if (response) {

                            return { done: true };
                        }
                        else {
                            return { done: false };
                        }

                    }
                    else if (course.Requirements.length > 0) {

                        const foundRequirement = course.Requirements.reduce((rowx, rowy) => {
                            if (rowx.RequirementID > rowy.RequirementID) {
                                return rowx;
                            }
                            else {
                                return rowy;
                            }
                        });

                        const RequirementID = foundRequirement.RequirementID + 1;

                        const newLaunch = Object.assign({}, {
                            Requirement: body.Requirement,
                            LanguageID: body.LanguageID,
                            RequirementID: RequirementID,
                            AddedDate: new Date().toISOString(),
                            ModifyDate: []
                        });

                        course.Requirements.push(newLaunch);

                        const response = await updateCourse(course.CourseID, course);

                        if (response) {

                            return { done: true };
                        }
                        else {
                            return { done: false };
                        }

                    }
                    else {
                        return { done: false };
                    }

                }
                else {
                    return { done: false };
                }

            }
            else if (updatewho === 5) {

            }
            else {

            }

        }
        else {

            return { done: false, error: "language haven't been find.." };
        }

    }
    else {

        return { done: false, error: "LanguageID Is Wrong.." };

    }

}

async function AbortCourseById(CourseID, course) {
    console.log("in the abort Course by id function");
    console.log({ CourseID });
    const aborted = await Coursedatabase.deleteOne(
        {
            CourseID: CourseID,
        }
    );
    if (aborted.deletedCount === 1) {

        return { done: true };
    }
    else {
        return { done: false };
    }


}

async function EditCourseContentById(CourseID = 0, body = null) {

    if (CourseID !== 0) {

        const course = await existsCourseWithId(CourseID);

        if (course && body !== null) {

            if (body.Requirements.length > 0) {

                body.Requirements.map(async (row, index) => {

                    const foundRequirement = course.Requirements.find((inrow, index) => {
                        if (row.RequirementID === inrow.RequirementID) {
                            return row;
                        }
                        else {
                            return null;
                        }
                    });

                    if (foundRequirement) {

                        if (row.Requirement !== "") {

                            foundRequirement.Requirement = row.Requirement;
                            foundRequirement.ModifyDate.push(new Date().toISOString());

                        }
                        else {

                            const filterRequirement = course.Requirements.filter((inrow, index) => {
                                if (inrow.RequirementID !== foundRequirement.RequirementID) {
                                    return inrow;
                                }
                            });

                            course.Requirements = filterRequirement;

                        }

                    }
                    else {

                        if (course.Requirements.length > 0) {

                            const foundRequirement_RequirementID = course.Requirements.reduce((rowx, rowy) => {
                                if (rowx.RequirementID > rowy.RequirementID) {
                                    return rowx;
                                }
                                else {
                                    return rowy;
                                }
                            });


                            if (foundRequirement_RequirementID) {

                                var RequirementID = foundRequirement_RequirementID.RequirementID + 1;

                                var newLaunch = Object.assign({}, {
                                    Requirement: row.Requirement,
                                    LanguageID: row.LanguageID,
                                    RequirementID: RequirementID,
                                    AddedDate: new Date().toISOString(),
                                    ModifyDate: []
                                });

                                course.Requirements.push(newLaunch);
                            }
                            else if (!foundRequirement_RequirementID) {

                                throw new Error();
                            }
                        }
                        else if (course.Requirements.length <= 0) {

                            const newLaunch = Object.assign({}, {
                                Requirement: row.Requirement,
                                LanguageID: row.LanguageID,
                                RequirementID: DEFAULT_REQUIRMENT_NUMBER,
                                AddedDate: new Date().toISOString(),
                                ModifyDate: []
                            });

                            course.Requirements.push(newLaunch);
                        }
                    }

                });

            }
            if (body.IntendedLearners.length > 0) {

                body.IntendedLearners.map(async (row, index) => {

                    const foundIntendedLearner = course.IntendedLearners.find((inrow, index) => {
                        if (row.IntendedLearnerID === inrow.IntendedLearnerID) {
                            return inrow;
                        }
                        else {
                            return null;
                        }
                    });

                    if (foundIntendedLearner) {

                        if (row.IntendedLearner !== "") {

                            foundIntendedLearner.IntendedLearner = row.IntendedLearner;
                            foundIntendedLearner.ModifyDate.push(new Date().toISOString());

                        }
                        else {

                            const filterIntendedLearner = course.IntendedLearners.filter((inrow, index) => {
                                if (inrow.IntendedLearnerID !== foundIntendedLearner.IntendedLearnerID) {
                                    return inrow;
                                }
                            });

                            course.IntendedLearners = filterIntendedLearner;

                        }

                    }
                    else {

                        if (course.IntendedLearners.length > 0) {

                            const foundIntendedLearner_IntendedLearnerID = course.IntendedLearners.reduce((rowx, rowy) => {
                                if (rowx.IntendedLearnerID > rowy.IntendedLearnerID) {
                                    return rowx;
                                }
                                else {
                                    return rowy;
                                }
                            });

                            if (foundIntendedLearner_IntendedLearnerID) {

                                const IntendedLearnerID = foundIntendedLearner_IntendedLearnerID.IntendedLearnerID + 1;

                                const newLaunch = Object.assign({}, {
                                    IntendedLearner: row.IntendedLearner,
                                    LanguageID: row.LanguageID,
                                    IntendedLearnerID: IntendedLearnerID,
                                    AddedDate: new Date().toISOString(),
                                    ModifyDate: []
                                });

                                course.IntendedLearners.push(newLaunch);
                            }
                            else if (!foundIntendedLearner_IntendedLearnerID) {
                                throw new Error();
                            }
                        }
                        else if (course.IntendedLearners.length <= 0) {

                            const newLaunch = Object.assign({}, {
                                IntendedLearner: row.IntendedLearner,
                                LanguageID: row.LanguageID,
                                IntendedLearnerID: DEFAULT_INTENDED_LEARNER_NUMBER,
                                AddedDate: new Date().toISOString(),
                                ModifyDate: []
                            });

                            course.IntendedLearners.push(newLaunch);
                        }
                    }

                });

            }
            if (body.Goals.length > 0) {

                body.Goals.map(async (row, index) => {

                    const foundGoals = course.Goals.find((inrow, index) => {
                        if (row.GoalID === inrow.GoalID) {
                            return inrow;
                        }
                        else {
                            return null;
                        }
                    });

                    if (foundGoals) {

                        if (row.Goal !== "") {

                            foundGoals.Goal = row.Goal;
                            foundGoals.ModifyDate.push(new Date().toISOString());

                        }
                        else {

                            const filterGoal = course.Goals.filter((inrow, index) => {
                                if (inrow.GoalID !== foundGoals.GoalID) {
                                    return inrow;
                                }
                            });

                            course.Goals = filterGoal;

                        }

                    }
                    else {

                        if (course.Goals.length > 0) {

                            const foundGoals_GoalID = course.Goals.reduce((rowx, rowy) => {
                                if (rowx.GoalID > rowy.GoalID) {
                                    return rowx;
                                }
                                else {
                                    return rowy;
                                }
                            });

                            if (foundGoals_GoalID) {

                                const GoalID = foundGoals_GoalID.GoalID + 1;

                                const newLaunch = Object.assign({}, {
                                    Goal: row.Goal,
                                    LanguageID: row.LanguageID,
                                    GoalID: GoalID,
                                    AddedDate: new Date().toISOString(),
                                    ModifyDate: []
                                });

                                course.Goals.push(newLaunch);

                            }
                            else if (!foundGoals_GoalID) {
                                throw new Error();
                            }
                        }
                        else if (course.Goals.length <= 0) {

                            const newLaunch = Object.assign({}, {
                                Goal: row.Goal,
                                LanguageID: row.LanguageID,
                                GoalID: DEFAULT_GOAL_NUMBER,
                                AddedDate: new Date().toISOString(),
                                ModifyDate: []
                            });

                            course.Goals.push(newLaunch);

                        }
                        // else if (course.Goals.length === ) {
                        //     throw new error("no lenght");
                        // }
                    }

                });

            }
            if (body.Image1 !== null) {

                const Image1 = body.Image1;
                const path = Image1.Path;

                // if (course.Image1.length < 0) {

                const newImageID = Object.assign({}, {
                    CourseID: course.CourseID,
                    Path: path,
                    Name: Image1.fieldname,

                });

                const addimage = await AddNewImageID(newImageID);

                if (addimage.done) {

                    const newobj = Object.assign({}, {
                        ImageID: addimage.response.ImageID_ID,
                        OrginalName: Image1.originalname,
                        FieldName: Image1.fieldname,
                        MimeType: Image1.mimetype,
                    });

                    course.Image1.push(newobj);

                }
                else {
                    body.Image1 === null;
                }

                // }
                // else if (course.Image1.length > 0) {

                //     var EditImageID = Object.assign({}, {
                //         ImageID_ID: course.Image1.ImageID,
                //         Path: path,
                //     });

                //     EditImageID = await EditImageIDById(EditImageID.ImageID_ID, EditImageID);

                //     if (EditImageID.done) {

                //         course.Image1.OrginalName = Image1.originalname;
                //         course.Image1.FieldName = Image1.fieldname;
                //         course.Image1.MimeType = Image1.mimetype;

                //     }
                //     else {
                //         body.Image1 = null;
                //     }

                // }
                // else {
                //     body.Image1 = null;
                // }

            }

            if (body.IntendedLearners.length <= 0 &&
                body.Requirements.length <= 0 &&
                body.Goals.length <= 0 &&
                body.Image1 === null) {

                return { done: false };

            }
            else {

                const response = await updateCourse(course.CourseID, course);
                if (response.acknowledged) {

                    return { done: true };
                }
                else {
                    return { done: false };
                }

            }

        }
        else {

            return { done: false, error: "language haven't been find.." };
        }

    }
    else {
        return { done: false, error: "LanguageID Is Wrong.." };
    }

}



module.exports = {

    existsCourseWithId,
    AddNewCourse,
    getAllCourse,
    EditCourseById,
    AbortCourseById,
    EditCourseContentById

};