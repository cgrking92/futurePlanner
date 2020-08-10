import Life from './Life';
import Study from './Study';
import TrialVideo from './TrialVideo';
import Member from './Member';
import Planner from './Planner';
import RoadMap from './Roadmap'
import Kakao from './Kakao'
import { combineReducers } from "redux";

export default combineReducers({
    Life,
    Study,
    TrialVideo,
    Member,
    Planner,
    RoadMap,
    Kakao
})