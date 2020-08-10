import { Map } from "immutable";
import { handleActions, createAction } from "redux-actions";

const SET_PLANNER = 'SetPlanner/SET_PLANNER';
export const setPlanner = createAction(SET_PLANNER);

const initialState = Map({
        name : ''
})

export default handleActions({    
    [SET_PLANNER] : (state, action) => {
        const name = action.payload;
        return state.setIn(['name'], name);
    }
}, initialState)