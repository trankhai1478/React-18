import { useState } from 'react';
import Select from 'react-select';
import './Questions.scss';
import { TbHeartPlus } from "react-icons/tb";

import { BsFileMinusFill } from "react-icons/bs";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { AiFillPlusSquare } from "react-icons/ai";
const Questions = (props) => {

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];
    const [selectedQuiz, setSelectedQuiz] = useState({});
    return (
        <div className="question-container">
            <div className="title">
                Manage question
            </div>
            <div className="add-new-question">
                <div className='col-6 form-group'>

                    <label>Select Quiz</label>
                    <Select
                        value={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={options}

                    />
                </div>

                <div className='mt-3'>
                    Add question
                </div>
                <div>
                    <div className='question-content'>

                        <div className="form-floating description">
                            <input type="text" class="form-control" placeholder="name@example.com" />
                            <label>Description</label>
                        </div>
                        <div className='group-upload'>
                            <label className='label-up'>Upload Image</label>
                            <input type={'file'}
                                hidden />
                            <span>0 file is upload</span>
                        </div>
                        <div className='btn-add'>
                            <span>
                                <TbHeartPlus className='icon-add' />
                            </span>

                            <span>
                                <BsFileMinusFill className='icon-remove' />
                            </span>
                        </div>

                    </div>
                    <div className='anwsers-content'>
                        <input class="form-check-input iscorrect"
                            type="checkbox"
                        />
                        <div className="form-floating anwser-name">
                            <input type="text" class="form-control" placeholder="name@example.com" />
                            <label>Answer 1</label>
                        </div>
                        <div className='btn-group'>
                            <span>
                                <AiFillPlusSquare className='icon-add' />
                            </span>

                            <span>
                                <AiOutlineMinusCircle className='icon-remove' />
                            </span>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default Questions;