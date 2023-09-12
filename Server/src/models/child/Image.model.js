const mongoose = require("mongoose");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const ImageIDdatabase = require("./Image.mongo");


// const { getLatestRequestImageNumber, saveRequestImage, existsRequestImageWithId, updateRequestImage } = require("./Request_Image.model");


const DEFAULT_IMAGEID_ID_NUMBER = 100;


async function findImageID(filter) {
    return await ImageIDdatabase.findOne(filter);
}

async function existsImageIDWithId(launchId) {
    return await findImageID({
        ImageID_ID: launchId,
    });
}

async function getLatestImageIDNumber() {

    const latestImageID = await ImageIDdatabase.findOne().sort("-ImageID_ID");

    if (!latestImageID) {
        return DEFAULT_IMAGEID_ID_NUMBER;
    }

    return latestImageID.ImageID_ID;
}

async function saveImageID(launch) {

    const newlaunch = Object.assign({}, {

        ImageID_ID: launch.ImageID_ID,
        CourseID: launch.CourseID,
        Name: launch.Name,
        Path: launch.Path,
        AddedDate: launch.AddedDate,
        ModifyDate: launch.ModifyDate,

    });

    const response = await ImageIDdatabase.findOneAndUpdate(
        {
            ImageID_ID: newlaunch.ImageID_ID,
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

async function AddNewImageID(body = null) {
    try {

        const newImageID_ID = (await getLatestImageIDNumber()) + 1;

        if (body !== null) {

            const newLaunch = Object.assign({}, {

                ImageID_ID: newImageID_ID,
                CourseID: body.CourseID,
                Name: body.Name,
                Path: body.Path,
                AddedDate: new Date().toISOString(),
                ModifyDate: [],

            });

            const response = await saveImageID(newLaunch);

            if (response) {
                return { done: true, response: response };
            }
            else {
                return { done: false };
            }

        }
        else {

            return { done: false, error: "error Creating ImageID" };

        }

    } catch (error) {
        return { done: false };
    }

}

async function getAllImageID(skip, limit) {
    const res = await ImageIDdatabase
        .find({}, { _id: 0, __v: 0 })
        .sort({ ImageID_ID: 1 })
        .skip(skip)
        .limit(limit);
    return res;
}

async function updateImageID(ImageID_ID, ImageID) {

    const updateImageID = await ImageIDdatabase.updateOne(
        {
            ImageID_ID: ImageID_ID,
        },
        ImageID,
        {
            returnOriginal: false
        }
    );
    if (updateImageID) {
        return updateImageID;
    } else {
        return null;
    }

}

async function EditImageIDById(ImageID_ID = 0, body = null) {

    if (ImageID_ID !== 0) {

        const ImageID = await existsImageIDWithId(ImageID_ID);

        if (ImageID && body !== null) {

            ImageID.Path = body.Path;
            ImageID.ModifyDate.push(new Date().toISOString());

            const response = await updateImageID(ImageID.ImageID_ID, ImageID);
            if (response) {
                return { done: true };
            }
            else {
                return { done: false };
            }

        }
        else {

            return { done: false, error: "Image with ID haven't been found.." };
        }

    }
    else {

        return { done: false, error: "LanguageID Is Wrong.." };

    }

}

module.exports = {
    EditImageIDById,
    getAllImageID,
    AddNewImageID,
    existsImageIDWithId
};