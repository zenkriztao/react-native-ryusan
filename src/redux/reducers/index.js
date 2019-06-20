import { combineReducers } from "redux";
import user from "./user";
import quiz from "./quiz";
import quizList from "./quizList";
import leaderboard from "./leaderboard";
import auth from "./auth";

export default combineReducers({
    user,
    quiz,
    quizList,
    leaderboard,
    auth
});
