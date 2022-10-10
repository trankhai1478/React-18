import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDataQuizId } from "../../Service/ApiService";
const DetailQuiz = (props) => {
    const param = useParams();
    const quizId = param.id;
    useEffect(() => {
        fecthQuestions();
    }, [quizId]);
    const fecthQuestions = async () => {
        let res = await getDataQuizId(quizId);
        console.log("check question", res)
    }
    console.log("check param", param)
    return (
        <div className="detail-quiz-container">
            hahaha
        </div>
    )
}
export default DetailQuiz;