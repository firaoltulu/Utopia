const express = require("express");
var { graphqlHTTP } = require('express-graphql');

const schema = require("../../scheme/languagescheme");

const {
    httpAddNewLanguage,
    httpGetAllLanguages,
    httpEditLanguage,
    httpDeleteLanguage
} = require("./languages.controller");

const NewLanguageRouter = express.Router();

NewLanguageRouter.use("/graphql/languages", graphqlHTTP({ schema: schema, graphiql: true }))

NewLanguageRouter.post("/AddNewLanguage", httpAddNewLanguage);
NewLanguageRouter.get("/GetAllLanguages", httpGetAllLanguages);
NewLanguageRouter.post("/EditLanguage", httpEditLanguage);
NewLanguageRouter.delete("/DeleteLanguage/:LanguageID", httpDeleteLanguage);

// AuthorizationRouter.delete("/:id", httpDeleteAuthorization);

module.exports = NewLanguageRouter;