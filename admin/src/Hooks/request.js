import { jsx } from '@emotion/react';
// import download from 'downloadjs';
import axios from 'axios';
const API_URL = "http://localhost:8014/v1";
const FormData = require('form-data');


async function AddNewLanguage(language = null) {

    if (language !== null) {

        let response;
        var formdata = new FormData();
        var newobj = JSON.stringify(language);
        formdata.append("language", language);

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        try {

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: newobj,
                redirect: 'follow',

            };

            response = await fetch(`${API_URL}/languages/AddNewLanguage`, requestOptions);

        } catch (err) {

            return {
                done: false,
            };
        }
        return {
            done: true,
        };

    } else {
        return {
            done: false,
        };
    }
}

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

}

async function EditLanguage(LanguageID, language = null) {

    if (language !== null) {

        let response;
        var formdata = new FormData();
        const newobj = Object.assign({}, {
            LanguageID: LanguageID,
            title: language.title,
            titleenglish: language.titleenglish
        });
        // formdata.append("LanguageID", LanguageID);
        // formdata.append("language",newobj);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        try {
            var requestOptions = {
                method: 'POST',
                body: JSON.stringify(newobj),
                redirect: 'follow',
                headers: myHeaders,
            };
            response = await fetch(`${API_URL}/languages/EditLanguage`, requestOptions);
        } catch (err) {
            return {
                done: false
            };
        }
        return {
            done: true,
        };
    }
    else {
        return {
            done: false,
        };
    }

}

async function httpAbortLanguage(LanguageID) {
    var response;
    try {
        response = await fetch(`${API_URL}/languages/DeleteLanguage/${LanguageID}`, {
            method: "delete",
        });

    } catch (err) {

        return {
            done: false
        };
    }
    if (response.status === 200) {
        return {
            done: true
        };
    }
    else {
        return {
            done: false
        };
    }
}

async function AddNewCourse(request) {

    console.log({ request });
    let response;
    var formdata = new FormData();
    formdata.append("Titles", JSON.stringify([...request.Titles]));
    formdata.append("Discriptions", JSON.stringify([...request.Discriptions]));

    formdata.append("courselanguage", request.courselanguage);
    formdata.append("courselevel", request.courselevel);

    // if (request.type === 1) {
    //     formdata.append("Request_letter_ref_number", request.latternumber);
    //     formdata.append("launch", request.file, request.file.name)
    // }

    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    try {
        response = await fetch(`${API_URL}/courses/AddNewCourse`, requestOptions);
    } catch (err) {
        console.log({ response });
        return {
            done: false,
        };
    }
    if (response.status === 200) {
        return {
            done: true
        };
    }
    else {
        return {
            done: false
        };
    }
}

