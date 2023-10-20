const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString,
    GraphQLSchema, GraphQLInt, GraphQLBoolean,
    GraphQLList } = graphql;

const {
    existsCourseWithId,
} = require("../models/Course.model");

const {
    getAllCurriculumContent,
    // getAllCourse,
} = require("../models/child/Curriculum.model");

const AnswerType = new GraphQLObjectType({
    name: "answer",
    fields: () => ({
        AnswerID: { type: GraphQLInt },
        AnswerTitle: { type: GraphQLString },
        AnswerDiscription: { type: GraphQLString },
        RightAnswer: { type: GraphQLBoolean },
        AddedDate: { type: GraphQLString },
        ModifyDate: { type: new GraphQLList(GraphQLString) },
    })
});

const QuizType = new GraphQLObjectType({
    name: "quiz",
    fields: () => ({
        QuestionID: { type: GraphQLInt },
        Question: { type: GraphQLString },
        Answer: { type: new GraphQLList(AnswerType) },
        AddedDate: { type: GraphQLString },
        ModifyDate: { type: new GraphQLList(GraphQLString) },
    })
});

const Extra_ResourceType = new GraphQLObjectType({
    name: "Extra_Resource",
    fields: () => ({
        Extra_Resource_ID: { type: GraphQLInt },
        Resource_Content: { type: GraphQLString },
        Resource_Content_type: { type: GraphQLString },
    })
});

const LectureType = new GraphQLObjectType({
    name: "lecture",
    fields: () => ({
        LectureID: { type: GraphQLInt },
        Type: { type: GraphQLString },
        Title: { type: GraphQLString },
        Discription: { type: GraphQLString },
        Content_Type: { type: GraphQLString },
        Content: { type: GraphQLString },
        Extra_Resource: { type: new GraphQLList(Extra_ResourceType) },
        Quiz_content: { type: new GraphQLList(QuizType) },
        AddedDate: { type: GraphQLString },
        ModifyDate: { type: new GraphQLList(GraphQLString) },

    })
});

const ModuleType = new GraphQLObjectType({
    name: "module",
    fields: () => ({
        ModuleID: { type: GraphQLInt },
        Title: { type: GraphQLString },
        Objective: { type: GraphQLString },
        Lectures: { type: new GraphQLList(LectureType) },
        AddedDate: { type: GraphQLString },
        ModifyDate: { type: new GraphQLList(GraphQLString) },
    })
});

