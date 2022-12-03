import { useEffect, useState } from 'react';
import Select from 'react-select';
import './Questions.scss';
import { TbHeartPlus } from "react-icons/tb";

import { BsFileMinusFill } from "react-icons/bs";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { AiFillPlusSquare } from "react-icons/ai";
import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from 'uuid';
import _, { create } from 'lodash';
import Lightbox from "react-awesome-lightbox";
import { getAllQuizForAdmin, postCreateNewAnswerForQuestion, postCreateNewQuetionForQuiz } from "../../../../Service/ApiService";

const Questions = (props) => {


    const [selectedQuiz, setSelectedQuiz] = useState({});

    const [questions, setQuestion] = useState(
        [
            {
                id: uuidv4(),
                description: '',
                image: '',
                imageName: '',
                imageFile: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false
                    }

                ]
            }
        ]
    )
    const [isPreviewImage, setPreviewImage] = useState(false);
    const [dataImagePreview, setDataImagePreview] = useState({
        title: "",
        url: ""
    });
    console.log(">>check questions", questions);
    const [listQuiz, setListQuiz] = useState([]);
    useEffect(() => {
        fetchQuiz();
    }, [])
    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            let newQuiz = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.description}`
                }

            })
            setListQuiz(newQuiz);
        }

    }

    const handleAddRemoveQuestion = (type, id) => {
        if (type === 'ADD') {
            const newQuestion =
            {
                id: uuidv4(),
                description: 'question 1',
                image: '',
                imageName: '',
                imageFile: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false
                    }

                ]
            };
            setQuestion([...questions, newQuestion]);
        }
        if (type === 'REMOVE') {
            let questionClone = _.cloneDeep(questions);
            questionClone = questionClone.filter(item => item.id !== id);
            setQuestion(questionClone);
        }
        console.log("check type", type, id)
    }
    const handleAddRemoveAnswer = (type, questionId, answerId) => {
        let questionClone = _.cloneDeep(questions);
        if (type === 'ADD') {
            const newAnswer =
            {
                id: uuidv4(),
                description: '',
                isCorrect: false
            };
            let index = questionClone.findIndex(item => item.id === questionId);
            questionClone[index].answers.push(newAnswer);
            setQuestion(questionClone);

        }
        if (type === 'REMOVE') {
            let index = questionClone.findIndex(item => item.id === questionId);
            questionClone[index].answers = questionClone[index].answers.filter(item => item.id !== answerId);
            setQuestion(questionClone);
        }
    }
    const handleOnChange = (type, questionId, value) => {
        if (type === 'QUESTION') {
            let questionClone = _.cloneDeep(questions);
            let index = questionClone.findIndex(item => item.id === questionId);
            if (index > -1) {
                questionClone[index].description = value;
                setQuestion(questionClone);
            }


        }
    }
    const handleOnChangeFileQuestion = (questionId, event) => {
        let questionClone = _.cloneDeep(questions);
        let index = questionClone.findIndex(item => item.id === questionId);
        if (index > -1 && event.target && event.target.files && event.target.files[0]) {
            questionClone[index].imageFile = event.target.files[0];
            questionClone[index].imageName = event.target.files[0].name;

            setQuestion(questionClone);
        }
    }
    const handleAnswerQuestion = (type, answerId, questionId, value) => {
        let questionClone = _.cloneDeep(questions);
        let index = questionClone.findIndex(item => item.id === questionId);
        if (index > -1) {
            questionClone[index].answers =
                questionClone[index].answers.map(answers => {
                    if (answers.id === answerId) {
                        if (type === 'CHECKBOX') {
                            answers.isCorrect = value;
                        }
                        if (type === 'INPUT') {
                            answers.description = value;
                        }


                    }
                    return answers;
                })


            setQuestion(questionClone);
        }
    }
    const handleSubmitQuestionQuiz = async () => {
        console.log("check submit", questions, selectedQuiz)
        //submit question
        await Promise.all(questions.map(async (question) => {
            const q = await postCreateNewQuetionForQuiz(
                +selectedQuiz.value,
                question.description,
                question.imageFile);
            //submit answers
            await Promise.all(question.answers.map(async (answers) => {
                await postCreateNewAnswerForQuestion(

                    answers.description, answers.isCorrect, q.DT.id
                )
            }))
        }));



    }
    const handlePreviewImage = (questionId) => {
        let questionClone = _.cloneDeep(questions);
        let index = questionClone.findIndex(item => item.id === questionId);
        if (index > -1) {
            setDataImagePreview({
                url: URL.createObjectURL(questionClone[index].imageFile),
                title: questionClone[index].imageName
            })
            setPreviewImage(true)
        }
    }
    return (
        <div className="question-container">
            <div className="title">
                Manage question
            </div>
            <hr />
            <div className="add-new-question">
                <div className='col-6 form-group'>

                    <label className='mb-2'>Select Quiz</label>
                    <Select
                        value={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={listQuiz}

                    />
                </div>

                <div className='mt-3 mb-2'>
                    Add question
                </div>
                {
                    questions && questions.length > 0
                    && questions.map((questions, index) => {
                        return (
                            <div ley={questions.id} className='q-main mb-4'>
                                <div className='question-content'>

                                    <div className="form-floating description">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="name@example.com"
                                            value={questions.description}
                                            onChange={(event) => handleOnChange('QUESTION', questions.id, event.target.value)}
                                        />
                                        <label>Question {index + 1} Description</label>
                                    </div>
                                    <div className='group-upload'>
                                        <label htmlFor={`${questions.id}`}>
                                            <RiImageAddFill className='label-up' />
                                        </label>
                                        <input
                                            id={`${questions.id}`}
                                            onChange={(event) => handleOnChangeFileQuestion(questions.id, event)}
                                            type={'file'}
                                            hidden

                                        />
                                        <span>
                                            {questions.imageName ?

                                                <span style={{ cursor: "pointer" }}
                                                    onClick={() => handlePreviewImage(questions.id)}>
                                                    {questions.imageName}
                                                </span>
                                                : '0 file is upload'}
                                        </span>
                                    </div>
                                    <div className='btn-add'>
                                        <span onClick={() => handleAddRemoveQuestion('ADD', '')}>
                                            <TbHeartPlus className='icon-add' />
                                        </span>


                                        <span onClick={() => handleAddRemoveQuestion('REMOVE', questions.id)}>
                                            <BsFileMinusFill className='icon-remove' />
                                        </span>

                                    </div>

                                </div>
                                {questions.answers && questions.answers.length > 0
                                    && questions.answers.map((anwser, index) => {
                                        return (
                                            <div key={anwser.id} className='anwsers-content'>
                                                <input class="form-check-input iscorrect"
                                                    type="checkbox"
                                                    checked={anwser.isCorrect}
                                                    onChange={(event) => handleAnswerQuestion('CHECKBOX', anwser.id, questions.id, event.target.checked)}

                                                />
                                                <div className="form-floating anwser-name">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="name@example.com"
                                                        value={anwser.description}
                                                        onChange={(event) => handleAnswerQuestion('INPUT', anwser.id, questions.id, event.target.value)}
                                                    />
                                                    <label>Answer {index + 1}</label>
                                                </div>
                                                <div className='btn-group'>
                                                    <span onClick={() => handleAddRemoveAnswer('ADD', questions.id)}>
                                                        <AiFillPlusSquare className='icon-add' />
                                                    </span>
                                                    {questions.answers.length > 1 &&
                                                        <span onClick={() => handleAddRemoveAnswer('REMOVE', questions.id, anwser.id)}>
                                                            <AiOutlineMinusCircle className='icon-remove' />
                                                        </span>
                                                    }
                                                </div>

                                            </div>
                                        )
                                    })
                                }




                            </div>
                        )
                    })
                }

                {
                    questions && questions.length > 0 &&
                    <div>
                        <button
                            onClick={() => handleSubmitQuestionQuiz()}
                            className='btn btn-warning'>Save Question</button>
                    </div>
                }


                {isPreviewImage === true &&
                    <Lightbox
                        image={dataImagePreview.url}
                        title={dataImagePreview.title}
                        onClose={() => setPreviewImage(false)}
                    >

                    </Lightbox>
                }
            </div>

        </div>
    )
}
export default Questions;