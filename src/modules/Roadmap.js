import { Map } from "immutable";
import { handleActions, createAction } from "redux-actions";

const SET_ROADMAP = 'setRoadmap/SET_ROADMAP';
export const setRoadmap = createAction(SET_ROADMAP);

const initialState = Map({
    roadMap : 0,
    roadMapComment : ''
})

export default handleActions({    
    [SET_ROADMAP] : (state, action) => {
        const {roadMap,roadMapComment} = action.payload;
        return state.setIn(['roadMap'],roadMap)
                    .setIn(['roadMapComment'],roadMapComment);
    }
}, initialState)