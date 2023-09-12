const axios = require("axios");
const fs = require("fs");
const path = require("path");
const Languagedatabase = require("./Language.mongo");
const DEFAULT_LANGUAGE_NUMBER = 100;

async function findLanguage(filter) {
    return await Languagedatabase.findOne(filter);
}

async function existsLanguageWithId(launchId) {
    return await findLanguage({
        LanguageID: launchId,
    });
}

async function getLatestLanguageNumber() {
    const latestLanguage = await Languagedatabase.findOne().sort("-LanguageID");

    if (!latestLanguage) {
        return DEFAULT_LANGUAGE_NUMBER;
    }

    return latestLanguage.LanguageID;
}

async function saveLanguage(launch) {

    const newlaunch = Object.assign({}, {
        LanguageID: launch.LanguageID,
        Title: launch.Title,
        EnglishTitle: launch.EnglishTitle,
        AddedDate: launch.AddedDate,
        ModifedDate: launch.ModifedDate,
    });

    const response = await Languagedatabase.findOneAndUpdate(
        {
            LanguageID: newlaunch.LanguageID,
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

async function AddNewLanguage(body = null) {

    const newLanguageID = (await getLatestLanguageNumber()) + 1;
    if (body !== null) {

        const newLaunch = Object.assign({}, {
            LanguageID: newLanguageID,
            Title: body.Title,
            EnglishTitle: body.EnglishTitle,
            AddedDate: new Date().toISOString(),
            ModifedDate: "",
        });

        const response = await saveLanguage(newLaunch);
        if (response) {


            return { done: true };
        }
        else {

            return { done: false };
        }
    } else {
        return { done: false, error: "error creating Language" };
    }

}

async function getAllLanguage(skip, limit) {
    const res = await Languagedatabase
        .find({}, { _id: 0, __v: 0 })
        .sort({ LanguageID: 1 })
        .skip(skip)
        .limit(limit);
    return res;

}

async function updateLanguage(LanguageID, Language) {

    const updateLanguage = await Languagedatabase.updateOne(
        {
            LanguageID: LanguageID,
        },
        Language
    );
    if (updateLanguage) {
        return updateLanguage;
    } else {
        return null;
    }

}

async function EditLanguageById(LanguageID = 0, body = null) {

    if (LanguageID !== 0) {

        const language = await existsLanguageWithId(LanguageID);

        if (language) {

            if (body !== null) {
                const editlanguage = Object.assign({}, {

                    Title: body.Title,
                    EnglishTitle: body.EnglishTitle,
                    AddedDate: language.AddedDate,
                    ModifedDate: new Date().toISOString(),

                });
                console.log({ editlanguage })

                const response = await updateLanguage(language.LanguageID, editlanguage);
                if (response) {
                    return { done: true };
                }
                else {
                    return { done: false };
                }
            } else {
                return { done: false, error: "wrong body input.." };
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

async function AbortLanguageById(LanguageID, language) {
    console.log("in the abort language by id function");
    console.log({ LanguageID });
    const aborted = await Languagedatabase.deleteOne(
        {
            LanguageID: LanguageID,
        }
    );
    if (aborted.deletedCount === 1) {

        return { done: true };
    }
    else {
        return { done: false };
    }


}

module.exports = {

    existsLanguageWithId,
    AddNewLanguage,
    getAllLanguage,
    EditLanguageById,
    AbortLanguageById

};