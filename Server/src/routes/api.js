const express = require("express");
const jwt = require("jsonwebtoken");
// var { graphqlHTTP } = require('express-graphql');

const NewLanguageRouter = require("./languages/languages.router");
const NewCourseRouter = require("./courses/course.router");
const NewCurriculumRouter = require("./curriculums/curriculum.router");
const NewPrice_TierRouter = require("./price_tiers/price_tiers.router");
// const schema = require("../scheme/requestscheme");

// const NewRequestRouter = require("./NewRequest/newrequest.router");
// const authorization = require("./authorization/authorization.router");
// const NewProjectRouter = require("./Project/project.router");
// const {
//     existsEmployeeWithId,
// } = require("../models/Authorization.model");

// const { setTokenCookie } = require("../lib/cookies");
// const { verifyToken } = require("../lib/verifytoken");

// const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './uploads')
//     },
//     // filename: function (req, file, cb) {
//     //   // console.log({req});

//     //   cb(null, file.originalname)
//     // }
// })

// const fileFilter = (req, file, cb) => {
//     // console.log({ file });
//     const path = req.path;
//     // console.log({ path });
//     if (req.path === '/authorization/adduser' || req.path === '/authorization/EditUser') {

//         var pattern = /image*/;
//         if (file.mimetype.match(pattern)) {
//             cb(null, true);
//         }
//         else {
//             cb(null, false);
//             cb(new Error('I don\'t have a clue the image you provide is Not Accepted!'))
//         }
//     }
//     else {
//         if (file.mimetype === 'application/msword' || file.mimetype === `application/pdf`
//             || file.mimetype === `application/vnd.openxmlformats-officedocument.wordprocessingml.document`) {
//             cb(null, true);
//         }
//         else {
//             cb(null, false);
//             cb(new Error('I don\'t have a clue!'))
//         }
//     }
// }

// const upload = multer({ storage: storage, fileFilter });

const api = express.Router();

// async function httpVerifyAuthorization(req, res, next) {
//     const body = req.body;
//     if (!body.employeeid) {
//         return res.status(400).json({
//             error: "Missing required id property",
//             done: false,
//         });
//     }
//     else {
//         const user = await existsEmployeeWithId(body.employeeid);
//         console.log({ user });
//         if (user) {
//             if (!user.password && !body.password) {
//                 const token = jwt.sign(
//                     {
//                         ...user,
//                         iat: Math.floor(Date.now() / 1000),
//                         exp: Math.floor(Date.now() / 1000 + 7 * 24 * 60 * 60),
//                     },
//                     process.env.JWT_SECRET
//                 );
//                 // console.log({ user });
//                 req.user = user;
//                 // return res.status(200).json({ done: true });;
//                 // res.write({ done: true });
//                 next();
//                 setTokenCookie(token, res);
//                 // return res.status(200).json({ done: true });
//             }
//             else {
//                 if (body.password == user.password) {
//                     const token = jwt.sign(
//                         {
//                             ...user,
//                             iat: Math.floor(Date.now() / 1000),
//                             exp: Math.floor(Date.now() / 1000 + 7 * 24 * 60 * 60),
//                         },
//                         process.env.JWT_SECRET
//                     );

//                     // console.log({ user });
//                     req.user = user;
//                     // return res.status(200).json({ done: true });
//                     //  res.send({ done: true });
//                     next();
//                     setTokenCookie(token, res);
//                     // return res.status(200).json({ done: true });
//                 }
//                 else {
//                     return res.status(400).json({ error: "The specified password is wrong", done: false });
//                 }
//             }
//         }
//         else {
//             return res.status(400).json({
//                 error: "The specified id doesnt exist in Database",
//                 done: false,
//             });
//         }
//     }
// }

// async function httpVerifyAuthorizationToken(req, res, didToken, next, inbody = 0) {
//     const user = await verifyToken(didToken);
//     if (user) {
//         const employeeid = inbody === 0 ? user._doc.employeeid : user.employeeid;
//         if (employeeid) {
//             const id = await existsEmployeeWithId(employeeid);
//             if (id) {
//                 if (!id.password && !user.password) {
//                     req.user = inbody === 0 ? user._doc : user;
//                     // res.status(200).json({ done: true });
//                     next();
//                 }
//                 else {
//                     if (user.password == id.password) {
//                         req.user = inbody === 0 ? user._doc : user;
//                         // res.status(200).json({ done: true });
//                         next();
//                     }
//                 }
//             }
//             else {
//                 return res.status(400).json({
//                     error: "The specified id doesnt exist in Database",
//                     done: false,
//                 });
//             }
//         }
//         else {
//             return res.status(400).json({
//                 error: "Missing required id property",
//                 done: false,
//             });
//         }
//     }
//     else {
//         return res.status(400).json({
//             error: "The specified password and id is wrong",
//             done: false,
//         });
//     }
// }

// api.use(upload.single('launch'));
// api.use(async (req, res, next) => {
//     const body = req.body;
//     if (body.employeeid || body.password) {
//         console.log("Enter id And Password");
//         await httpVerifyAuthorization(req, res, next);
//     }
//     else {
//         const token = req.headers ? req.headers?.cookie : null;
//         const didToken = token ? token.substr(6) : "";
//         if (didToken) {
//             console.log("In the cookie DidToken");
//             await httpVerifyAuthorizationToken(req, res, didToken, next);
//         }
//         else {
//             const bb = req.body;
//             const didToken = bb.token ? bb.token.substr(6) : "";
//             if (didToken) {
//                 console.log("In the body DidToken");
//                 console.log({ didToken });
//                 const inbody = 1;
//                 await httpVerifyAuthorizationToken(req, res, didToken, next, inbody);
//             }
//             else {
//                 return res.status(400).json({
//                     error: "Please Specfic Your ID And Password",
//                     done: false,
//                 });
//             }
//         }

//     }
// });

api.use("/languages", NewLanguageRouter);
api.use("/courses", NewCourseRouter);
api.use("/curriculums", NewCurriculumRouter);
api.use("/price_tiers", NewPrice_TierRouter),
// api.use("/Request", NewRequestRouter);
// api.use("/Project", NewProjectRouter);

module.exports = api;
