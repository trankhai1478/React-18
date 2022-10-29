import { useState } from 'react';
import Select from 'react-select';
import './Questions.scss';
import { TbHeartPlus } from "react-icons/tb";

import { BsFileMinusFill } from "react-icons/bs";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { AiFillPlusSquare } from "react-icons/ai";
import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';

const Questions = (props) => {

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];
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
    console.log(">>check questions", questions);
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
    const handleSubmitQuestionQuiz = () => {
        console.log("check submit", questions)
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
                        options={options}

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
                                        <span>{questions.imageName ? questions.imageName : '0 file is upload'}</span>
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
                                    })}


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
            </div>
        </div>
    )
}
export default Questions;