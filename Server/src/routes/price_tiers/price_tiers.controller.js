const fs = require("fs");
const path = require("path");

const {

    existsPrice_TierWithId,
    AddNewPrice_Tier,
    getAllPrice_Tier,
    EditPrice_TierById,
    AbortPrice_TierById,

} = require("../../models/Price_Tier.model");

const currencies = [{ Currency_ID: "0", title: "ETB" }];

async function httpAddNewPrice_Tier(req, res) {

    try {

        const locbody = req.body;
        const body = JSON.parse(locbody.Price_Tier);


        if (body.minprice_tier >= 1 && body.maxprice_tier >= 0 && body.maxprice_tier > body.minprice_tier) {


            if (((body.maxprice_tier - body.minprice_tier) < 100) &&
                ((body.maxprice_tier - body.minprice_tier) >= 97)
            ) {

                const foundcurrency = currencies.find((row, index) => {
                    if (row.Currency_ID === body.Currency) {
                        return row;
                    }
                    else {
                        return null;
                    }
                });

                if (foundcurrency) {

                    const allprice_tiers = await getAllPrice_Tier();

                    var foundadd;

                    if (allprice_tiers.length > 0) {

                        const ordered_arr = allprice_tiers.sort((rowx, rowy) => {
                            if (rowx.Max_Price_Tier > rowy.Max_Price_Tier) {
                                return 1;
                            }
                            else {
                                return -1;
                            }
                        });

                        const newarr = ordered_arr.map((row, index) => {

                            if (body.minprice_tier >= (Math.ceil(row.Max_Price_Tier))) {

                                if ((index + 1) < ordered_arr.length) {

                                    if (body.maxprice_tier < ordered_arr[index + 1].Min_Price_Tier) {
                                        return { add: true };
                                    }
                                    else {
                                        return { add: false };
                                    }
                                } else {
                                    return { add: true };
                                }

                            }
                            else {
                                return null;
                            }

                        });

                        foundadd = newarr.find((row, index) => {

                            if (row) {
                                if (row.add) {
                                    return row;
                                }
                                else {
                                    return null;
                                }
                            }
                            else {
                                return null;
                            }

                        });

                        // console.log({ newarr });
                        // console.log({ foundadd });

                    }
                    else {

                        foundadd = { add: true };

                        // const newLaunch = Object.assign({}, {
                        //     Min_Price_Tier: body.minprice_tier,
                        //     Max_Price_Tier: body.maxprice_tier,
                        //     Currency_ID: foundcurrency.Currency_ID
                        // });

                        // const response = await AddNewPrice_Tier(newLaunch);
                        // if (response.done === true) {

                        //     return res.statsus(200).json({ done: true });

                        // } else {

                        //     return res.status(400).json({ done: false });
                        // }

                    }

                    if (foundadd) {

                        if (foundadd.add) {

                            const newLaunch = Object.assign({}, {
                                Min_Price_Tier: body.minprice_tier,
                                Max_Price_Tier: body.maxprice_tier,
                                Currency_ID: foundcurrency.Currency_ID
                            });

                            const response = await AddNewPrice_Tier(newLaunch);

                            if (response.done === true) {
                                const retun_result = await getAllPrice_Tier();

                                console.log({ retun_result });

                                return res.status(200).json({ done: true, result: retun_result });

                            } else {
                                return res.status(400).json({ done: false });

                            }
                        }
                        else {
                            return res.status(400).json({ message: "The Currency You Specified is not supported!!", reason: 1 });
                        }

                    }
                    else {
                        console.log("error wrong input");
                        return res.status(400).json({ message: "Specified is not supported!!", reason: 6 });
                    }

                }
                else {
                    return res.status(400).json({ message: "Specified is not supported!!", reason: 5 });
                }

            }
            else {
                return res.status(400).json({ message: "Required Field not specified!!", reason: 2 });
            }

        } else {
            return res.status(400).json({ message: "Required fields not specfied", reason: 3 });
        }

    } catch (error) {
        return res.status(400).json({ message: "Required fields not specfied", reason: 4 });
    }

};

async function httpGetAllPrice_Tiers(req, res) {

    try {

        const { skip, limit } = req.query;

        const Price_Tier = await getAllPrice_Tier(skip, limit);

        return res.status(200).json(Price_Tier);

    } catch (error) {
        return res.status(400).json({ message: "Required fields not specfied" });
    }

};

