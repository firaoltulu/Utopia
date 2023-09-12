const axios = require("axios");
const fs = require("fs");
const path = require("path");
// const Tasksdatabase = require("./Tasks.mongo");
const mongoose = require("mongoose");

const { mongoConnect } = require("../../services/mongo");
const MONGO_URL = process.env.MONGO_URL;

const DEFAULT_CURRICULUM_NUMBER = 100;
const DEFAULT_MODULE_NUMBER = 100;
const DEFAULT_LECTURE_NUMBER = 100;
const DEFAULT_QUESTION_NUMBER = 100;
const DEFAULT_ANSWER_NUMBER = 100;

const AnswerSchema = new mongoose.Schema({
    AnswerID: {
        type: Number,
        required: true,
    },
    AnswerTitle: {
        type: String,
        required: true,
    },
    AnswerDiscription: {
        type: String,
        required: true,
    },
    RightAnswer: {
        type: Boolean,
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

const QuizSchema = new mongoose.Schema({
    QuestionID: {
        type: Number,
        required: true,
    },
    Question: {
        type: String,
        required: true,
    },
    Answer: {
        type: [AnswerSchema],
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

const Extra_ResourceSchema = new mongoose.Schema({

    Extra_Resource_ID: {
        type: Number,
        required: true,
    },
    Resource_Content: {
        type: String,
    },
    Resource_Content_type: {
        type: String,
    },

});

const LectureSchema = new mongoose.Schema({
    LectureID: {
        type: Number,
        required: true,
    },
    Type: {
        type: String,
    },
    Title: {
        type: String,
        required: true,
    },
    Discription: {
        type: String,
        required: true,
    },
    Content_Type: {
        type: String,
    },
    Content: {
        type: String,
    },
    Extra_Resource: {
        type: [Extra_ResourceSchema],
    },
    Quiz_content: {
        type: [QuizSchema],
    },
    AddedDate: {
        type: String,
        required: true,
    },
    ModifyDate: {
        type: [String],
    },
    UniqueID: {
        type: Number,
    },

});

const ModuleSchema = new mongoose.Schema({
    ModuleID: {
        type: Number,
        required: true,
    },
    Title: {
        type: String,
        required: true,
    },
    Objective: {
        type: String,
        required: true,
    },
    Lectures: {
        type: [LectureSchema],
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

const CurriculumSchema = new mongoose.Schema({
    CurriculumID: {
        type: Number,
        required: true,
    },
    Modules: {
        type: [ModuleSchema],
        required: true,
    },
    AddedDate: {
        type: String,
        required: true,
    },
    ModifyDate: {
        type: [String],
    },
    CourseID: {
        type: Number,
        required: true,
    },
});

async function findCurriculum(filter, Curriculumdatabase) {
    return await Curriculumdatabase.findOne(filter);
};

async function existsCurriculumWithId(launchId, Curriculumdatabase) {
    return await findCurriculum({
        CurriculumID: launchId,
    }, Curriculumdatabase);
};

async function getLatestCurriculumNumber(Curriculumdatabase) {
    const latestCurriculum = await Curriculumdatabase.findOne().sort("-CurriculumID");

    if (!latestCurriculum) {
        return DEFAULT_CURRICULUM_NUMBER;
    }

    return latestCurriculum.CurriculumID;
};

async function saveCurriculum(Curriculumdatabase, launch) {


    const response = await Curriculumdatabase.findOneAndUpdate(
        {
            CurriculumID: launch.CurriculumID,
        },
        launch,
        {
            new: true,
            upsert: true,
        }
    );
    if (response) {
        return response;
    }
    else {
        return null;
    }
};

async function AddNewCurriculumItem(Curriculum = '', body = null) {

    if (Curriculum !== '') {

        try {

            const Curriculumdatabase = mongoose.model(`Curriculum-${Curriculum}`, CurriculumSchema);

            if (body !== null && Curriculumdatabase) {

                const newCurriculumID = (await getLatestCurriculumNumber(Curriculumdatabase)) + 1;

                const newLaunch = Object.assign({}, {

                    CurriculumID: body.CourseID,
                    Modules: [],
                    AddedDate: new Date().toISOString(),
                    ModifyDate: [],
                    CourseID: body.CourseID

                });

                const response = await saveCurriculum(Curriculumdatabase, newLaunch);

                if (response) {
                    return { done: true, Curriculumname: `Curriculum-${Curriculum}` };
                }
                else {
                    return { done: false };
                }

            }
            else {
                return { done: false };
            }

        } catch (e) {
            return { done: false };
        }

    }
    else {

    }
};

async function getAllCurriculumContent(body = null) {

    try {

        if (body) {

            const res = await mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
                .then((connection) => {
                    return connection.connection.db.listCollections().toArray();
                })
                .then((collections) => {
                    return Promise.resolve({
                        success: true,
                        collections
                    });
                }).catch((err) => Promise.reject(err.message || err));

            const findres = res.collections.find((row, index) => {
                if (row.name === `curriculum-${body.CourseID}` && row.type === 'collection') {
                    return row;
                }
            });

            if (findres) {

                const RedactedCurriculum = mongoose.model(findres.name, CurriculumSchema);
                const res = await RedactedCurriculum.find({}, { _id: 0, __v: 0 });

                return { response: res, done: true };
            }
            else {
                return { done: false };
            }

        } else {

            return { done: false };
        }
    }
    catch (e) {
        return { done: false };
    }

};

async function AddNewCurriculumModules(Module) {

    try {

        const RedactedCurriculum = mongoose.model(`Curriculum-${Module.CourseID}`, CurriculumSchema);

        if (RedactedCurriculum) {

            const existcurriculum = await existsCurriculumWithId(Module.CourseID, RedactedCurriculum);

            if (existcurriculum) {

                var moduleid = 0;
                if (existcurriculum.Modules.length > 0) {
                    moduleid = existcurriculum.Modules.reduce((rowf, rows) => {
                        return (rowf.ModuleID > rows.ModuleID) ? rowf : rows;
                    });
                    moduleid = moduleid.ModuleID + 1;
                }
                else {
                    moduleid = DEFAULT_MODULE_NUMBER;
                }

                if (moduleid > 0) {

                    const newmodule = Object.assign({}, {
                        ModuleID: moduleid,
                        Title: Module.Title,
                        Objective: Module.Objective,
                        Lectures: [],
                        AddedDate: new Date().toISOString(),
                        ModifyDate: []
                    });

                    existcurriculum.Modules.push(newmodule);

                    const newcurriculum = Object.assign({}, {
                        CurriculumID: existcurriculum.CurriculumID,
                        AddedDate: existcurriculum.AddedDate,
                        CourseID: existcurriculum.CourseID,
                        ModifyDate: existcurriculum.ModifyDate,
                        Modules: existcurriculum.Modules,
                    });

                    const response = await saveCurriculum(RedactedCurriculum, newcurriculum);

                    if (response) {
                        return { done: true };
                    } else {
                        return { done: false };
                    }

                }
                else {
                    return { done: false };
                }

            }
            else {

                const newmodule = Object.assign({}, {
                    ModuleID: DEFAULT_MODULE_NUMBER,
                    Title: Module.Title,
                    Objective: Module.Objective,
                    Lectures: [],
                    AddedDate: new Date().toISOString(),
                    ModifyDate: []
                });

                var arr = [];

                arr.push(newmodule);

                const newcurriculum = Object.assign({}, {

                    CurriculumID: Module.CourseID,
                    Modules: arr,
                    AddedDate: new Date().toISOString(),
                    ModifyDate: [],
                    CourseID: Module.CourseID

                });

                const response = await saveCurriculum(RedactedCurriculum, newcurriculum);

                if (response) {
                    return { done: true };
                }
                else {
                    return { done: false };
                }

            }

        }
        else {
            return { done: false };
        }

    } catch (e) {
        return { done: false };
    }

};

async function EditCurriculumitem(body = null) {

    try {

        console.log({ body });

        if (body !== null) {

            const res = await mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
                .then((connection) => {
                    return connection.connection.db.listCollections().toArray();
                })
                .then((collections) => {
                    return Promise.resolve({
                        success: true,
                        collections
                    });
                }).catch((err) => Promise.reject(err.message || err));

            const findres = res.collections.find((row, index) => {
                if (row.name === `curriculum-${body.CourseID}` && row.type === 'collection') {
                    return row;
                }
            });

            if (findres) {

                const RedactedCurriculum = mongoose.model(findres.name, CurriculumSchema);

                if (RedactedCurriculum) {

                    const existcurriculum = await existsCurriculumWithId(body.CourseID, RedactedCurriculum);

                    if (existcurriculum) {

                        if (body.Edit === "title") {

                            const findmodule = existcurriculum.Modules.find((row, index) => {
                                if (row.ModuleID === body.ModuleID) {
                                    return row;
                                }
                            });

                            if (findmodule) {

                                findmodule.Title = body.Title;
                                findmodule.Objective = body.Objective;
                                findmodule.ModifyDate.push(new Date().toISOString());

                                const updateTask = await RedactedCurriculum.updateOne(
                                    {
                                        CurriculumID: existcurriculum.CurriculumID,
                                    },
                                    existcurriculum
                                );

                                if (updateTask) {
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
                        else if (body.Edit === "index") {

                            const newarr = Array.from(existcurriculum.Modules, (row, index) => { return row.ModuleID });

                            const found = body.Module.filter((oldrow, index) => {

                                const found = newarr.find((newrow, index) => {
                                    if (oldrow === newrow) {
                                        return oldrow;
                                    }
                                });
                                if (found) {
                                    return found;
                                } else {
                                    return 0;
                                }

                            });

                            const newobjarr = found.map((inrow, inindex) => {
                                const foundob = existcurriculum.Modules.find((row, index) => {
                                    if (inrow === row.ModuleID) {
                                        return row;
                                    }
                                });
                                return foundob;
                            });

                            const newobj = Object.assign({}, {
                                _id: existcurriculum._id,
                                AddedDate: existcurriculum.AddedDate,
                                CourseID: existcurriculum.CourseID,
                                Modules: newobjarr,
                                __v: existcurriculum.__v,
                                ModifyDate: existcurriculum.ModifyDate.push(new Date().toISOString())
                            });

                            const updateTask = await RedactedCurriculum.updateOne(
                                {
                                    CurriculumID: existcurriculum.CurriculumID,
                                },
                                newobj
                            );

                            if (updateTask) {
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

    } catch (e) {
        return { done: false };
    }

};

async function AddNewCurriculumModuleLecture(body) {

    try {

        if (body !== null) {

            const res = await mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
                .then((connection) => {
                    return connection.connection.db.listCollections().toArray();
                })
                .then((collections) => {
                    return Promise.resolve({
                        success: true,
                        collections
                    });
                }).catch((err) => Promise.reject(err.message || err));

            const findres = res.collections.find((row, index) => {
                if (row.name === `curriculum-${body.CourseID}` && row.type === 'collection') {
                    return row;
                }
            });
            if (findres) {

                const RedactedCurriculum = mongoose.model(findres.name, CurriculumSchema);
                if (RedactedCurriculum) {

                    const existcurriculum = await existsCurriculumWithId(body.CourseID, RedactedCurriculum);

                    if (existcurriculum) {

                        const foundmodule = existcurriculum.Modules.find((row, index) => {
                            if (row.ModuleID === body.ModuleID) {
                                return row;
                            }
                        });
                        if (foundmodule) {

                            var lectureid = 0;
                            if (foundmodule.Lectures.length > 0) {
                                lectureid = foundmodule.Lectures.reduce((rowf, rows) => {
                                    return (rowf.LectureID > rows.LectureID) ? rowf : rows;
                                });
                                lectureid = lectureid.LectureID + 1;
                            }
                            else {
                                lectureid = DEFAULT_LECTURE_NUMBER;
                            }

                            if (lectureid > 0) {

                                const newlecture = Object.assign({}, {
                                    LectureID: lectureid,
                                    Type: body.Type,
                                    Title: body.Title,
                                    Discription: body.Description,
                                    Content_Type: "",
                                    Content: "",
                                    Resource_Content: "",
                                    Resource_Content_type: "",
                                    Quiz_content: [],
                                    AddedDate: new Date().toISOString(),
                                    ModifyDate: []
                                });

                                foundmodule.Lectures.push(newlecture);

                                const newcurriculum = Object.assign({}, {
                                    CurriculumID: existcurriculum.CurriculumID,
                                    AddedDate: existcurriculum.AddedDate,
                                    CourseID: existcurriculum.CourseID,
                                    ModifyDate: existcurriculum.ModifyDate,
                                    Modules: existcurriculum.Modules,
                                });

                                const response = await saveCurriculum(RedactedCurriculum, newcurriculum);

                                if (response) {
                                    return { done: true };
                                } else {
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
        else {
            return { done: false };
        }

    } catch (e) {
        return { done: false };
    }

};

async function EditCurriculumModuleLectureItem(body) {

    try {

        if (body !== null) {

            const res = await mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
                .then((connection) => {
                    return connection.connection.db.listCollections().toArray();
                })
                .then((collections) => {
                    return Promise.resolve({
                        success: true,
                        collections
                    });
                }).catch((err) => Promise.reject(err.message || err));

            const findres = res.collections.find((row, index) => {
                if (row.name === `curriculum-${body.CourseID}` && row.type === 'collection') {
                    return row;
                }
            });

            if (findres) {

                const RedactedCurriculum = mongoose.model(findres.name, CurriculumSchema);

                if (RedactedCurriculum) {

                    const existcurriculum = await existsCurriculumWithId(body.CourseID, RedactedCurriculum);

                    if (existcurriculum) {

                        const foundmodule = existcurriculum.Modules.find((row, index) => {
                            if (row.ModuleID === body.ModuleID) {
                                return row;
                            }
                        });

                        if (foundmodule) {

                            const foundlecture = foundmodule.Lectures.find((row, index) => {
                                if (row.LectureID === body.LectureID) {
                                    return row;
                                }
                            });

                            if (foundlecture && foundlecture.Type === "lecture") {

                                if (body.Title) {
                                    foundlecture.Title = body.Title;
                                }
                                if (body.Discription) {
                                    foundlecture.Discription = body.Discription;
                                }
                                if (body.Content_Type) {
                                    foundlecture.Content_Type = body.Content_Type;
                                }
                                if (body.Content) {
                                    foundlecture.Content = body.Content;
                                }
                                if (body.Extra_Resource) {
                                    foundlecture.Extra_Resource.push(...body.Extra_Resource);// = body.Extra_Resource;
                                }
                                if (body.Question) {

                                }
                                if (body.Question) {

                                }

                                foundlecture.ModifyDate.push(new Date().toISOString())

                                const response = await saveCurriculum(RedactedCurriculum, existcurriculum);
                                if (response) {
                                    return { done: true };
                                } else {
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
        else {
            return { done: false };
        }

    } catch (e) {
        return { done: false };
    }

};

async function EditCurriculumModuleLectureIndex(body = null) {

    try {

        if (body !== null) {

            const res = await mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
                .then((connection) => {
                    return connection.connection.db.listCollections().toArray();
                })
                .then((collections) => {
                    return Promise.resolve({
                        success: true,
                        collections
                    });
                }).catch((err) => Promise.reject(err.message || err));

            const findres = res.collections.find((row, index) => {
                if (row.name === `curriculum-${body.CourseID}` && row.type === 'collection') {
                    return row;
                }
            });

            if (findres) {

                const RedactedCurriculum = mongoose.model(findres.name, CurriculumSchema);

                if (RedactedCurriculum) {

                    const existcurriculum = await existsCurriculumWithId(body.CourseID, RedactedCurriculum);

                    if (existcurriculum) {

                        const foundmodule = existcurriculum.Modules.find((row, index) => {
                            if (body.ModuleID === row.ModuleID) {
                                return row;
                            }
                        });

                        if (foundmodule) {

                            const newarr = Array.from(foundmodule.Lectures, (row, index) => { return row.LectureID });

                            const found = body.Lecture.map((oldrow, index) => {

                                const foundin = newarr.find((newrow, index) => {
                                    if (oldrow === newrow) {
                                        return oldrow;
                                    }
                                });

                                if (foundin) {
                                    return foundin;
                                } else {
                                    return -1;
                                }
                            });

                            if (!found.includes(-1) && body.Lecture.length === newarr.length) {

                                const newobjarr = found.map((inrow, inindex) => {
                                    const foundob = foundmodule.Lectures.find((row, index) => {
                                        if (inrow === row.LectureID) {
                                            return row;
                                        }
                                    });
                                    return foundob;
                                });

                                foundmodule.Lectures = newobjarr;

                                const updateTask = await RedactedCurriculum.updateOne(
                                    {
                                        CurriculumID: existcurriculum.CurriculumID,
                                    },
                                    existcurriculum
                                );

                                if (updateTask) {
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
        else {
            return { done: false };
        }

    } catch (e) {
        return { done: false };
    }

};

async function getCurriculumContentByID(body = null) {

    try {

        if (body) {

            const res = await mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
                .then((connection) => {
                    return connection.connection.db.listCollections().toArray();
                })
                .then((collections) => {
                    return Promise.resolve({
                        success: true,
                        collections
                    });
                }).catch((err) => Promise.reject(err.message || err));

            const findres = res.collections.find((row, index) => {
                if (row.name === `curriculum-${body.CourseID}` && row.type === 'collection') {
                    return row;
                }
            });

            if (findres) {

                const RedactedCurriculum = mongoose.model(findres.name, CurriculumSchema);
                const res = await RedactedCurriculum.find({}, { _id: 0, __v: 0 });

                return { response: res, done: true };
            }
            else {
                return { done: false };
            }

        } else {

            return { done: false };
        }



    }
    catch (e) {
        return { done: false };
    }


};

async function AddCurriculumModuleQuestionItem(body) {

    try {

        if (body !== null) {

            const res = await mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
                .then((connection) => {
                    return connection.connection.db.listCollections().toArray();
                })
                .then((collections) => {
                    return Promise.resolve({
                        success: true,
                        collections
                    });
                }).catch((err) => Promise.reject(err.message || err));

            const findres = res.collections.find((row, index) => {
                if (row.name === `curriculum-${body.CourseID}` && row.type === 'collection') {
                    return row;
                }
            });

            if (findres) {

                const RedactedCurriculum = mongoose.model(findres.name, CurriculumSchema);

                if (RedactedCurriculum) {

                    const existcurriculum = await existsCurriculumWithId(body.CourseID, RedactedCurriculum);

                    if (existcurriculum) {

                        const foundmodule = existcurriculum.Modules.find((row, index) => {
                            if (row.ModuleID === body.ModuleID) {
                                return row;
                            }
                        });

                        if (foundmodule) {

                            const foundlecture = foundmodule.Lectures.find((row, index) => {
                                if (row.LectureID === body.LectureID) {
                                    return row;
                                }
                            });

                            if (foundlecture && foundlecture.Type === "quiz") {

                                if (body.Question) {

                                    var QuestionID = 0;

                                    if (foundlecture.Quiz_content.length > 0) {

                                        QuestionID = foundlecture.Quiz_content.reduce((rowf, rows) => {
                                            return (rowf.QuestionID > rows.QuestionID) ? rowf : rows;
                                        });
                                        QuestionID = QuestionID.QuestionID + 1;

                                    }
                                    else {

                                        QuestionID = DEFAULT_QUESTION_NUMBER;

                                    }

                                    if (QuestionID > 0) {

                                        const Answer = body.Answer.map((row, index) => {

                                            var newobj = Object.assign({}, {

                                                AnswerID: DEFAULT_ANSWER_NUMBER + index,
                                                AddedDate: new Date().toISOString(),
                                                ModifyDate: [],
                                                ...row,

                                            });

                                            return newobj;
                                        });

                                        const newobj = Object.assign({}, {
                                            QuestionID: QuestionID,
                                            Question: body.Question,
                                            Answer: Answer,
                                            AddedDate: new Date().toISOString(),
                                            ModifyDate: [],
                                        });

                                        // console.log(newobj.Answer);
                                        foundlecture.Quiz_content.push(newobj);

                                        console.log({ foundlecture });

                                    }
                                    else {
                                        return { done: true };
                                    }

                                }

                                foundlecture.ModifyDate.push(new Date().toISOString())

                                const response = await saveCurriculum(RedactedCurriculum, existcurriculum);

                                if (response) {
                                    return { done: true };
                                } else {
                                    return { done: false };
                                }

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

    } catch (e) {
        return { done: false };
    }

};

async function EditCurriculumModuleQuestionItem(body) {

    try {

        if (body !== null) {

            const res = await mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
                .then((connection) => {
                    return connection.connection.db.listCollections().toArray();
                })
                .then((collections) => {
                    return Promise.resolve({
                        success: true,
                        collections
                    });
                }).catch((err) => Promise.reject(err.message || err));

            const findres = res.collections.find((row, index) => {
                if (row.name === `curriculum-${body.CourseID}` && row.type === 'collection') {
                    return row;
                }
            });

            if (findres) {

                const RedactedCurriculum = mongoose.model(findres.name, CurriculumSchema);

                if (RedactedCurriculum) {

                    const existcurriculum = await existsCurriculumWithId(body.CourseID, RedactedCurriculum);

                    if (existcurriculum) {

                        const foundmodule = existcurriculum.Modules.find((row, index) => {
                            if (row.ModuleID === body.ModuleID) {
                                return row;
                            }
                        });

                        if (foundmodule) {

                            const foundlecture = foundmodule.Lectures.find((row, index) => {
                                if (row.LectureID === body.LectureID) {
                                    return row;
                                }
                            });

                            if (foundlecture && foundlecture.Type === "quiz") {

                                if (body.Title) {
                                    foundlecture.Title = body.Title;
                                }
                                if (body.Discription) {
                                    foundlecture.Discription = body.Discription;
                                }
                                if (body.Question) {

                                    var foundQuestion = foundlecture.Quiz_content.find((row, index) => {
                                        if (row.QuestionID === body.QuestionID) {
                                            return row;
                                        }
                                    });

                                    if (foundQuestion) {
                                        foundQuestion.Question = body.Question;
                                        foundQuestion.ModifyDate.push(new Date().toISOString());

                                    }

                                }

                                if (body.Answer) {

                                    var foundQuestion = foundlecture.Quiz_content.find((row, index) => {
                                        if (row.QuestionID === body.QuestionID) {
                                            return row;
                                        }
                                    });

                                    if (foundQuestion) {

                                        body.Answer.map((newrow, index) => {

                                            var foundanswer = foundQuestion.Answer.find((row, index) => {

                                                if (newrow.AnswerID === row.AnswerID) {
                                                    return newrow;
                                                }
                                                else {
                                                    return null;
                                                }

                                            });

                                            if (foundanswer) {

                                                foundanswer.AnswerTitle = newrow.AnswerTitle;
                                                foundanswer.AnswerDiscription = newrow.AnswerDiscription;
                                                foundanswer.RightAnswer = newrow.RightAnswer;
                                                foundanswer.ModifyDate.push(new Date().toISOString());

                                            }
                                            else {

                                                var AnswerID = foundQuestion.Answer.reduce((rowf, rows) => {
                                                    return (rowf.AnswerID > rows.AnswerID) ? rowf : rows;
                                                });

                                                if (AnswerID) {

                                                    var newobj = Object.assign({}, {

                                                        AnswerID: AnswerID.AnswerID + 1,
                                                        AnswerTitle: newrow.AnswerTitle,
                                                        AnswerDiscription: newrow.AnswerDiscription,
                                                        RightAnswer: newrow.RightAnswer,
                                                        AddedDate: new Date().toISOString(),
                                                        ModifyDate: []

                                                    });

                                                    foundQuestion.Answer.push(newobj);

                                                }
                                                else {
                                                    return { done: false };
                                                }

                                            }

                                        });

                                    }
                                    else {

                                        return { done: true };

                                    }

                                }

                                foundlecture.ModifyDate.push(new Date().toISOString());

                                const response = await saveCurriculum(RedactedCurriculum, existcurriculum);

                                if (response) {
                                    return { done: true };
                                } else {
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
        else {
            return { done: false };
        }

    } catch (e) {
        return { done: false };
    }

};

// async function EditTaskById(body, task = null) {
//     if (task !== null) {

//         const newTask = Object.assign({}, {
//             Tasks: JSON.parse(body.Tasks),
//         });

//         const response = await updateTask(task.TaskID, newTask);
//         if (response) {
//             return { done: true };
//         }
//         else {
//             console.log("Error Editing tasks");
//             return { done: false };
//         }

//     }
//     else {
//         console.log("Task haven't been find");
//         return { done: false, message: "Task haven't been find" };
//     }
// };

// async function updateTask(TaskID, newTask) {
//     console.log("In the udateTask server function");
//     console.log({ TaskID });
//     console.log({ newTask });
//     const updatetask = await Tasksdatabase.updateOne(
//         {
//             TaskID: TaskID,
//         },
//         newTask
//     );

//     return updatetask;

// };

module.exports = {
    // existsCurriculumWithId,
    AddNewCurriculumItem,
    getAllCurriculumContent,
    AddNewCurriculumModules,
    EditCurriculumitem,
    AddNewCurriculumModuleLecture,
    EditCurriculumModuleLectureItem,
    EditCurriculumModuleLectureIndex,
    AddCurriculumModuleQuestionItem,
    EditCurriculumModuleQuestionItem

    // Edittaskitem
    // EditTaskById
};