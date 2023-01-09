import CountDown from "./CountDown";
import { useRef } from "react";
const RightContent = (props) => {
    const refDiv = useRef([]);
    const { dataQuiz } = props;

    const onTimeUp = () => {
        props.handleFinishQuiz();
    }
    console.log("check dataa quiz", dataQuiz);

    const getClassQuestion = (index, question) => {

        //check answer
        if (question && question.answers.length > 0) {
            let isAnswered = question.answers.find(a => a.isSelected === true);
            if (isAnswered) {
                return "question selected";
            }
        }
        return "question";
    }
    const handleClickQuestion = (question, index) => {
        if (refDiv.current) {
            refDiv.current.forEach(item => {
                if (item && item.className === 'question clicked') {
                    item.className = "question"
                }
            })
        }
        if (question && question.answers.length > 0) {
            let isAnswered = question.answers.find(a => a.isSelected === true);
            if (isAnswered) {
                return;
            }

        }

        refDiv.current[index].className = "question clicked";
        props.setIndex(index);
    }
    return (
        <>

            <div className="main-timer">
                <CountDown
                    onTimeUp={onTimeUp}
                />
            </div>
            <div className="main-question">
                {dataQuiz && dataQuiz.length > 0
                    && dataQuiz.map((item, index) => {
                        return (
                            <div
                                key={`question-abc-${index}`}
                                className={getClassQuestion(index, item)}
                                onClick={() => handleClickQuestion(item, index)}
                                ref={element => refDiv.current[index] = element}
                            >{index + 1}
                            </div>
                        )

                    })
                }


            </div>
        </>
    )
}
export default RightContent;