async function httpEditPrice_Tiers(req, res) {

    try {

        const locbody = req.body;
        const body = JSON.parse(locbody.Price_Tier);


        if (body.minprice_tier > 0 && body.maxprice_tier > 0 &&
            body.Price_Tier_ID > 0 && body.maxprice_tier > body.minprice_tier) {

            const price_tiers = await existsPrice_TierWithId(body.Price_Tier_ID);

            if (price_tiers) {

                const allprice_tiers = await getAllPrice_Tier();

                const ordered_arr = allprice_tiers.sort((rowx, rowy) => {
                    if (rowx.Max_Price_Tier > rowy.Max_Price_Tier) {
                        return 1;
                    }
                    else {
                        return -1;
                    }
                });

                var reason = 0;

                const newarr = ordered_arr.find((row, index) => {

                    if (row.Price_Tier_ID === price_tiers.Price_Tier_ID) {

                        if (index > 0 && ordered_arr.length > index + 1) {

                            if (ordered_arr[index - 1].Max_Price_Tier < body.minprice_tier &&
                                ordered_arr[index + 1].Min_Price_Tier > body.maxprice_tier &&
                                ((body.maxprice_tier - body.minprice_tier) < 100) &&
                                ((body.maxprice_tier - body.minprice_tier) >= 97)
                            ) {
                                console.log("reason 1");
                                return row;
                            }
                            else {
                                reason = 1;
                                return null;
                            }

                        }
                        else if (index > 0 && ordered_arr.length === index + 1) {

                            if (ordered_arr[index - 1].Max_Price_Tier < body.minprice_tier &&
                                ((body.maxprice_tier - body.minprice_tier) < 100) &&
                                ((body.maxprice_tier - body.minprice_tier) >= 97)
                            ) {
                                console.log("reason 2");
                                return row;
                            }
                            else {
                                reason = 2;
                                return null;
                            }

                        }
                        else {
                            if (ordered_arr.length > index + 1) {

                                if (ordered_arr[index + 1].Min_Price_Tier > body.maxprice_tier &&
                                    ((body.maxprice_tier - body.minprice_tier) < 100) &&
                                    ((body.maxprice_tier - body.minprice_tier) >= 97)
                                ) {
                                    // console.log({ row });

                                    console.log("reason 3");
                                    return row;
                                }
                                else {
                                    reason = 3;
                                    return null;
                                }

                            }
                            else if (ordered_arr.length === index + 1) {

                                if (((body.maxprice_tier - body.minprice_tier) < 100) &&
                                    ((body.maxprice_tier - body.minprice_tier) >= 97)
                                ) {
                                    // console.log({ row });
                                    console.log("reason 4");
                                    return row;
                                }
                                else {
                                    reason = 4;
                                    return null;
                                }

                            }
                            else {
                                reason = 5;
                                return null;
                            }

                        }

                    }
                    else {

                        return null;
                    }

                });

                if (newarr) {

                    const newLaunch = Object.assign({}, {
                        Price_Tier_ID: price_tiers.Price_Tier_ID,
                        Min_Price_Tier: body.minprice_tier,
                        Max_Price_Tier: body.maxprice_tier,
                    });

                    const Editprice_tier = await EditPrice_TierById(newLaunch.Price_Tier_ID, newLaunch);


                    if (Editprice_tier.done) {

                        const Price_Tier = await getAllPrice_Tier();

                        return res.status(200).json({ result: Price_Tier, done: true });
                        // return res.status(200).json({ done: true });
                    } else {
                        return res.status(200).json({ result: null, done: false });
                        // return res.status(400).json({ done: false });
                    }

                }
                else {
                    return res.status(400).json({ result: null, done: false, message: "Price_Tiers with the id havent been found..." });

                }

            }
            else {

                return res.status(400).json({ result: null, done: false, message: "Price_Tiers with the id havent been found..." });

            }

        }
        else {
            return res.status(400).json({ result: null, done: false, message: "Required fields should not be Null..." });
        }

    } catch (error) {
        return res.status(400).json({ result: null, done: false, message: "Required fields not specfied" });
    }

};

async function httpDeletePrice_Tiers(req, res) {

    try {

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
    } catch (error) {
        return res.status(400).json({ message: "Required fields not specfied" });
    }
};

module.exports = {

    httpAddNewPrice_Tier,
    httpGetAllPrice_Tiers,
    httpEditPrice_Tiers,
    httpDeletePrice_Tiers

};


