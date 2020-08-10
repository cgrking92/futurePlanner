import React, { useState } from 'react';
import Header from 'components/Header';
import Navigator from 'components/Navigator';
import { NavLink,useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useStore } from "react-redux";
import * as inputActions from 'modules/Study';
import LoadingImg from 'components/LoadingImg';
import axios from 'axios';
import * as apiConfig from 'lib/api';
import { useCookies } from 'react-cookie';
const StudyDiagnosis = (props) => {
    const store = useStore();    
    const API_URL = apiConfig.API_URL;    
    const [showImg,toggleImg] = useState(false);
    const history = useHistory();
    const [cookies] = useCookies();

    const handleChange = (e) => {
        const instance = {
            value : e.target.value,
            name : e.target.name
        }        
        props.InputActions.setInput(instance);
        const status = 'progress';
        props.InputActions.updateStatus(status);
        
    }

    const handleSubmit = (e) => {        
        e.preventDefault();
        
        let storeState = store.getState();
        let validation = true;
        for (let i = 1; i < storeState.Study.size+1 ; i++) {            
            if (storeState.Study.getIn(['anser','r'+i,'value']) === 0) {
                alert(i+'번 문제를 풀어주세요');
                validation = false;          
                return false;
            }
        }

        if (validation === true) {
           props.InputActions.initialization();
           let visualSum = 0;
           let physicalSum = 0;
           let auditorySum = 0;

           let obj = {};
           for (let i = 1; i < storeState.Study.get('anser').size+1; i++) {
            let curAttribute = storeState.Study.getIn(['anser','r'+i,'attribute']);
            
            switch (curAttribute) {
                case 'visual':
                    visualSum = visualSum + storeState.Study.getIn(['anser','r'+i,'value']);
                    break;
                case 'physical':
                    physicalSum = physicalSum + storeState.Study.getIn(['anser','r'+i,'value']);
                    break;

                case 'auditory':
                    auditorySum = auditorySum + storeState.Study.getIn(['anser','r'+i,'value']);
                    break;
            
                default:
                    break;
            }
                        
        }
        obj = {
            visual : visualSum,
            physical : physicalSum,
            auditory : auditorySum,
            total : visualSum+physicalSum+auditorySum
        }
        props.InputActions.updateAttributeResult(obj);
        toggleImg(!showImg);
        const requestData = {
            type : 'study',
            code : cookies.em_no,
            jsonStr : JSON.stringify(obj),
            token : cookies.token,
            memberType : cookies.memberType
        };
        
        axios.post(API_URL+'/future/v1/saveTestResult',requestData)
        .then(function (response) {
             if (response.data === true) {
                setTimeout(() =>{ alert('제출되었습니다'); history.push('/totalReport/study') },2000);
             }else{
                setTimeout(() =>{ alert('데이터 서버 저장 실패'); history.push('/totalReport/study') },2000);
             }
        })
        }
        
    }
   

    return (
        <div className="wrap" style={{height : 'auto',paddingBottom : '40px'}}>
            <div className="container">
                {showImg === true &&
                <LoadingImg></LoadingImg>
                }
                <Header></Header>
                <div className="contents _04_02">
                    <Navigator></Navigator>
                    <form onSubmit={handleSubmit}>
                    <div className="test_box">
                        <div>
                            <h3>1. 이야기와 노래의 단어를 빨리 기억합니다.</h3>
                            <ul>
                                <li>
                                    <input type="radio" id="r1_1" name="r1" value="10" onClick={handleChange}/>
                                    <label htmlFor="r1_1"></label>
                                    <span>매우 그렇다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r1_2" name="r1" value="8" onClick={handleChange}/>
                                    <label htmlFor="r1_2"></label>
                                    <span>대체로 그렇다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r1_3" name="r1" value="6" onClick={handleChange}/>
                                    <label htmlFor="r1_3"></label>
                                    <span>보통이다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r1_4" name="r1" value="4" onClick={handleChange}/>
                                    <label htmlFor="r1_4"></label>
                                    <span>대체로 그렇지 않다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r1_5" name="r1" value="2" onClick={handleChange}/>
                                    <label htmlFor="r1_5"></label>
                                    <span>전혀 그렇지 않다</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3>2. 좋아하는 책의 등장인물을 흉내내는 행동을 합니다.</h3>
                            <ul>
                                <li>
                                    <input type="radio" id="r2_1" name="r2" value="10" onClick={handleChange}/>
                                    <label htmlFor="r2_1"></label>
                                    <span>매우 그렇다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r2_2" name="r2" value="8" onClick={handleChange}/>
                                    <label htmlFor="r2_2"></label>
                                    <span>대체로 그렇다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r2_3" name="r2" value="6" onClick={handleChange}/>
                                    <label htmlFor="r2_3"></label>
                                    <span>보통이다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r2_4" name="r2" value="4" onClick={handleChange}/>
                                    <label htmlFor="r2_4"></label>
                                    <span>대체로 그렇지 않다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r2_5" name="r2" value="2" onClick={handleChange}/>
                                    <label htmlFor="r2_5"></label>
                                    <span>전혀 그렇지 않다</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3>3. 사진,그림,동영상 등에 쉽게 빠져듭니다.</h3>
                            <ul>
                                <li>
                                    <input type="radio" id="r3_1" name="r3" value="10" onClick={handleChange}/>
                                    <label htmlFor="r3_1"></label>
                                    <span>매우 그렇다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r3_2" name="r3" value="8" onClick={handleChange}/>
                                    <label htmlFor="r3_2"></label>
                                    <span>대체로 그렇다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r3_3" name="r3" value="6" onClick={handleChange}/>
                                    <label htmlFor="r3_3"></label>
                                    <span>보통이다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r3_4" name="r3" value="4" onClick={handleChange}/>
                                    <label htmlFor="r3_4"></label>
                                    <span>대체로 그렇지 않다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r3_5" name="r3" value="2" onClick={handleChange}/>
                                    <label htmlFor="r3_5"></label>
                                    <span>전혀 그렇지 않다</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3>4. 부모의 지시를 쉽게 이해합니다.</h3>
                            <ul>
                                <li>
                                    <input type="radio" id="r4_1" name="r4" value="10" onClick={handleChange}/>
                                    <label htmlFor="r4_1"></label>
                                    <span>매우 그렇다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r4_2" name="r4" value="8" onClick={handleChange}/>
                                    <label htmlFor="r4_2"></label>
                                    <span>대체로 그렇다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r4_3" name="r4" value="6" onClick={handleChange}/>
                                    <label htmlFor="r4_3"></label>
                                    <span>보통이다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r4_4" name="r4" value="4" onClick={handleChange}/>
                                    <label htmlFor="r4_4"></label>
                                    <span>대체로 그렇지 않다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r4_5" name="r4" value="2" onClick={handleChange}/>
                                    <label htmlFor="r4_5"></label>
                                    <span>전혀 그렇지 않다</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3>5. 장난감을 살아있는 것처럼 여기며 적극적으로 가지고 놉니다.</h3>
                            <ul>
                                <li>
                                    <input type="radio" id="r5_1" name="r5" value="10" onClick={handleChange}/>
                                    <label htmlFor="r5_1"></label>
                                    <span>매우 그렇다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r5_2" name="r5" value="8" onClick={handleChange}/>
                                    <label htmlFor="r5_2"></label>
                                    <span>대체로 그렇다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r5_3" name="r5" value="6" onClick={handleChange}/>
                                    <label htmlFor="r5_3"></label>
                                    <span>보통이다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r5_4" name="r5" value="4" onClick={handleChange}/>
                                    <label htmlFor="r5_4"></label>
                                    <span>대체로 그렇지 않다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r5_5" name="r5" value="2" onClick={handleChange}/>
                                    <label htmlFor="r5_5"></label>
                                    <span>전혀 그렇지 않다</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3>6. 다른 사람의 행동을 관찰함으로 배우고 기억합니다.</h3>
                            <ul>
                                <li>
                                    <input type="radio" id="r6_1" name="r6" value="10" onClick={handleChange}/>
                                    <label htmlFor="r6_1"></label>
                                    <span>매우 그렇다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r6_2" name="r6" value="8" onClick={handleChange}/>
                                    <label htmlFor="r6_2"></label>
                                    <span>대체로 그렇다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r6_3" name="r6" value="6" onClick={handleChange}/>
                                    <label htmlFor="r6_3"></label>
                                    <span>보통이다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r6_4" name="r6" value="4" onClick={handleChange}/>
                                    <label htmlFor="r6_4"></label>
                                    <span>대체로 그렇지 않다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r6_5" name="r6" value="2" onClick={handleChange}/>
                                    <label htmlFor="r6_5"></label>
                                    <span>전혀 그렇지 않다</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3>7. 들은 단어나 표현을 반복하여 말합니다.</h3>
                            <ul>
                                <li>
                                    <input type="radio" id="r7_1" name="r7" value="10" onClick={handleChange}/>
                                    <label htmlFor="r7_1"></label>
                                    <span>매우 그렇다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r7_2" name="r7" value="8" onClick={handleChange}/>
                                    <label htmlFor="r7_2"></label>
                                    <span>대체로 그렇다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r7_3" name="r7" value="6" onClick={handleChange}/>
                                    <label htmlFor="r7_3"></label>
                                    <span>보통이다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r7_4" name="r7" value="4" onClick={handleChange}/>
                                    <label htmlFor="r7_4"></label>
                                    <span>대체로 그렇지 않다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r7_5" name="r7" value="2" onClick={handleChange}/>
                                    <label htmlFor="r7_5"></label>
                                    <span>전혀 그렇지 않다</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3>8. 흥미로운 모양이나 질감을 가진 것에 흥미를 보이고 블록을 가지고 노는 것을 좋아합니다.</h3>
                            <ul>
                                <li>
                                    <input type="radio" id="r8_1" name="r8" value="10" onClick={handleChange}/>
                                    <label htmlFor="r8_1"></label>
                                    <span>매우 그렇다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r8_2" name="r8" value="8" onClick={handleChange}/>
                                    <label htmlFor="r8_2"></label>
                                    <span>대체로 그렇다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r8_3" name="r8" value="6" onClick={handleChange}/>
                                    <label htmlFor="r8_3"></label>
                                    <span>보통이다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r8_4" name="r8" value="4" onClick={handleChange}/>
                                    <label htmlFor="r8_4"></label>
                                    <span>대체로 그렇지 않다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r8_5" name="r8" value="2" onClick={handleChange}/>
                                    <label htmlFor="r8_5"></label>
                                    <span>전혀 그렇지 않다</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3>9. 모양,색,글자를 쉽게 기억합니다.</h3>
                            <ul>
                                <li>
                                    <input type="radio" id="r9_1" name="r9" value="10" onClick={handleChange}/>
                                    <label htmlFor="r9_1"></label>
                                    <span>매우 그렇다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r9_2" name="r9" value="8" onClick={handleChange}/>
                                    <label htmlFor="r9_2"></label>
                                    <span>대체로 그렇다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r9_3" name="r9" value="6" onClick={handleChange}/>
                                    <label htmlFor="r9_3"></label>
                                    <span>보통이다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r9_4" name="r9" value="4" onClick={handleChange}/>
                                    <label htmlFor="r9_4"></label>
                                    <span>대체로 그렇지 않다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r9_5" name="r9" value="2" onClick={handleChange}/>
                                    <label htmlFor="r9_5"></label>
                                    <span>전혀 그렇지 않다</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3>10. 새로운 친구를 사귀는 것에 거부감이 없습니다.</h3>
                            <ul>
                                <li>
                                    <input type="radio" id="r10_1" name="r10" value="10" onClick={handleChange}/>
                                    <label htmlFor="r10_1"></label>
                                    <span>매우 그렇다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r10_2" name="r10" value="10" onClick={handleChange}/>
                                    <label htmlFor="r10_2"></label>
                                    <span>대체로 그렇다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r10_3" name="r10" value="10" onClick={handleChange}/>
                                    <label htmlFor="r10_3"></label>
                                    <span>보통이다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r10_4" name="r10" value="10" onClick={handleChange}/>
                                    <label htmlFor="r10_4"></label>
                                    <span>대체로 그렇지 않다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r10_5" name="r10" value="10" onClick={handleChange}/>
                                    <label htmlFor="r10_5"></label>
                                    <span>전혀 그렇지 않다</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="btn_wrap">
                        <NavLink to="/study">
                        <button>취소</button>
                        </NavLink>
                        <button type="submit" className="on">제출</button>
                    </div>
                    </form>
                </div>
            </div>
        </div>

    );
};


export default connect(
    (state) => ({
        value : state.input
    }),
    (dispatch) => ({
        InputActions : bindActionCreators(inputActions,dispatch)
    })
)(StudyDiagnosis)