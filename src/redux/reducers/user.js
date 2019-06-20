import * as actionTypes from "../actionTypes";
import { Record } from "immutable";

const Model = Record({
    name: null
});

const initialState = Model();

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTHENTICATE_USER.FULFILLED:
            return state.withMutations(mutant => {
                mutant.set("name", action.payload.name);
            });
        default:
            return state;
    }
};

export default UserReducer;
