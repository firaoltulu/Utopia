const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString,
    GraphQLSchema, GraphQLInt, GraphQLBoolean,
    GraphQLList } = graphql;

const {
    existsCourseWithId,
    getAllCourse,
} = require("../models/Course.model");

const TitleType = new GraphQLObjectType({
    name: "title",
    fields: () => ({
        LanguageID: { type: GraphQLInt },
        Title: { type: GraphQLString },
    })
});

const DiscriptionType = new GraphQLObjectType({
    name: "discription",
    fields: () => ({
        LanguageID: { type: GraphQLInt },
        Discription: { type: GraphQLString },
    })
});

const GoalType = new GraphQLObjectType({
    name: "goal",
    fields: () => ({
        GoalID: { type: GraphQLInt },
        LanguageID: { type: GraphQLInt },
        Goal: { type: GraphQLString },
        AddedDate: { type: GraphQLString },
        ModifyDate: { type: new GraphQLList(GraphQLString) },
    })
});

const RequirementType = new GraphQLObjectType({
    name: "requirement",
    fields: () => ({
        RequirementID: { type: GraphQLInt },
        LanguageID: { type: GraphQLInt },
        Requirement: { type: GraphQLString },
        AddedDate: { type: GraphQLString },
        ModifyDate: { type: new GraphQLList(GraphQLString) },
    })
});

const IntendedLearnerType = new GraphQLObjectType({
    name: "intendedlearner",
    fields: () => ({
        IntendedLearnerID: { type: GraphQLInt },
        LanguageID: { type: GraphQLInt },
        IntendedLearner: { type: GraphQLString },
        AddedDate: { type: GraphQLString },
        ModifyDate: { type: new GraphQLList(GraphQLString) },
    })
});

const LecturerType = new GraphQLObjectType({
    name: "lecturer",
    fields: () => ({
        LecturerID: { type: GraphQLInt },
        LanguageID: { type: GraphQLInt },
        LecturerTitle: { type: GraphQLInt },
        LecturerName: { type: GraphQLInt },
    })
});

const ImageType = new GraphQLObjectType({
    name: "Image",
    fields: () => ({
        ImageID: { type: GraphQLInt },
        OrginalName: { type: GraphQLString },
        FieldName: { type: GraphQLString },
        MimeType: { type: GraphQLString },
    })
});


const CourseType = new GraphQLObjectType({
    name: "course",
    fields: () => ({

        CourseID: { type: GraphQLInt },
        Titles: { type: new GraphQLList(TitleType) },
        Discriptions: { type: new GraphQLList(DiscriptionType) },
        Goals: { type: new GraphQLList(GoalType) },
        Lecturers: { type: new GraphQLList(LecturerType) },
        Requirements: { type: new GraphQLList(RequirementType) },
        IntendedLearners: { type: new GraphQLList(IntendedLearnerType) },
        Image1: { type: new GraphQLList(ImageType) },
        Image2: { type: ImageType },
        Image3: { type: ImageType },
        Image4: { type: ImageType },

        CourseLanguage: { type: GraphQLString },
        CourseLevel: { type: GraphQLString },
        AddedDate: { type: GraphQLString },
        ModifyDate: { type: GraphQLString },
        Modules: { type: GraphQLString },

    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        Course: {
            type: CourseType,
            args: { CourseID: { type: GraphQLInt } },
            async resolve(parent, args) {
                const res = await existsCourseWithId(args.CourseID);
                // console.log({ res });
                return res;
            }
        },

        Courses: {
            type: new GraphQLList(CourseType),
            args: {
                skip: { type: GraphQLInt },
                limit: { type: GraphQLInt }
            },
            async resolve(parent, args) {
                const res = await getAllCourse(args.skip, args.limit);
                // .sort({ LanguageID: 1 })
                // .skip(args.skip)
                // .limit(args.limit);
                 console.log({ res });
                return res;
            }
        },

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