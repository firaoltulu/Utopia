const fs = require("fs");
const path = require("path");

const {
    existsLanguageWithId,
    AddNewLanguage,
    getAllLanguage,
    EditLanguageById,
    AbortLanguageById
} = require("../../models/Language.model");

// const {
//     AssignEmployee,
//     AssignedWork,
//     existsWorkServeyWithId,
//     SubmitWorkServey
// } = require("../../models/Work_Servey_Schema.model");

// const {
//     existsEmployeeWithId,
// } = require("../../models/Authorization.model");
// const { response } = require("express");

// const { setTokenCookie } =require("../../lib/cookies");
// const { verifyToken } = require("../../lib/verifytoken");
// const jwt= require("jsonwebtoken");

async function httpAddNewLanguage(req, res) {

    // const launch = req.file;
    const body = req.body;
    if (body.title !== "" && body.titleenglish !== "") {

        const newLaunch = Object.assign({}, {
            Title: body.title,
            EnglishTitle: body.titleenglish,
        });



        const response = await AddNewLanguage(newLaunch);
        if (response.done === true) {

            return res.status(200).json({ done: true });
        } else {

            return res.status(400).json({ done: false });
        }

    } else {
        return res.status(400).json({ message: "Required fields not specfied" });
    }
}

async function httpGetAllLanguages(req, res) {

    const { skip, limit } = req.query;

    const languages = await getAllLanguage(skip, limit);

    return res.status(200).json(languages);

}

async function httpEditLanguage(req, res) {

    const body = req.body;
    console.log({ body });
    if (body.title !== "" && body.titleenglish !== "" && body.LanguageID !== 0) {
        const language = await existsLanguageWithId(body.LanguageID);

        if (language) {
            const newLaunch = Object.assign({}, {
                Title: body.title,
                EnglishTitle: body.titleenglish,
            });

            const editlanguage = await EditLanguageById(language.LanguageID, newLaunch);
            if (editlanguage.done) {
                console.log("updated successfully");
                return res.status(200).json({ done: true });
            } else {
                return res.status(400).json({ done: false });
            }

        }
        else {
            return res.status(400).json({ done: false, message: "language with the id havnt been found..." });
        }
    }
    else {
        return res.status(400).json({ done: false, message: "Both title should not be Null..." });
    }

}

async function httpDeleteLanguage(req, res) {

    const LanguageID = Number(req.params.LanguageID);

    if (LanguageID > 0) {
        const language = await existsLanguageWithId(LanguageID);
        if (language) {

            const deletelanguage = await AbortLanguageById(language.LanguageID, language);
            if (deletelanguage.done) {
                console.log("deleted successfully");
                return res.status(200).json({ done: true });
            } else {
                return res.status(400).json({  done: false });
            }

        }
        else {
            return res.status(400).json({ done: false, message: "language with the id havnt been found..." });
        }
    }
    else {
        return res.status(400).json({ done: false, message: "LanguageID should be specified..." });
    }

}

// async function httpAssignEmployee(req, res) {
//     const body = req.body;
//     const request = await existsRequestWithId(body.RequestID);
//     // console.log("In the HTTP Assign employee Request Controller");
//     // console.log(body.RequestID);
//     if (request) {
//         const employee = await existsEmployeeWithId(body.AssignedEmployee);
//         if (employee) {
//             const response = await AssignEmployee(employee.employeeid, request.Work_servey);
//             return res.status(201).json(response);
//         }
//         else {
//             return res.status(400).json({
//                 error: "Employee with that ID Doesn't Exist",
//             });
//         }
//     }
//     else {
//         return res.status(400).json({
//             error: "Request With That ID Doesn't Exist",
//         });
//     }
// }

// async function httpAssignedWork(req, res) {
//     const user = req.user;
//     console.log({ user });
//     if (user) {
//         const response = await AssignedWork(user.employeeid);
//         console.log("In the HTTP Assigned Work Request Controller");

//         if (response) {
//             //   let looc = [];
//             //   for (let i = 0; i < response.length; i++) {
//             //     let RequestID = response[i].RequestID;
//             //     let ll = await existsRequestWithId(RequestID);
//             //     let ltt = ll;
//             //     ltt.Workservey = response[i];
//             //     looc.push(ltt);
//             // }
//             // console.log({looc});
//             return res.status(201).json(response);
//         }
//         else {
//             return res.status(200).json({
//                 Message: "No Work Have Been Assigned To You",
//             });
//         }
//     }
//     else {

