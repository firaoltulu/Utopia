const express = require("express");
const multer = require('multer');
var { graphqlHTTP } = require('express-graphql');

const schema = require("../../scheme/languagescheme");

const {
    httpAddNewPrice_Tier,
    httpGetAllPrice_Tiers,
    httpEditPrice_Tiers,
    httpDeletePrice_Tiers
} = require("./price_tiers.controller");

const storage = multer.diskStorage({

    destination: async function (req, file, cb) {

        try {

            cb(null, true);

        } catch (error) {

            console.log("Error occur in the destination");

        }

    },

});

const fileFilter = async (req, file, cb) => {
    cb(null, true);
};

const upload = multer({ storage: storage, fileFilter });

const NewPrice_TierRouter = express.Router();

NewPrice_TierRouter.use(upload.single('NewImage'));
NewPrice_TierRouter.use("/graphql/price_tiers", graphqlHTTP({ schema: schema, graphiql: true }))

NewPrice_TierRouter.post("/AddNewPrice_tiers", httpAddNewPrice_Tier);
NewPrice_TierRouter.get("/GetAllPrice_tiers", httpGetAllPrice_Tiers);
NewPrice_TierRouter.post("/EditPrice_tiers", httpEditPrice_Tiers);
NewPrice_TierRouter.delete("/DeletePrice_tier/:Price_Tiers_ID", httpDeletePrice_Tiers);

// AuthorizationRouter.delete("/:id", httpDeleteAuthorization);

module.exports = NewPrice_TierRouter;
