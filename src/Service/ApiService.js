import axios from '../Utils/AxiosCustomize';

const postCreateNewUser = (email, password, username, role, image) => {
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);
    return axios.post('api/v1/participant', data);
}
const getAllUsers = () => {
    return axios.get('api/v1/participant/all');
}
const putUpdateUser = (id, username, role, image) => {
    const data = new FormData();
    data.append('id', id);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);
    return axios.put('api/v1/participant', data);
}
const getViewser = (id, username, role, image, email, password) => {
    const data = new FormData();
    data.append('id', id);
    data.append('email', email);
    data.append('password', password);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);
    return axios.put('api/v1/participant', data);
}
const deleteUser = (userId) => {
    return axios.delete('api/v1/participant', { data: { id: userId } });
}
const getUserWithPaginate = (page, limit) => {
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
}

const postLogin = (userEmail, userPassword) => {
    return axios.post("/api/v1/login", {
        email: userEmail,
        password: userPassword,
        delay: 5000
    });
}
const postRegister = (email, password, username) => {
    return axios.post("/api/v1/register", { email, password, username });
}
const getQuizByUser = () => {
    return axios.get("/api/v1/quiz-by-participant");
}
const getDataQuizId = (id) => {
    return axios.get(`/api/v1/questions-by-quiz?quizId=${id}`)
}
const postSubmitQuiz = (data) => {
    return axios.post(`/api/v1/quiz-submit`, { ...data });
}
const postCreateNewQuiz = (description, name, difficulty, image) => {
    const data = new FormData();
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', difficulty);
    data.append('image', image);
    return axios.post('api/v1/quiz', data);
}
const getAllQuizForAdmin = () => {
    return axios.get(`/api/v1/quiz/all`);
}
const postCreateNewQuetionForQuiz = (quiz_id, description, image) => {
    const data = new FormData();
    data.append('quiz_id', quiz_id);
    data.append('description', description);
    data.append('questionImage', image);
    return axios.post('api/v1/question', data);
}
const postCreateNewAnswerForQuestion = (description, correct_answer, question_id) => {

    return axios.post('api/v1/answer', {
        description, correct_answer, question_id
    });
}
const PostAssignQuiz = (quizId, userId) => {
    return axios.post('api/v1/quiz-assign-to-user', {
        quizId, userId
    });
}
const getQuizQA = (quizId) => {
    return axios.get(`api/v1/quiz-with-qa/${quizId}`);
}
const postUpsertQA = (data) => {
    return axios.post(`api/v1/quiz-upsert-qa`, { ...data });
}
const logout = (email, refresh_token) => {
    return axios.post('api/v1/logout', {
        email, refresh_token
    });
}
export {
    postCreateNewUser, getAllUsers, putUpdateUser,
    getViewser, deleteUser, getUserWithPaginate, postLogin, postRegister, getQuizByUser,
    getDataQuizId, postSubmitQuiz, postCreateNewQuiz, getAllQuizForAdmin, postCreateNewQuetionForQuiz,
    postCreateNewAnswerForQuestion, PostAssignQuiz, getQuizQA, postUpsertQA, logout
}