import { Map } from "immutable";
import { handleActions,createAction } from "redux-actions";

const SET_MEMBER = 'SetMember/SET_MEMBER';


export const setMember = createAction(SET_MEMBER);

const initialState = Map({
    selectedMember : Map({
        name : '',
        phone : '',
        code : 0,
        parent : '',
        center : '',
        type : ''
    })
           
})


export default handleActions({    
    [SET_MEMBER] : (state,action) => {
        const { name,phone,code,parent,center,type } = action.payload;
        return state.mergeIn(['selectedMember'],{name : name,phone:phone,code:code,parent:parent,center:center,type:type});
    }
    
    
},initialState)