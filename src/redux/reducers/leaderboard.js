import * as actionTypes from "../actionTypes";
import { Record } from "immutable";

const Model = Record({
    data: [],
    isPending: false,
    isError: false
});

const initialState = Model();

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_LEADERBOARD.FULFILLED:
            return state.withMutations(mutant => {
                mutant.set("isPending", false);
                mutant.set("isError", false);
                mutant.set("data", action.payload.data);
            });
        case actionTypes.GET_LEADERBOARD.PENDING:
            return state.withMutations(mutant => {
                mutant.set("isPending", true);
                mutant.set("isError", false);
                mutant.set("data", []);
            });
        case actionTypes.GET_LEADERBOARD.REJECTED:
            return state.withMutations(mutant => {
                mutant.set("isError", true);
                mutant.set("isPending", false);
                mutant.set("data", []);
            });
        default:
            return state;
    }
};

export default UserReducer;
