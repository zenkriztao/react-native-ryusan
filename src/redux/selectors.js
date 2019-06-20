export const getQuizList = store => store.quizList.get("data").toJS();
export const getQuizListIsPending = store => store.quizList.get("isPending");
export const getQuizListIsError = store => store.quizList.get("isError");

export const getQuizError = store => store.quiz.get("error");
export const getWaitForUsersCount = store =>
    store.quiz.get("waitForUsersCount");
export const getQuizIsInProgress = store => store.quiz.get("isInProgress");
export const getQuizIsFinished = store => store.quiz.get("isFinished");
export const getQuizIsUnexpectedFinished = store =>
    store.quiz.get("isUnexpectedFinished");
export const getQuizName = store => store.quiz.getIn(["activeQuiz", "name"]);

export const getActiveQuestion = store => store.quiz.get("activeQuestion");
export const getActiveUsers = store => store.quiz.get("activeUsers");
export const getUsersOnline = store => store.quiz.get("usersOnline");

export const getCurrentUserName = store => store.user.get("name");

export const getLeaderboard = store => store.leaderboard.get("data");
export const getLeaderboardIsPending = store =>
    store.leaderboard.get("isPending");
export const getLeaderboardIsError = store => store.leaderboard.get("isError");

export const getIsAuthenticated = store => store.auth.get("isAuthenticated");
export const getJwtAuthenticatedError = store => store.auth.get("jwtError");

export default {
    getQuizList,
    getQuizListIsError,
    getQuizListIsPending,
    getQuizError,
    getWaitForUsersCount,
    getQuizIsInProgress,
    getQuizName,
    getIsAuthenticated,
    getQuizIsFinished,
    getActiveQuestion,
    getActiveUsers,
    getLeaderboard,
    getLeaderboardIsPending,
    getLeaderboardIsError,
    getUsersOnline,
    getQuizIsUnexpectedFinished,
    getCurrentUserName,
    getJwtAuthenticatedError
};