//     }
// }

// async function httpSubmitServey(req, res) {
//     const launch = req.file;
//     const body = req.body;
//     const user = req.user;
//     if (!body.WorkServeyID) {
//         return res.status(400).json({
//             error: "Missing required property are not provided",
//             done: false
//         });
//     }
//     else {
//         const existworkservey = await existsWorkServeyWithId(body.WorkServeyID);
//         if (existworkservey) {
//             if (user.employeeid === existworkservey.AssignedEmployee) {
//                 let response;
//                 try {
//                     response = await SubmitWorkServey(launch, existworkservey.WorkServeyID);
//                 } catch (error) {
//                     return res.status(400).json({ error: error.Message, done: false });
//                 }
//                 res.status(201).json({ done: true });
//             }
//         }
//         else {
//             return res.status(400).json({ error: "NO WorkServey exist in this id", done: false });
//         }
//     }
// }

// async function DownloadWorkServey(req, res) {
//     // const launch = req.file;
//     const body = req.body;
//     const user = req.user;
//     const WorkServeyID = body.WorkServeyID;

//     if (WorkServeyID) {
//         const WorkServey = await existsWorkServeyWithId(WorkServeyID);
//         if (WorkServey) {
//             const fileName = WorkServey.WorkServey_File_name;
//             console.log({ WorkServey });
//             let ends;

//             switch (WorkServey) {
//                 case 'application/pdf':
//                     ends = ".pdf";
//                     break;
//                 case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
//                     ends = ".docx";
//                     break;
//                 case 'application/msword':
//                     break;
//                 default:
//                     break;

//             }

//             const directoryPath = `D:\\projects\\Project_one\\server\\uploads\\` + fileName;
//             console.log({ directoryPath });
//             try {
//                 res.sendFile(directoryPath, fileName + ends, (err) => {
//                     if (err) {
//                         res.status(500).send({
//                             message: "Could not download the file. " + err,
//                         });
//                     }
//                 });
//             } catch (error) {
//                 return res.status(400).json({ error: "Downloading WorkServey Fails", done: false });
//             }
//             // res.status(200).json({ done: true });
//         }
//     }
// }

// async function  httpVerifyAuthorizationToken(req, res) {
//   const token = req.headers ? req.headers?.cookie : null; 
//   var didToken = token ? token.substr(6) : "";
//    if (!didToken) {
//      const bb = req.body;
//      didToken = bb.token ? bb.token.substr(6) : "";;
//     //  console.log({ didToken });
//    }
//   const user = await verifyToken(didToken);
//   console.log({ user });
//   if(!user){
//      return res.status(400).json({
//        error: "The specified password and id is wrong",
//        done: false,
//      });
//   }

//   if (!user.employeeid) {
//     return res.status(400).json({
//       error: "Missing required id property",
//       done: false,
//     });
//   }
//   const id = await existsLaunchWithId(user.employeeid);
//   if (!id) {
//     return res.status(400).json({
//       error: "The specified id doesnt exist in Database",
//       done: false,
//     });
//   }

//   if (!id.password && !user.password) {
//     return res.status(200).json({ done: true });
//   }

//   if (user.password == id.password) {
//     return res.status(200).json({ done: true });
//   }

//   return res
//     .status(400)
//     .json({ error: "The specified password and id is wrong", done: false });
// }

// async function httpDeleteAuthorization(req, res) {
//   const launchId = Number(req.params.id);

//   const existsLaunch = await existsLaunchWithId(launchId);
//   if (!existsLaunch) {
//     return res.status(404).json({
//       error: "Launch not found",
//     });
//   }

//   const aborted = await abortLaunchById(launchId);
//   if (!aborted) {
//     return res.status(400).json({
//       error: "Launch not aborted",
//     });
//   }

//   return res.status(200).json({
//     ok: true,
//   });
// }

module.exports = {

    httpAddNewLanguage,
    httpGetAllLanguages,
    httpEditLanguage,
    httpDeleteLanguage

    // httpAddNewRequest,
    // httpGetAllRequest,
    // httpEditRequest,
    // httpAssignEmployee,
    // httpAssignedWork,
    // httpSubmitServey,
    // DownloadWorkServey
};
