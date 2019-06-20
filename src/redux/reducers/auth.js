import * as actionTypes from "../actionTypes";
import { Record } from "immutable";

const Model = Record({
    isAuthenticated: false,
    jwtError: ""
});

const initialState = Model();

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTHENTICATE_USER.FULFILLED:
            return state.withMutations(mutant => {
                mutant.set("isAuthenticated", action.payload.isAuthenticated);
            });
        case actionTypes.JWT_AUTHENTICATION_ERROR:
            return state.withMutations(mutant => {
                mutant.set("jwtError", action.payload);
            });
        default:
            return state;
    }
};

export default UserReducer;
