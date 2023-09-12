const axios = require("axios");
const fs = require("fs");
const path = require("path");
const Price_Tierdatabase = require("./Price_tier.mongo");
const DEFAULT_PRICE_TIER_NUMBER = 100;

async function findPrice_Tier(filter) {
    return await Price_Tierdatabase.findOne(filter);
}

async function existsPrice_TierWithId(launchId) {
    return await findPrice_Tier({
        Price_Tier_ID: launchId,
    });
}

async function getLatestPrice_TierNumber() {
    const latestPrice_Tier = await Price_Tierdatabase.findOne().sort("-Price_Tier_ID");

    if (!latestPrice_Tier) {
        return DEFAULT_PRICE_TIER_NUMBER;
    }

    return latestPrice_Tier.Price_Tier_ID;
}

async function savePrice_Tier(launch) {

    const newlaunch = Object.assign({}, {
        Price_Tier_ID: launch.Price_Tier_ID,
        Min_Price_Tier: launch.Min_Price_Tier,
        Max_Price_Tier: launch.Max_Price_Tier,
        Currency_ID: launch.Currency_ID,
        AddedDate: launch.AddedDate,
        ModifedDate: launch.ModifedDate,
    });

    const response = await Price_Tierdatabase.findOneAndUpdate(
        {
            Price_Tier_ID: newlaunch.Price_Tier_ID,
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

async function AddNewPrice_Tier(body = null) {

    if (body !== null) {
        const New_Price_Tier_ID = (await getLatestPrice_TierNumber()) + 1;

        const newLaunch = Object.assign({}, {
            Price_Tier_ID: New_Price_Tier_ID,
            Min_Price_Tier: body.Min_Price_Tier,
            Max_Price_Tier: body.Max_Price_Tier,
            Currency_ID: body.Currency_ID,
            AddedDate: new Date().toISOString(),
            ModifedDate: [],
        });

        console.log({ newLaunch });

        const response = await savePrice_Tier(newLaunch);
        if (response) {

            console.log({ response });

            return { done: true };
        }
        else {

            return { done: false };
        }
    } else {
        return { done: false, error: "error creating Price Tier" };
    }

}

async function getAllPrice_Tier(skip, limit) {
    const res = await Price_Tierdatabase
        .find({}, { _id: 0, __v: 0 })
        .sort({ Price_Tier_ID: 1 })
        .skip(skip)
        .limit(limit);
    return res;

}

async function updatePrice_Tier(Price_Tier_ID, Price_Tier) {

    const update_updatePrice_Tier = await Price_Tierdatabase.updateOne(
        {
            Price_Tier_ID: Price_Tier_ID,
        },
        Price_Tier
    );
    if (update_updatePrice_Tier) {
        return update_updatePrice_Tier;
    } else {
        return null;
    }

}

async function EditPrice_TierById(Price_Tier_ID = 0, body = null) {

    if (Price_Tier_ID !== 0) {

        const Price_Tier = await existsPrice_TierWithId(Price_Tier_ID);

        if (Price_Tier) {

            if (body !== null) {

                const EditPrice_tier = Object.assign({}, {

                    Min_Price_Tier: body.Min_Price_Tier,
                    Max_Price_Tier: body.Max_Price_Tier,
                    Currency_ID: Price_Tier.Currency_ID,
                    AddedDate: Price_Tier.AddedDate,
                    ModifedDate: Price_Tier.ModifedDate.push(new Date().toISOString()),

                });

                console.log({ EditPrice_tier })

                const response = await updatePrice_Tier(Price_Tier.Price_Tier_ID, EditPrice_tier);
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

            return { done: false, error: "Price Tier haven't been find.." };
        }

    }
    else {
        return { done: false, error: "LanguageID Is Wrong.." };
    }

}

async function AbortPrice_TierById(Price_Tier_ID, Price_Tier) {
    console.log("in the abort price tier by id function");
    console.log({ Price_Tier_ID });
    const aborted = await Price_Tierdatabase.deleteOne(
        {
            Price_Tier_ID: Price_Tier_ID,
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

    existsPrice_TierWithId,
    AddNewPrice_Tier,
    getAllPrice_Tier,
    EditPrice_TierById,
    AbortPrice_TierById

};
