const axios = require("axios");
const fs = require("fs");
const path = require("path");
const Uploaddatabase = require("./Upload.mongo");
const DEFAULT_UPLOAD_NUMBER = 100;

async function findUpload(filter) {
    return await Uploaddatabase.findOne(filter);
}

async function existsUploadWithId(launchId) {
    return await findUpload({
        UploadID: launchId,
    });
}

async function getLatestUploadNumber() {
    const latestUpload = await Uploaddatabase.findOne().sort("-UploadID");

    if (!latestUpload) {
        return DEFAULT_UPLOAD_NUMBER;
    }

    return latestUpload.UploadID;
}

async function saveUpload(launch) {

    const newlaunch = Object.assign({}, {
        UploadID: launch.UploadID,
        Title: launch.Title,
        Active: launch.Active,
        AddedDate: launch.AddedDate,
        ModifedDate: launch.ModifedDate,
    });

    const response = await Uploaddatabase.findOneAndUpdate(
        {
            UploadID: newlaunch.UploadID,
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

async function AddNewUpload(body = null) {

    const newUploadID = (await getLatestUploadNumber()) + 1;
    if (body !== null) {

        const newLaunch = Object.assign({}, {
            UploadID: newUploadID,
            Title: body.Title,
            Active: true,
            AddedDate: new Date().toISOString(),
            ModifedDate: "",
        });

        const response = await saveUpload(newLaunch);

        if (response) {
            return { done: true, response: response };
        }
        else {

            return { done: false };
        }
    } else {
        return { done: false, error: "error creating upload" };
    }

}

async function getAllUpload(skip, limit) {
    const res = await Uploaddatabase
        .find({}, { _id: 0, __v: 0 })
        .sort({ UploadID: 1 })
        .skip(skip)
        .limit(limit);
    return res;
}

async function updateUpload(UploadID, Upload) {

    const updateupload = await Uploaddatabase.updateOne(
        {
            UploadID: UploadID,
        },
        Upload
    );
    if (updateupload) {
        return updateupload;
    } else {
        return null;
    }

}

async function EditUploadById(UploadID = 0, body = null) {

    if (UploadID !== 0) {

        const upload = await existsUploadWithId(UploadID);

        if (upload) {

            if (body !== null) {

                const editupload = Object.assign({}, {
                    Title: upload.Title,
                    AddedDate: upload.AddedDate,
                    Active: body.Active,
                    ModifedDate: new Date().toISOString(),
                });

                // console.log({ editupload })

                const response = await updateUpload(upload.UploadID, editupload);
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

            return { done: false, error: "upload haven't been find.." };
        }

    }
    else {

        return { done: false, error: "UploadID Is Wrong.." };

    }

}

async function AbortuploadById(UploadID, upload = null) {
    console.log("in the abort upload by id function");
    console.log({ UploadID });
    const aborted = await Uploaddatabase.deleteOne(
        {
            UploadID: UploadID,
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

    existsUploadWithId,
    AddNewUpload,
    getAllUpload,
    EditUploadById,
    AbortuploadById

};