import * as actionTypes from "../actionTypes";
import { Record, Map, fromJS } from "immutable";

const userAnswerModel = Record({
    answerId: null,
    isCorrect: false
});

const questionModel = Record({
    name: null,
    answers: [],
    userAnswer: userAnswerModel()
});

const activeQuestionModel = Record({
    questionId: null,
    question: questionModel()
});

const StateModel = Record({
    activeQuiz: null,
    activeQuestion: activeQuestionModel(),
    activeUsers: [],
    error: null,
    waitForUsersCount: 0,
    isInProgress: false,
    isFinished: false,
    isUnexpectedFinished: false,
    usersOnline: 0
});

const initialState = StateModel();

const QuizReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LEAVE_QUIZ_REQUEST:
            return initialState;
        case actionTypes.JOIN_QUIZ_REQUEST:
            return state.withMutations(mutant => {
                mutant.set("error", null);
                mutant.set("activeUsers", []);
                mutant.set("activeQuestion", new Map());
                mutant.set("isInProgress", false);
                mutant.set("isFinished", false);
                mutant.set("isUnexpectedFinished", false);
            });
        case actionTypes.JOIN_QUIZ_REJECT:
            return state.withMutations(mutant => {
                mutant.set("error", fromJS(action.payload));
            });
        case actionTypes.JOIN_QUIZ_INFO:
            return state.withMutations(mutant => {
                mutant.set("activeQuiz", fromJS(action.payload));
            });
        case actionTypes.JOIN_QUIZ_WAIT:
            return state.withMutations(mutant => {
                mutant.set("waitForUsersCount", action.payload);
            });
        case actionTypes.START_QUIZ_SUCCESS:
            return state.withMutations(mutant => {
                mutant.set("waitForUsersCount", 0);
                mutant.set("isInProgress", true);
                mutant.set("isFinished", false);
                mutant.set("isUnexpectedFinished", false);
                mutant.set("activeUsers", []);
                mutant.set("activeQuestion", new Map());
            });
        case actionTypes.FINISH_QUIZ_SUCCESS:
            return state.withMutations(mutant => {
                mutant.set("waitForUsersCount", 0);
                mutant.set("isInProgress", false);
                mutant.set("isFinished", true);
                mutant.set("activeQuestion", new Map());
                mutant.set("activeUsers", action.payload.activeUsers);
                mutant.set(
                    "isUnexpectedFinished",
                    action.payload.isUnexpectedFinished ? true : false
                );
            });
        case actionTypes.INCOMING_QUESTION:
            return state.withMutations(mutant => {
                mutant.set(
                    "activeQuestion",
                    activeQuestionModel({
                        questionId: action.payload.questionId,
                        question: questionModel(action.payload.question)
                    })
                );
                mutant.set("activeUsers", action.payload.activeUsers);
            });
        case actionTypes.ANSWER_QUESTION_SUCCESS:
            return state.withMutations(mutant => {
                mutant.setIn(
                    ["activeQuestion", "question", "userAnswer"],
                    userAnswerModel({
                        answerId: action.payload.answerId,
                        isCorrect: action.payload.isCorrect
                    })
                );
            });
        case actionTypes.RECEIVE_USERS_ONLINE:
            return state.withMutations(mutant => {
                mutant.set("usersOnline", action.payload);
            });
        default:
            return state;
    }
};

export default QuizReducer;