async function GetAllCourses(skip = 0, limit = 10) {

    var graphql = JSON.stringify({
        query: `
        {
            Courses{
                CourseID,
                Titles{
                  Title
                  LanguageID
                },
                Discriptions{
                  Discription
                  LanguageID
                },
                Image1 {
                    ImageID
                    OrginalName
                    FieldName
                    MimeType
                },
                AddedDate,
                CourseLevel,
                CourseLanguage
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
        response = await fetch(`${API_URL}/courses/graphql/courses`, requestOptions);
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

}

async function HttpEditCourse(request) {

    console.log({ request });
    let response;
    var formdata = new FormData();
    formdata.append("LanguageID", request.LanguageID);
    formdata.append("Which", request.Which);
    formdata.append("CourseID", request.CourseID);
    formdata.append("Update", request.update);

    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    try {
        response = await fetch(`${API_URL}/courses/EditCourses`, requestOptions);
    } catch (err) {
        console.log({ response });
        return {
            done: false,
        };
    }
    if (response.status === 200) {
        return {
            done: true
        };
    }
    else {
        return {
            done: false
        };
    }
}

async function AddNewCurriculumItem(request) {

    console.log({ request });
    let response;
    var formdata = new FormData();
    formdata.append("Title", request.Title);
    formdata.append("Objective", request.Objective);

    formdata.append("CourseID", request.CourseID);
    formdata.append("LanguageID", request.LanguageID);

    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    try {
        response = await fetch(`${API_URL}/curriculums/AddNewCurriculumItem`, requestOptions);
    } catch (err) {
        console.log({ response });
        return {
            done: false,
        };
    }
    if (response.status === 200) {
        return {
            done: true
        };
    }
    else {
        return {
            done: false
        };
    }
}

async function GetCurriculumItem(CourseID = -1) {

    if (CourseID > -1) {

        var graphql = JSON.stringify({
            query: `{
                    Curriculums(CourseID: ${CourseID}) {
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

}

async function HttpEditCurriculumModule(request) {

    console.log({ request });
    let response;
    var formdata = new FormData();
    formdata.append("Title", request.Title);
    formdata.append("Objective", request.Objective);
    formdata.append("CourseID", request.CourseID);
    formdata.append("ModuleID", request.ModuleID);
    formdata.append("CurriculumID", request.CurriculumID);

    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    try {
        response = await axios.post(`${API_URL}/curriculums/EditCurriculumModuleItem`, formdata);
    } catch (err) {
        return {
            done: false,
        };
    }
    if (response.status === 200) {
        console.log({ response });
        return {
            done: true,
            Curriculum: response.data.Curriculum
        };
    }
    else {
        return {
            done: false
        };
    }
}

async function HttpEditCurriculumModuleIndex(request) {

    console.log({ request });
    let response;
    var formdata = new FormData();
    formdata.append("CourseID", request.CourseID);
    formdata.append("CurriculumID", request.CurriculumID);
    formdata.append("Module", JSON.stringify([...request.Module]));

    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    try {
        response = await axios.post(`${API_URL}/curriculums/EditCurriculumModuleIndex`, formdata);
    } catch (err) {
        return {
            done: false,
        };
    }
    if (response.status === 200) {
        return {
            done: true,
            Curriculum: response.data.Curriculum
        };
    }
    else {
        return {
            done: false
        };
    }
}

async function AddNewCurriculumModuleLectureItem(request) {

    let response;
    var formdata = new FormData();

    formdata.append("CourseID", request.CourseID);
    formdata.append("Title", request.Title);
    formdata.append("Description", request.Description);
    formdata.append("Type", request.Type);
    formdata.append("CurriculumID", request.CurriculumID);
    formdata.append("ModuleID", request.ModuleID);


    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    try {
        response = await axios.post(`${API_URL}/curriculums/AddNewCurriculumModuleLectureItem`, formdata);
    } catch (err) {
        return {
            done: false,
        };
    }
    if (response.status === 200) {
        return {
            done: true,
            Curriculum: response.data.Curriculum
        };
    }
    else {
        return {
            done: false
        };
    }
}

async function HttpEditCurriculumModuleLectureItem(request) {

    let response;
    var formdata = new FormData();
    formdata.append("Title", request.Title);
    formdata.append("Discription", request.Discription);
    formdata.append("CourseID", request.CourseID);
    formdata.append("ModuleID", request.ModuleID);
    formdata.append("CurriculumID", request.CurriculumID);
    formdata.append("LectureID", request.LectureID);

    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    try {
        response = await axios.post(`${API_URL}/curriculums/EditCurriculumModuleLectureItem`, formdata);
    } catch (err) {
        return {
            done: false,
        };
    }
    if (response.status === 200) {
        return {
            done: true,
            Curriculum: response.data.Curriculum
        };
    }
    else {
        return {
            done: false
        };
    }

}

async function GetCurriculumModuleItem(CourseID = -1, ModuleID = -1) {

    if (CourseID > -1 && ModuleID > -1) {

        var graphql = JSON.stringify({
            query: `{
                Module(CourseID: ${CourseID},ModuleID:${105}) {
                        Title
                        Objective
                        Lectures{
                        LectureID
                        }
                        AddedDate
                        ModuleID
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
        try {
            const response = await fetch(`${API_URL}/curriculums/graphql/curriculum`, requestOptions);
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

}

async function HttpEditCurriculumModuleLectureIndex(request) {

    console.log({ request });
    let response;
    var formdata = new FormData();
    formdata.append("CourseID", request.CourseID);
    formdata.append("CurriculumID", request.CurriculumID);
    formdata.append("ModuleID", request.ModuleID);
    formdata.append("Lecture", JSON.stringify([...request.Lecture]));

    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    try {
        response = await axios.post(`${API_URL}/curriculums/EditCurriculumModuleLectureIndex`, formdata);
    } catch (err) {
        return {
            done: false,
        };
    }
    if (response.status === 200) {
        return {
            done: true,
            Curriculum: response.data.Curriculum
        };
    }
    else {
        return {
            done: false
        };
    }
}

async function HttpAddCurriculumModuleLectureItemContent(request) {

    console.log({ request });
    let response;
    var formdata = new FormData();
    formdata.append("LectureID", request.LectureID);
    formdata.append("CourseID", request.CourseID);
    formdata.append("CurriculumID", request.CurriculumID);
    formdata.append("ModuleID", request.ModuleID);
    formdata.append("Type", request.Type);
    formdata.append("NewFile", request.newFile, request.newFile.name)

    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',

    };

    const config = {
        onUploadProgress: (progressEvent) => {
            var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            request.setUploadprogress(percentCompleted);
        }
    };

    try {
        response = await axios.post(`${API_URL}/curriculums/AddCurriculumModuleLectureContent`, formdata, config);
        // response = await fetch(`${API_URL}/curriculums/AddCurriculumModuleLectureContent`, requestOptions);
    } catch (err) {
        console.log({ response });
        return {
            done: false,
        };
    }
    if (response.status === 200) {
        return {
            done: true,
            Curriculum: response.data.Curriculum
        };
    }
    else {
        return {
            done: false
        };
    }

}

async function GetCurriculumModuleLectureItem(CourseID = -1, ModuleID = -1, LectureID = -1) {

    if (CourseID > -1 && ModuleID > -1 && LectureID > -1) {

        var graphql = JSON.stringify({
            query: `{
                     Lecture(CourseID: ${CourseID},ModuleID:${105},LectureID:${100}) {
                        LectureID
                        Type
                        Title
                        Discription
                        Content_Type
                        Content
                        Resource_Content
                        Resource_Content_type
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
        try {
            const response = await fetch(`${API_URL}/curriculums/graphql/curriculum`, requestOptions);
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

}

async function GetStreamCurriculumModuleLectureContent(request, file_type = '') {
    try {
        var response;
        var formdata = new FormData();
        formdata.append("LectureID", request.LectureID);
        formdata.append("CourseID", request.CourseID);
        formdata.append("CurriculumID", request.CurriculumID);
        formdata.append("ModuleID", request.ModuleID);

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow',

        };

        response = await fetch(`${API_URL}/curriculums/StreamCurriculumModuleLectureContent`, requestOptions);
        const reader = response.body.getReader();
        let chunks = [];
        let imageuri = "";

        await reader.read().then(function processImage({ done, value }) {

            if (done) {
                const blob = new Blob([chunks]);

                imageuri = URL.createObjectURL(blob);
                // setemployeeImage(imageuri);
                // controller.close();
                return false;
            }

            const tempArray = new Uint8Array(chunks.length + value.length);
            tempArray.set(chunks);
            tempArray.set(value, chunks.length);
            chunks = tempArray;
            // controller.enqueue(value);
            return reader.read().then(processImage);
        });

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

}

async function HttpAddCurriculumModuleLectureItemContentExtraResource(request) {

    console.log({ request });
    let response;
    var formdata = new FormData();
    formdata.append("LectureID", request.LectureID);
    formdata.append("CourseID", request.CourseID);
    formdata.append("CurriculumID", request.CurriculumID);
    formdata.append("ModuleID", request.ModuleID);
    formdata.append("NewFile", request.newFile, request.newFile.name)

    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',

    };

    const config = {
        onUploadProgress: (progressEvent) => {
            var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            request.setUploadprogress(percentCompleted);
        }
    };

    try {
        response = await axios.post(`${API_URL}/curriculums/AddCurriculumModuleLectureContentExtraResource`, formdata, config);
        // response = await fetch(`${API_URL}/curriculums/AddCurriculumModuleLectureContent`, requestOptions);
    } catch (err) {
        return {
            done: false,
        };
    }
    if (response.status === 200) {
        return {
            done: true,
            Curriculum: response.data.Curriculum
        };
    }
    else {
        return {
            done: false
        };
    }
}

async function HttpDeleteCurriculumModuleLectureContentExtraResource(request) {

    let response;
    var formdata = new FormData();
    formdata.append("LectureID", request.LectureID);
    formdata.append("CourseID", request.CourseID);
    formdata.append("CurriculumID", request.CurriculumID);
    formdata.append("ModuleID", request.ModuleID);
    formdata.append("Extra_Resource_ID", request.Extra_Resource_ID);

    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',

    };

    try {
        // response = await axios.post(`${API_URL}/curriculums/`, formdata);
        response = await axios.post(`${API_URL}/curriculums/DeleteCurriculumModuleLectureContentExtraResource`, formdata);
    } catch (err) {
        console.log({ response });
        return {
            done: false,
        };
    }
    if (response.status === 200) {
        return {
            done: true,
            Curriculum: response.data.Curriculum
        };
    }
    else {
        return {
            done: false
        };
    }

}

async function AddNewCurriculumModuleQuestionItem(request) {

    let response;
    var formdata = new FormData();
    formdata.append("Answer", JSON.stringify([...request.Answer]));
    formdata.append("Question", request.Question);

    formdata.append("CourseID", request.CourseID);
    formdata.append("CurriculumID", request.CurriculumID);
    formdata.append("ModuleID", request.ModuleID);
    formdata.append("LectureID", request.LectureID);

    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    try {
        response = await axios.post(`${API_URL}/curriculums/AddNewCurriculumModuleQuestionItem`, formdata);
    } catch (err) {
        return {
            done: false,
        };
    }
    if (response.status === 200) {
        return {
            done: true,
            Curriculum: response.data.Curriculum
        };
    }
    else {
        return {
            done: false
        };
    }
}

async function GetCurriculumModuleLectureQuestionsItem(CourseID = -1, CurriculumID = -1, ModuleID = -1, LectureID = -1) {

    if (CourseID > -1 && ModuleID > -1 && LectureID > -1 && CurriculumID > -1) {

        var graphql = JSON.stringify({
            query: `{
                Questions(CourseID: ${CourseID},CurriculumID: ${CurriculumID},ModuleID:${ModuleID},LectureID:${LectureID}) {
                    Question
                    QuestionID
                    Answer{
                      AnswerID
                      AnswerTitle
                      AnswerDiscription
                      RightAnswer
                    }
                    AddedDate
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
            const response = await fetch(`${API_URL}/curriculums/graphql/curriculum`, requestOptions);
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

}

async function HttpEditCurriculumModuleQuestionItem(request) {

    let response;
    var formdata = new FormData();
    formdata.append("Title", request.Title);
    formdata.append("Discription", request.Discription);
    formdata.append("CourseID", request.CourseID);
    formdata.append("CurriculumID", request.CurriculumID);
    formdata.append("ModuleID", request.ModuleID);
    formdata.append("LectureID", request.LectureID);

    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    try {

        response = await axios.post(`${API_URL}/curriculums/EdiCurriculumModuleQuestionItem`, formdata);

    } catch (err) {
        return {
            done: false,
        };
    }
    if (response.status === 200) {
        return {
            done: true,
            Curriculum: response.data.Curriculum
        };
    }
    else {
        return {
            done: false
        };
    }

};

async function EditNewCurriculumModuleQuestionItemContent(request) {

    let response;
    var formdata = new FormData();
    formdata.append("Answer", JSON.stringify([...request.Answer]));
    formdata.append("Question", request.Question);

    formdata.append("CourseID", request.CourseID);
    formdata.append("CurriculumID", request.CurriculumID);
    formdata.append("ModuleID", request.ModuleID);
    formdata.append("LectureID", request.LectureID);
    formdata.append("QuestionID", request.QuestionID);

    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    try {
        response = await fetch(`${API_URL}/curriculums/EditNewCurriculumModuleQuestionItemContent`, requestOptions);
    } catch (err) {
        console.log({ response });
        return {
            done: false,
        };
    }
    if (response.status === 200) {
        return {
            done: true
        };
    }
    else {
        return {
            done: false
        };
    }
};

async function HttpEditCourseContent(request) {

    console.log({ request });
    let response;
    var formdata = new FormData();
    formdata.append("CourseID", request.CourseID);

    formdata.append("Requirements", JSON.stringify([...request.Requirements]));
    formdata.append("Goals", JSON.stringify([...request.Goals]));
    formdata.append("IntendedLearners", JSON.stringify([...request.IntendedLearners]));

    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    try {

        response = await fetch(`${API_URL}/courses/EditCourseContent`, requestOptions);

    } catch (err) {
        console.log({ response });
        return {
            done: false,
        };
    }
    if (response.status === 200) {
        response = await response.json()
        return {
            done: true,
            course: response.course
        };
    }
    else {
        return {
            done: false
        };
    }
};

async function HttpEditCourseContentImage(request) {

    console.log({ request });
    let response;
    var formdata = new FormData();

    formdata.append("CourseID", request.CourseID);
    formdata.append("Which", request.Type);
    formdata.append("NewImage", request.newFile, request.newFile.name);

    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',

    };

    const config = {
        onUploadProgress: (progressEvent) => {
            var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            request.setUploadprogress(percentCompleted);
        }
    };

    try {

        response = await axios.post(`${API_URL}/courses/EditCourseContent`, formdata, config);

        if (!response.data.done) {
            return {
                done: false,
                reason: response.data.reason
            };
        }

    } catch (err) {

        return {
            done: false,
            // reason: response.reason
        };

    }
    return {
        done: true,
        course: response.data.course
    };

};

async function GetStreamCourseCover(request) {

    try {
        var response;
        var formdata = new FormData();
        // formdata.append("ImageID", request.ImageID);

        var requestOptions = {
            method: 'GET',
            redirect: 'follow',
            // body: formdata,
        };

        response = await fetch(`${API_URL}/courses/StreamCourseCover/${request.ImageID}`, requestOptions);

        const reader = response.body.getReader();
        let chunks = [];
        let imageuri = "";

        await reader.read().then(function processImage({ done, value }) {

            if (done) {
                const blob = new Blob([chunks]);

                imageuri = URL.createObjectURL(blob);
                return false;
            }

            const tempArray = new Uint8Array(chunks.length + value.length);
            tempArray.set(chunks);
            tempArray.set(value, chunks.length);
            chunks = tempArray;
            // controller.enqueue(value);
            return reader.read().then(processImage);
        });

        // return imageuri;

        return {
            url: imageuri,
            done: true,
        };

    } catch (err) {
        console.log({ response });
        return {
            done: false,
        };
    }


};

async function AddNewPrice_Tier(Price_Tier = null) {

    if (Price_Tier !== null) {

        let response;
        var formdata = new FormData();
        var newobj = JSON.stringify(Price_Tier);
        formdata.append("Price_Tier", newobj);

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        try {

            var requestOptions = {
                // method: 'POST',
                headers: myHeaders,
                body: newobj,
                redirect: 'follow',
            };

            const config = {
                onUploadProgress: (progressEvent) => {

                }
            };

            response = await axios.post(`${API_URL}/price_tiers/AddNewPrice_tiers`, formdata, config);

            // console.log({ response });

            if (response.status === 200) {
                return {
                    done: true,
                    reason: 0,
                    result: response.data.result,
                };
            }
            else {
                return {
                    done: false,
                    reason: 0,
                    result: response.data.result,
                };
            }

        } catch (err) {
            return {
                done: false,
                reason: err.response.data.reason
            };
        }

    } else {

        return {
            done: false,
        };

    }

};

async function GetAllPrice_Tiers(skip = 0, limit = 10) {

    var requestOptions = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
        // body: graphql,
        redirect: 'follow'
    };

    var fetchedresponse;
    var response;

    try {

        response = await fetch(`${API_URL}/price_tiers/GetAllPrice_tiers`, requestOptions);
        fetchedresponse = await response.json();
        console.log({ fetchedresponse });

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

async function EditPrice_Tier(Price_Tier = null) {

    if (Price_Tier !== null) {

        let response;
        var formdata = new FormData();
        var newobj = JSON.stringify(Price_Tier);
        formdata.append("Price_Tier", newobj);

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        try {

            var requestOptions = {
                // method: 'POST',
                headers: myHeaders,
                body: newobj,
                redirect: 'follow',
            };

            const config = {
                onUploadProgress: (progressEvent) => {

                }
            };

            response = await axios.post(`${API_URL}/price_tiers/EditPrice_tiers`, formdata, config);

            // console.log({ response });

            if (response.status === 200) {
                return {
                    done: true,
                    reason: 0,
                    result: response.data.result,
                };
            }
            else {
                return {
                    done: false,
                    reason: response.data.reason,
                    result: null,
                };
            }

        } catch (err) {

            console.log({ err });

            return {
                done: false,
                reason: err.response.data.reason,
                result: null
            };

        }

    } else {

        return {
            done: false,
            reason: 0,
            result: null
        };

    }

};


// async function EditRequest(request) {
//     const authuser = localStorage.getItem("user");
//     if (authuser) {
//         const usertoken = `token=${authuser}`;
//         let response;
//         var formdata = new FormData();
//         formdata.append("RequestID", request.RequestID);
//         formdata.append("Projectname", request.projectname);
//         formdata.append("Companyname", request.companyname);
//         formdata.append("startdate", request.startdate);
//         formdata.append("enddate", request.enddate);
//         formdata.append("projectleader", JSON.stringify([...request.projectleader]));
//         formdata.append("projectteams", JSON.stringify([...request.projectteams]));
//         formdata.append("Department", request.department);
//         formdata.append("Type_of_Request", request.type === 1 ? "letter" : "Voice");
//         formdata.append("description", request.Description);
//         formdata.append("token", usertoken);
//         if (request.type === 1) {
//             formdata.append("Request_letter_ref_number", request.latternumber);
//             if (!request.file && !request.file.name) {
//                 return {
//                     done: false,
//                 };
//             }
//             formdata.append("launch", request.file, request.file.name);
//         }
//         var requestOptions = {
//             method: 'POST',
//             body: formdata,
//             redirect: 'follow'
//         };
//         console.log("In the requests file client side");
//         console.log({ request });
//         try {
//             response = await fetch(`${API_URL}/Request/EditRequest`, requestOptions);
//         } catch (err) {
//             console.log({ response });
//             return {
//                 done: false,
//             };
//         }
//         return {
//             done: true,
//         };


//     } else {

//     }
// }

// async function VerifyUsers(user) {
//     let response;
//     try {
//         response = await fetch(`${API_URL}/authorization`, {
//             method: "post",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(user),
//         });
//     } catch (err) {
//         return {
//             ok: false,
//         };
//     }
//     const res = await response.json();
//     console.log({ res });
//     localStorage.setItem("user", res.token);
//     return res;
// }

// async function AuthUsers(usertoken) {
//     let response;
//     try {
//         response = await fetch(`${API_URL}/authorization/AuthUsers`, {
//             method: "post",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 token: usertoken,
//             }),
//         });
//     } catch (err) {
//         return {
//             ok: false,
//         };
//     }
//     return await response.json();
// }

// async function EditUser(user, file = null) {
//     const authuser = localStorage.getItem("user");
//     if (authuser) {
//         const usertoken = `token=${authuser}`;
//         let response;
//         var formdata = new FormData();
//         formdata.append("user", JSON.stringify(user));
//         formdata.append("token", usertoken);
//         if (file !== null) {
//             formdata.append("launch", file, file.name);
//         }

//         console.log({ formdata });
//         try {
//             var requestOptions = {
//                 method: 'POST',
//                 body: formdata,
//                 redirect: 'follow',
//                 "Content-Type": "application/json"
//             };
//             response = await fetch(`${API_URL}/authorization/EditUser`, requestOptions);
//         } catch (err) {
//             return {
//                 ok: false,
//             };
//         }
//         return {
//             ok: true,
//         };
//     } else {

//     }
// }

// async function AddNewRequest(request) {

//     const authuser = localStorage.getItem("user");
//     if (authuser) {
//         console.log({ request });
//         const usertoken = `token=${authuser}`;
//         let response;
//         var formdata = new FormData();
//         formdata.append("Projectname", request.projectname);
//         formdata.append("Companyname", request.companyname);
//         formdata.append("startdate", request.startdate);
//         formdata.append("enddate", request.enddate);
//         formdata.append("projectleader", JSON.stringify([...request.projectleader]));
//         formdata.append("projectteams", JSON.stringify([...request.projectteams]));
//         formdata.append("Department", request.department);
//         formdata.append("Type_of_Request", request.type === 1 ? "letter" : "Voice");
//         formdata.append("description", request.description);
//         formdata.append("token", usertoken);
//         if (request.type === 1) {
//             formdata.append("Request_letter_ref_number", request.latternumber);
//             formdata.append("launch", request.file, request.file.name)
//         }
//         var requestOptions = {
//             method: 'POST',
//             body: formdata,
//             redirect: 'follow'
//         };
//         try {
//             response = await fetch(`${API_URL}/Request/AddNewRequest`, requestOptions);
//         } catch (err) {
//             console.log({ response });
//             return {
//                 done: false,
//             };
//         }
//         return {
//             done: true,
//         };
//     }
//     else {

//     }
// }

// async function httpGetRequest(RequestID) {
//     const authuser = localStorage.getItem("user");
//     if (authuser) {
//         const usertoken = `token=${authuser}`;
//         var graphql = JSON.stringify({
//             query: `{
//         Request(RequestID:${RequestID}){
//           RequestID,
//           Companyname,
//           Department,
//           Description,
//           Request_letter_ref_number,
//           Requested_date,
//           Type_of_Request,
//           Request_letter_ref_image{
//             RequestImageID,
//             File_name,
//             ContentType,
//           },
//           Work_servey{
//             WorkServeyID,
//             AssignedEmployee,
//             WorkServey_submit_date,
//             contentType,
//             WorkServey_File_name,
//           },
//           Task,
//         }
//       }`,
//             token: usertoken
//         });

//         var requestOptions = {
//             method: 'POST',
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: graphql,
//             redirect: 'follow'
//         };

//         var fetchedresponse;
//         try {
//             const response = await fetch(`${API_URL}/Request/graphql`, requestOptions);
//             fetchedresponse = await response.json();

//         } catch (error) {
//             return error;
//         }
//         return fetchedresponse;
//     }
//     else {

//     }
// }

// async function EditRequest(request) {
//     const authuser = localStorage.getItem("user");
//     if (authuser) {
//         const usertoken = `token=${authuser}`;
//         let response;
//         var formdata = new FormData();
//         formdata.append("RequestID", request.RequestID);
//         formdata.append("Projectname", request.projectname);
//         formdata.append("Companyname", request.companyname);
//         formdata.append("startdate", request.startdate);
//         formdata.append("enddate", request.enddate);
//         formdata.append("projectleader", JSON.stringify([...request.projectleader]));
//         formdata.append("projectteams", JSON.stringify([...request.projectteams]));
//         formdata.append("Department", request.department);
//         formdata.append("Type_of_Request", request.type === 1 ? "letter" : "Voice");
//         formdata.append("description", request.Description);
//         formdata.append("token", usertoken);
//         if (request.type === 1) {
//             formdata.append("Request_letter_ref_number", request.latternumber);
//             if (!request.file && !request.file.name) {
//                 return {
//                     done: false,
//                 };
//             }
//             formdata.append("launch", request.file, request.file.name);
//         }
//         var requestOptions = {
//             method: 'POST',
//             body: formdata,
//             redirect: 'follow'
//         };
//         console.log("In the requests file client side");
//         console.log({ request });
//         try {
//             response = await fetch(`${API_URL}/Request/EditRequest`, requestOptions);
//         } catch (err) {
//             console.log({ response });
//             return {
//                 done: false,
//             };
//         }
//         return {
//             done: true,
//         };


//     } else {

//     }
// }

// async function EmployeeImageStream(employeeid, file_type) {
//     const authuser = localStorage.getItem("user");

//     if (authuser) {
//         const usertoken = `token=${authuser}`;
//         if (file_type) {
//             var requestOptions = {
//                 method: 'POST',
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ employeeid: employeeid, token: usertoken }),
//                 redirect: 'follow'
//             };
//             const response = await fetch(`${API_URL}/authorization/GetEmployeeImage`, requestOptions);
//             const reader = response.body.getReader();
//             let chunks = [];
//             let imageuri = "";

//             await reader.read().then(function processImage({ done, value }) {
//                 // If there is no more data to read
//                 if (done) {
//                     const blob = new Blob([chunks], { type: file_type });

//                     imageuri = URL.createObjectURL(blob);
//                     // setemployeeImage(imageuri);

//                     // controller.close();
//                     return false;
//                 }

//                 const tempArray = new Uint8Array(chunks.length + value.length);
//                 tempArray.set(chunks);
//                 tempArray.set(value, chunks.length);
//                 chunks = tempArray;
//                 // controller.enqueue(value);
//                 return reader.read().then(processImage);
//             });

//             return imageuri;
//         }
//         else {
//             return;
//         }

//     } else {

//     }

// }

// async function httpGetAllEmployees(department = 0) {
//     const authuser = localStorage.getItem("user");
//     if (authuser) {
//         const usertoken = `token=${authuser}`;
//         var graphql = JSON.stringify({
//             query: `{
//         Employees {
//           employeeid,
//           File_name,
//           File_content_type
//           authorization
//           department
//           Personal{
//               firstname
//               fathername
//               Nationality
//               grandfathername
//               age
//               Religion
//               Spouse
//               Tellphone
//               maritial_Status
//           }
//           Emergency{
//               firstname
//               fathername
//               grandfathername
//               relationship
//               tellphone
//           }
//           Experience{
//               CompanyName
//               DateofEnter
//               DateofExit
//               Title
//           }
//           Family{
//               Firstname
//               FatherName
//               DateOfBirth
//               Phone
//               Relationship
//           }
//           education{
//               education
//               type{
//                 value  
//                 label
//               }
//           }
//       }
//       }`,
//             token: usertoken
//             // variables: { "department": department }
//         })
//         var requestOptions = {
//             method: 'POST',
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: graphql,
//             redirect: 'follow'
//         };
//         var fetchedresponse;
//         try {
//             const response = await fetch(`${API_URL}/Request/graphql`, requestOptions);
//             fetchedresponse = await response.json();
//         } catch (error) {
//             return error;
//         }
//         return fetchedresponse;
//     }
//     else {

//     }
// }

// async function AssignRequestEmployee(launch) {
//     const authuser = localStorage.getItem("user");
//     if (authuser) {
//         const usertoken = `token=${authuser}`;
//         var requestOptions = {
//             method: 'POST',
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ ...launch, token: usertoken }),
//             redirect: 'follow'
//         };
//         var fetchedresponse;
//         try {
//             const response = await fetch(`${API_URL}/Request/AssignEmployee`, requestOptions);
//             fetchedresponse = await response.json();
//         } catch (error) {
//             return {
//                 done: false,
//             };
//         }
//         return {
//             done: true,
//         };
//     }
//     else {

//     }
// }

// async function httpGetAssignedWork() {
//     const authuser = localStorage.getItem("user");
//     if (authuser) {
//         const usertoken = `token=${authuser}`;
//         var graphql = JSON.stringify({ token: usertoken });
//         var requestOptions = {
//             method: 'POST',
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: graphql,
//             redirect: 'follow'
//         };
//         var fetchedresponse;
//         try {
//             const response = await fetch(`${API_URL}/Request/AssignedWork`, requestOptions);
//             fetchedresponse = await response.json();
//         } catch (error) {
//             return error;
//         }
//         return fetchedresponse;
//     }
//     else {

//     }
// }

// async function CommitWorkServey(request) {
//     const authuser = localStorage.getItem("user");
//     if (authuser) {
//         const usertoken = `token=${authuser}`;
//         let response;
//         var formdata = new FormData();
//         formdata.append("WorkServeyID", request.WorkServeyID);
//         formdata.append("token", usertoken);
//         if (request.file && request.file.name) {
//             formdata.append("launch", request.file, request.file.name);
//         }

//         var requestOptions = {
//             method: 'POST',
//             body: formdata,
//             redirect: 'follow'
//         };

//         console.log("In the requests file client side");
//         console.log({ request });
//         try {
//             response = await fetch(`${API_URL}/Request/SubmitServey`, requestOptions);
//         } catch (err) {
//             console.log({ response });
//             return {
//                 done: false,
//             };
//         }
//         return {
//             done: true,
//         };

//     } else {

//     }
// }

// async function DownloadWorkServey(WorkServeyID, contentType, File_name) {
//     const authuser = localStorage.getItem("user");
//     if (authuser) {
//         const usertoken = `token=${authuser}`;
//         var graphql = JSON.stringify({
//             token: usertoken,
//             WorkServeyID: WorkServeyID
//         });

//         var requestOptions = {
//             method: 'POST',
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: graphql,
//             redirect: 'follow'
//         };
//         let ends;

//         switch (contentType) {
//             case 'application/pdf':
//                 ends = ".pdf";
//                 break;
//             case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
//                 ends = ".docx";
//                 break;
//             case 'application/msword':
//                 break;
//             default:
//                 break;

//         }

//         var fetchedresponse;
//         try {

//             const response = await fetch(`${API_URL}/Request/DownloadWorkServey`, requestOptions);
//             console.log("response in the Downloadworkservey");
//             response.blob().then(blob => download(blob, File_name + ends, contentType));
//             // const reader = response.body.getReader();
//             // const stream = new ReadableStream({
//             //   start(controller) {
//             //     // The following function handles each data chunk
//             //     function push() {
//             //       // "done" is a Boolean and value a "Uint8Array"
//             //       reader.read().then(({ done, value }) => {
//             //         // If there is no more data to read
//             //         if (done) {
//             //           console.log("done", done);
//             //           controller.close();
//             //           // download(pdfContentBuffer, File_name, contentType);
//             //           return;
//             //         }
//             //         // Get the data and send it to the browser via the controller
//             //         controller.enqueue(value);
//             //         // Check chunks by logging to the console
//             //         push();
//             //       });
//             //     }
//             //     push();
//             //   },
//             // });
//             return;
//             // fetchedresponse = await response.json();
//         } catch (error) {
//             return error;
//         }
//         return fetchedresponse;
//     } else {

//     }
// }

// async function AddNewTaskItem(request) {

//     const authuser = localStorage.getItem("user");
//     if (authuser) {
//         console.log({ request });
//         const usertoken = `token=${authuser}`;
//         let response;
//         var formdata = new FormData();
//         formdata.append("Title", request.Title);
//         formdata.append("Percentage", request.Percentage);
//         formdata.append("Complete", request.Complete);
//         formdata.append("StartDate", request.StartDate);
//         formdata.append("EndDate", request.EndDate);
//         formdata.append("Index", request.Index);
//         formdata.append("Task", request.Task);

//         formdata.append("token", usertoken);

//         var requestOptions = {
//             method: 'POST',
//             body: formdata,
//             redirect: 'follow'
//         };
//         try {
//             response = await fetch(`${API_URL}/Project/AddNewTaskitem`, requestOptions);
//         } catch (err) {
//             console.log({ response });
//             return {
//                 done: false,
//             };
//         }
//         return {
//             done: true,
//         };
//     }
//     else {

//     }
// }

// async function httpGetAllTaskItem(Task) {
//     const authuser = localStorage.getItem("user");
//     if (authuser) {
//         if (Task !== null) {
//             console.log("Task.toString()" + Task.toString());
//             const usertoken = `token=${authuser}`;
//             var graphql = JSON.stringify({
//                 query: `{
//           Tasks(name:"${Task}"){
//             TaskID,
//             Title,
//             Percentage,
//             Complete,
//             StartDate,
//             EndDate,
//             Index
//          }
//         }`,
//                 variables: {},
//                 token: usertoken
//             });
//             var requestOptions = {
//                 method: 'POST',
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: graphql,
//                 redirect: 'follow'
//             };
//             var fetchedresponse;
//             try {
//                 const response = await fetch(`${API_URL}/Request/graphql`, requestOptions);
//                 fetchedresponse = await response.json();
//                 console.log({ fetchedresponse });
//             } catch (error) {
//                 return error;
//             }
//             return fetchedresponse;
//         }
//         else {
//             return { done: false };
//         }

//     }
//     else {

//     }
// }

// async function EditTaskItem(request) {

//     const authuser = localStorage.getItem("user");
//     if (authuser) {
//         console.log({ request });
//         const usertoken = `token=${authuser}`;
//         let response;
//         var formdata = new FormData();
//         formdata.append("TaskID", request.TaskID);
//         formdata.append("Title", request.Title);
//         formdata.append("Percentage", request.Percentage);
//         formdata.append("Complete", request.Complete);
//         formdata.append("StartDate", request.StartDate);
//         formdata.append("EndDate", request.EndDate);
//         formdata.append("Index", request.Index);
//         formdata.append("Task", request.Task);

//         formdata.append("token", usertoken);

//         var requestOptions = {
//             method: 'POST',
//             body: formdata,
//             redirect: 'follow'
//         };
//         try {
//             response = await fetch(`${API_URL}/Project/EditTaskitem`, requestOptions);
//         } catch (err) {
//             console.log({ response });
//             return {
//                 done: false,
//             };
//         }
//         return {
//             done: true,
//         };
//     }
//     else {

//     }
// }

export {
    //language
    AddNewLanguage,
    GetAllLanguages,
    EditLanguage,
    httpAbortLanguage,

    //course
    AddNewCourse,
    GetAllCourses,
    GetCourse,
    HttpEditCourse,
    HttpEditCourseContent,
    HttpEditCourseContentImage,
    GetStreamCourseCover,

    //Price_Tier
    AddNewPrice_Tier,
    GetAllPrice_Tiers,
    EditPrice_Tier,


    //Curriculum
    AddNewCurriculumItem,
    GetCurriculumItem,

    //Curriculum Module
    HttpEditCurriculumModule,
    HttpEditCurriculumModuleIndex,
    GetCurriculumModuleItem,

    //Curriculum Module lecture
    AddNewCurriculumModuleLectureItem,
    HttpEditCurriculumModuleLectureItem,
    HttpEditCurriculumModuleLectureIndex,
    HttpAddCurriculumModuleLectureItemContent,
    GetCurriculumModuleLectureItem,
    GetStreamCurriculumModuleLectureContent,

    //Curriculum Module lecture Extra Resource
    HttpAddCurriculumModuleLectureItemContentExtraResource,
    HttpDeleteCurriculumModuleLectureContentExtraResource,

    //Curriculum Module Question
    AddNewCurriculumModuleQuestionItem,
    GetCurriculumModuleLectureQuestionsItem,
    EditNewCurriculumModuleQuestionItemContent,
    HttpEditCurriculumModuleQuestionItem
    // VerifyUsers,
    // AuthUsers,
    // AddNewUser,
    // AddNewRequest,
    // httpGetAllRequests,
    // EditRequest,
    // httpGetAllEmployees,
    // AssignRequestEmployee,
    // httpGetAssignedWork,
    // httpGetRequest,
    // CommitWorkServey,
    // DownloadWorkServey,
    // EditUser,
    // EmployeeImageStream,
    // AddNewTaskItem,
    // httpGetAllTaskItem,
    // EditTaskItem
};
