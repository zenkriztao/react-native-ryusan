import * as actionTypes from "./actionTypes";

import ApplicationService from "../services/ApplicationService";

export const getQuizList = () => dispatch =>
    dispatch({
        type: actionTypes.GET_ALL_QUIZZES.TYPE,
        payload: ApplicationService.getQuizList
    });

export const getLeaderboard = () => dispatch =>
    dispatch({
        type: actionTypes.GET_LEADERBOARD.TYPE,
        payload: ApplicationService.getLeaderboard
    });

export const authenticateUser = () => dispatch =>
    dispatch({
        type: actionTypes.AUTHENTICATE_USER.TYPE,
        payload: ApplicationService.authenticateUser
    });

export const joinQuizRequest = quizId => ({
    type: actionTypes.JOIN_QUIZ_REQUEST,
    payload: { quizId },
    webSocketAction: true
});

export const leaveQuizRequest = quizId => ({
    type: actionTypes.LEAVE_QUIZ_REQUEST,
    payload: { quizId },
    webSocketAction: true
});

export const logoutRequest = () => ({
    type: actionTypes.LOGOUT_REQUEST,
    payload: ApplicationService.logout()
});

export const answerQuestionRequest = params => ({
    type: actionTypes.ANSWER_QUESTION_REQUEST,
    payload: params,
    webSocketAction: true
});

export default {
    getQuizList,
    joinQuizRequest,
    leaveQuizRequest,
    logoutRequest,
    answerQuestionRequest,
    getLeaderboard,
    authenticateUser
};
