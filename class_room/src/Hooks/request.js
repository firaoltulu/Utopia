import { jsx } from '@emotion/react';
// import download from 'downloadjs';
import axios from 'axios';
const API_URL = "http://localhost:8014/v1";
const FormData = require('form-data');

async function GetAllLanguages(skip = 0, limit = 10) {

    var graphql = JSON.stringify({
        query: `{
                Languages{
                    LanguageID,
                    Title,
                    EnglishTitle,
                    AddedDate,
                    ModifedDate
                }
             }`,
        variables: { "skip": skip, "limit": limit },
    })

    var requestOptions = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: graphql,
        redirect: 'follow'
    };

    var fetchedresponse;
    var response;

    try {
        response = await fetch(`${API_URL}/languages/graphql/languages`, requestOptions);
        fetchedresponse = await response.json();
    } catch (error) {
        return {
            done: false,
        };
    }
    if (response.status === 200) {
        return {
            fetcheddata: fetchedresponse,
            done: true
        };
    }
    else {
        return {
            done: false
        };
    }

};

async function GetCourse(CourseID = -1) {

    if (CourseID > -1) {

        var graphql = JSON.stringify({
            query: `{
                    Course(CourseID:${CourseID}){
                        CourseID
                        Titles{
                          Title
                          LanguageID
                        }
                        Discriptions{
                          Discription
                          LanguageID
                        }
                        CourseLevel
                        CourseLanguage
                        Lecturers{
                            LecturerName
                          }
                          Goals{
                            GoalID
                            Goal
                            LanguageID
                          }
                          Requirements{
                            Requirement
                            RequirementID
                            AddedDate
                            ModifyDate            
                            LanguageID
                          }
                          IntendedLearners{
                            IntendedLearnerID
                            IntendedLearner
                            LanguageID
                            AddedDate
                            ModifyDate 
                          }
                          Image1 {
                            ImageID
                            OrginalName
                            FieldName
                            MimeType
                          }
                          Image2 {
                            ImageID
                            OrginalName
                            FieldName
                            MimeType
                          }
                          Image3 {
                            ImageID
                            OrginalName
                            FieldName
                            MimeType
                          }
                          Image4 {
                            ImageID
                            OrginalName
                            FieldName
                            MimeType
                          }
                      }
                }`,
        });

        var requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: graphql,
            redirect: 'follow'
        };

        var fetchedresponse;
        try {

            const response = await fetch(`${API_URL}/courses/graphql/courses`, requestOptions);
            fetchedresponse = await response.json();
            if (response.status === 200) {
                return {
                    fetcheddata: fetchedresponse,
                    done: true
                };
            }
            else {
                return {
                    done: false
                };
            }

        } catch (error) {
            return error;
        }
    }

};

async function GetCurriculumItem(CourseID = -1, CurriculumID = -1) {

    if (CourseID > -1 && CurriculumID > -1) {

        var graphql = JSON.stringify({
            query: `{
                Curriculum(CourseID: ${CourseID},CurriculumID: ${CurriculumID}) {
                      CourseID
                      CurriculumID
                      LanguageID
                      Modules {
                        ModuleID
                        Title
                        Objective
                        Lectures {
                          LectureID
                          Type
                          Title
                          Discription
                          Content_Type
                          Content
                          Extra_Resource{
                            Extra_Resource_ID
                            Resource_Content
                            Resource_Content_type
                          }
                          Quiz_content {
                            QuestionID
                            Question
                            Answer {
                              AnswerID
                              AnswerTitle
                              AnswerDiscription
                              RightAnswer
                              AddedDate
                              ModifyDate
                            }
                            AddedDate
                            ModifyDate
                          }
                          AddedDate
                          ModifyDate
                        }
                        AddedDate
                        ModifyDate
                      }
                      AddedDate
                      ModifyDate
                    }
                }`,
        });

        var requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: graphql,
            redirect: 'follow'
        };

        var fetchedresponse;
        var response;

        try {

            response = await fetch(`${API_URL}/curriculums/graphql/curriculum`, requestOptions);
            fetchedresponse = await response.json();

        } catch (error) {
            return {
                done: false,
            };
        }
        if (response.status === 200) {
            return {
                fetcheddata: fetchedresponse,
                done: true
            };
        }
        else {
            return {
                done: false
            };
        }
    }

};

async function GetLectureItem(CourseID = -1, CurriculumID = -1, ModuleID = -1, LectureID = -1) {

    if (CourseID > -1 && CurriculumID > -1 && ModuleID > -1 && LectureID > -1) {

        var graphql = JSON.stringify({
            query: `{
                Lecture(CourseID:${CourseID},CurriculumID:${CurriculumID},ModuleID:${ModuleID},LectureID:${LectureID}){
                    LectureID
                    Title
                    Type
                    Discription
                    Content
                    Content_Type
                    AddedDate
                    ModifyDate
                    Extra_Resource{
                      Extra_Resource_ID
                      Resource_Content
                      Resource_Content_type
                    }
                  }
                }`,
        });

        var requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: graphql,
            redirect: 'follow'
        };

        var fetchedresponse;
        var response;

        try {

            response = await fetch(`${API_URL}/curriculums/graphql/curriculum`, requestOptions);
            fetchedresponse = await response.json();

        } catch (error) {
            return {
                done: false,
            };
        }
        if (response.status === 200) {
            return {
                fetcheddata: fetchedresponse,
                done: true
            };
        }
        else {
            return {
                done: false
            };
        }
    }

};

async function GetStreamCurriculumModuleLectureVideoContent(request, file_type = '') {

    try {

        var response;
        var formdata = new FormData();
        formdata.append("CourseID", request.CourseID);
        formdata.append("CurriculumID", request.CurriculumID);
        formdata.append("ModuleID", request.ModuleID);
        formdata.append("LectureID", request.LectureID);

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow',
        };

        response = await fetch(`${API_URL}/curriculums/StreamCurriculumModuleLectureVideoContent`, requestOptions);
        const reader = response.body.getReader();
        let chunks = [];
        let imageuri = "";

        reader.read().then(function processImage({ done, value }) {

            if (done) {
                const blob = new Blob([chunks]);

                imageuri = URL.createObjectURL(blob);
                request.seturl(imageuri);
                // controller.close();
                return false;
            }

            const tempArray = new Uint8Array(chunks.length + value.length);
            tempArray.set(chunks);
            tempArray.set(value, chunks.length);
            chunks = tempArray;
            console.log({ chunks });
            // controller.enqueue(value);
            return reader.read().then(processImage);

        });

        console.log({ chunks })

        return imageuri;

    } catch (err) {
        console.log({ response });
        return {
            done: false,
        };
    }
    // return {
    //     url: response,
    //     done: true,
    // };

};

export {
    GetAllLanguages,
    GetCourse,
    GetCurriculumItem,
    GetLectureItem,
    GetStreamCurriculumModuleLectureVideoContent
};

