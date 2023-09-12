const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString,
    GraphQLSchema, GraphQLInt, GraphQLBoolean,
    GraphQLList } = graphql;

const {
    existsLanguageWithId,
    getAllLanguage,
} = require("../models/Language.model");

const LanguageType = new GraphQLObjectType({
    name: "language",
    fields: () => ({
        LanguageID: { type: GraphQLInt },
        Title: { type: GraphQLString },
        EnglishTitle: { type: GraphQLString },
        AddedDate: { type: GraphQLString },
        ModifedDate: { type: GraphQLString },
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        // Request: {
        //     type: RequestType,
        //     args: { RequestID: { type: GraphQLInt } },
        //     async resolve(parent, args) {
        //         const graphqlres = await existsRequestWithId(args.RequestID)
        //         return graphqlres;
        //     }
        // },

        Languages: {
            type: new GraphQLList(LanguageType),
            args: {
                skip: { type: GraphQLInt },
                limit: { type: GraphQLInt }
            },
            async resolve(parent, args) {
                const res = await getAllLanguage(args.skip, args.limit);
                // .sort({ LanguageID: 1 })
                // .skip(args.skip)
                // .limit(args.limit);
                // console.log({ res });
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