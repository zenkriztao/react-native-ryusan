import { createActionType, createPromiseTypes } from "./lib";

export const GET_ALL_QUIZZES = createPromiseTypes([], "GET_ALL_QUIZZES");
export const GET_LEADERBOARD = createPromiseTypes([], "GET_LEADERBOARD");

export const JOIN_QUIZ = createActionType([], "JOIN_QUIZ");
export const JOIN_QUIZ_REQUEST = createActionType([], "JOIN_QUIZ_REQUEST");
export const JOIN_QUIZ_REJECT = createActionType([], "JOIN_QUIZ_REJECT");
export const JOIN_QUIZ_WAIT = createActionType([], "JOIN_QUIZ_WAIT");
export const JOIN_QUIZ_INFO = createActionType([], "JOIN_QUIZ_INFO");
export const LEAVE_QUIZ_REQUEST = createActionType([], "LEAVE_QUIZ_REQUEST");
export const START_QUIZ_SUCCESS = createActionType([], "START_QUIZ_SUCCESS");
export const FINISH_QUIZ_SUCCESS = createActionType([], "FINISH_QUIZ_SUCCESS");
export const LOGOUT_REQUEST = createActionType([], "LOGOUT_REQUEST");
export const INCOMING_QUESTION = createActionType([], "INCOMING_QUESTION");
export const ANSWER_QUESTION_REQUEST = createActionType(
    [],
    "ANSWER_QUESTION_REQUEST"
);
export const ANSWER_QUESTION_SUCCESS = createActionType(
    [],
    "ANSWER_QUESTION_SUCCESS"
);
export const RECEIVE_USERS_ONLINE = createActionType(
    [],
    "RECEIVE_USERS_ONLINE"
);
export const SOMEONE_JOINED_QUIZ = createActionType([], "SOMEONE_JOINED_QUIZ");
export const SOMEONE_LEFT_QUIZ = createActionType([], "SOMEONE_LEFT_QUIZ");

export const AUTHENTICATE_USER = createPromiseTypes([], "AUTHENTICATE_USER");
export const JWT_AUTHENTICATION_ERROR = createActionType(
    [],
    "JWT_AUTHENTICATION_ERROR"
);
