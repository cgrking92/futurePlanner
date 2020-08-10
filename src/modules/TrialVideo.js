import { Map } from "immutable";
import { handleActions,createAction } from "redux-actions";

const UPDATE_VIDEO_HISTORY = 'TrialVideoUpdate/UPDATE_VIDEO_HISTORY';

export const updateVideoHistory = createAction(UPDATE_VIDEO_HISTORY);

const initalState = Map({
    status : 'ready'
})

export default handleActions({
    [UPDATE_VIDEO_HISTORY] : (state) => {
        return state.setIn(['status'],'completed');
    }
},initalState);