const CurriculumType = new GraphQLObjectType({
    name: "curriculum",
    fields: () => ({

        CurriculumID: { type: GraphQLInt },
        LanguageID: { type: GraphQLInt },
        Modules: { type: new GraphQLList(ModuleType) },
        AddedDate: { type: GraphQLString },
        ModifyDate: { type: new GraphQLList(GraphQLString) },
        CourseID: { type: GraphQLInt },
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {

        Curriculums: {
            type: new GraphQLList(CurriculumType),
            args: {
                CourseID: { type: GraphQLInt },
            },
            async resolve(parent, args) {
                try {
                    const course = await existsCourseWithId(args.CourseID);
                    if (course) {
                        const res = await getAllCurriculumContent(course);
                        // .sort({ LanguageID: 1 })
                        // .skip(args.skip)
                        // .limit(args.limit);
                        // console.log({ res });
                        return res.response;
                    } else {
                        return null;
                    }

                } catch (e) {
                    return null;
                }

            }
        },

        Curriculum: {
            type: CurriculumType,
            args: {
                CourseID: { type: GraphQLInt },
                CurriculumID: { type: GraphQLInt },
            },
            async resolve(parent, args) {
                try {
                    const course = await existsCourseWithId(args.CourseID);
                    if (course) {
                        const res = await getAllCurriculumContent(course);

                        const foundCurriculum = res.response.find((row, index) => {
                            if (row.CurriculumID === args.CurriculumID) {
                                return row;
                            }
                            else {
                                return null;
                            }
                        })
                        // .sort({ LanguageID: 1 })
                        // .skip(args.skip)
                        // .limit(args.limit);
                        // console.log({ res });
                        return foundCurriculum;
                    } else {
                        return null;
                    }

                } catch (e) {
                    return null;
                }

            }
        },

        Module: {
            type: ModuleType,
            args: {
                CourseID: { type: GraphQLInt },
                ModuleID: { type: GraphQLInt },
            },
            async resolve(parent, args) {
                try {
                    const course = await existsCourseWithId(args.CourseID);
                    if (course) {
                        var res = await getAllCurriculumContent(course);
                        res = Object.assign({ ...res.response }, {});

                        const foundmodule = res[0].Modules.find((row, index) => {
                            if (row.ModuleID === args.ModuleID) {
                                return row;
                            }
                            else {
                                return null;
                            }
                        });

                        if (foundmodule) {
                            return foundmodule;
                        }
                        else {
                            return null;
                        }
                        // .sort({ LanguageID: 1 })
                        // .skip(args.skip)
                        // .limit(args.limit);
                        // console.log({ res });
                        return res.response;
                    } else {
                        return null;
                    }

                } catch (e) {
                    return null;
                }

            }
        },

        Lecture: {
            type: LectureType,
            args: {
                CourseID: { type: GraphQLInt },
                CurriculumID: { type: GraphQLInt },
                ModuleID: { type: GraphQLInt },
                LectureID: { type: GraphQLInt },
            },
            async resolve(parent, args) {
                try {
                    const course = await existsCourseWithId(args.CourseID);
                    if (course) {
                        var res = await getAllCurriculumContent(course);
                        // res = Object.assign({ ...res.response }, {});

                        const foundCurriculum = res.response.find((row, index) => {
                            if (row.CurriculumID === args.CurriculumID) {
                                return row;
                            }
                            else {
                                return null;
                            }
                        })

                        const foundmodule = foundCurriculum.Modules.find((row, index) => {
                            if (row.ModuleID === args.ModuleID) {
                                return row;
                            }
                            else {
                                return null;
                            }
                        });

                        if (foundmodule) {

                            const foundlecture = foundmodule.Lectures.find((row, index) => {
                                if (row.LectureID === args.LectureID) {
                                    return row;
                                }
                                else {
                                    return null;
                                }
                            });

                            if (foundlecture) {
                                return foundlecture;
                            }
                            else {
                                return null;
                            }

                        }
                        else {
                            return null;
                        }
                        // .sort({ LanguageID: 1 })
                        // .skip(args.skip)
                        // .limit(args.limit);
                        // console.log({ res });
                        return res.response;
                    } else {
                        return null;
                    }

                } catch (e) {
                    return null;
                }

            }
        },

        Questions: {
            type: new GraphQLList(QuizType),
            args: {
                CourseID: { type: GraphQLInt },
                CurriculumID: { type: GraphQLInt },
                ModuleID: { type: GraphQLInt },
                LectureID: { type: GraphQLInt },
            },
            async resolve(parent, args) {
                try {
                    const course = await existsCourseWithId(args.CourseID);
                    if (course) {
                        var res = await getAllCurriculumContent(course);
                        res = res.response;

                        const foundCurriculum = res.find((row, index) => {
                            if (row.CurriculumID === args.CurriculumID) {
                                return row;
                            }
                            else {
                                return null;
                            }
                        });

                        if (foundCurriculum) {

                            const foundmodule = foundCurriculum.Modules.find((row, index) => {
                                if (row.ModuleID === args.ModuleID) {
                                    return row;
                                }
                                else {
                                    return null;
                                }
                            });

                            if (foundmodule) {

                                const foundlecture = foundmodule.Lectures.find((row, index) => {
                                    if (row.LectureID === args.LectureID) {
                                        return row;
                                    }
                                    else {
                                        return null;
                                    }
                                });

                                if (foundlecture && foundlecture.Quiz_content.length > 0) {

                                    return foundlecture.Quiz_content;
                                }
                                else {
                                    return null;
                                }

                            }
                            else {
                                return null;
                            }

                        }
                        else {
                            return null;
                        }
                        // .sort({ LanguageID: 1 })
                        // .skip(args.skip)
                        // .limit(args.limit);
                        // console.log({ res });
                        // return res.response;
                    } else {
                        return null;
                    }

                } catch (e) {
                    return null;
                }

            }
        },

        // Curriculum: {
        //     type: CourseType,
        //     args: { CourseID: { type: GraphQLInt } },
        //     async resolve(parent, args) {
        //         const res = await existsCourseWithId(args.CourseID);
        //         console.log({ res });
        //         return res;
        //     }
        // },

        // WorkServeys: {
        //     type: new GraphQLList(WorkServeysType),
        //     args: {
        //         skip: { type: GraphQLInt },
        //         limit: { type: GraphQLInt }
        //     },
        //     async resolve(parent, args) {
        //         const res = await getAllWorkServey(args.skip, args.limit);
        //         // .sort({ Requested_date: 1 })
        //         // .skip(args.skip)
        //         // .limit(args.limit);
        //         // console.log({res});
        //         return res;
        //     }
        // },
        // RequestImages: {
        //     type: new GraphQLList(RequestImageType),
        //     args: {
        //         skip: { type: GraphQLInt },
        //         limit: { type: GraphQLInt }
        //     },
        //     async resolve(parent, args) {
        //         const res = await getAllRequestImages(args.skip, args.limit);
        //         // .sort({ Requested_date: 1 })
        //         // .skip(args.skip)
        //         // .limit(args.limit);
        //         // console.log({res});
        //         return res;
        //     }
        // },
        // Employees: {
        //     type: new GraphQLList(EmployeeType),
        //     async resolve(parent, args) {
        //         const res = await getAllEmployee();
        //         // .sort({ Requested_date: 1 })
        //         // .skip(args.skip)
        //         // .limit(args.limit);
        //         return res;
        //     }
        // },
        // Tasks: {
        //     type: new GraphQLList(TaskType),
        //     args: { name: { type: GraphQLString } },
        //     async resolve(parent, args) {
        //         const task = args.name;
        //         console.log({ task });
        //         const res = await getAllTasks(task);
        //         if (res.done) {
        //             return res.response;

        //         } else {
        //             return [];
        //         }
        //     }
        // },

    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});