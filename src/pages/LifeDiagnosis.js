import React, { useState  } from 'react';
import Header from 'components/Header';
import Navigator from 'components/Navigator';
import { NavLink,useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useStore } from "react-redux";
import * as inputActions from 'modules/Life';
import LoadingImg from 'components/LoadingImg';
import axios from 'axios';
import * as apiConfig from 'lib/api';
import { useCookies } from 'react-cookie';

const LifeDiagnosis = (props) => {    
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
        let status = 'progress';
        props.InputActions.updateStatus(status);
        
    }

    const handleSubmit = (e) => {        
        e.preventDefault();
        
        let storeState = store.getState();
        let validation = true;        
        for (let i = 1; i < storeState.Life.get('anser').size+1 ; i++) {            
            if (storeState.Life.getIn(['anser','r'+i,'value']) === 0) {
                alert(i+'번 문제를 풀어주세요');
                validation = false;                
                return false;
            }
        }

        if (validation === true) { // 모든 문제를 풀었으면
            props.InputActions.initialization();
            let society = 0;
            let sensitivity = 0;
            let creativity = 0;
            let recognition = 0;

            let family = 0;
            let nature = 0;
            let imagination = 0;
            let object = 0;
            let relationship = 0;
            let place = 0;
            let physicalActivity = 0;
            let art = 0;
            let total = 0;
            let obj = {};
            for (let i = 1; i < storeState.Life.get('anser').size+1; i++) {
                let curPersonality = storeState.Life.getIn(['anser','r'+i,'personality']);
                let curInterest = storeState.Life.getIn(['anser','r'+i,'interest']);
                total = total + storeState.Life.getIn(['anser','r'+i,'value']);
                switch (curPersonality) {
                    case 'society':
                        society = society + storeState.Life.getIn(['anser','r'+i,'value']);
                        break;
                    
                    case 'sensitivity':
                        sensitivity = sensitivity + storeState.Life.getIn(['anser','r'+i,'value']);
                        break;

                    case 'creativity':
                        creativity = creativity + storeState.Life.getIn(['anser','r'+i,'value']);
                        break;

                    case 'recognition':
                        recognition = recognition + storeState.Life.getIn(['anser','r'+i,'value']);
                        break;

                    default:
                        break;
                }

                switch (curInterest) {
                    case 'family':
                        family = family + storeState.Life.getIn(['anser','r'+i,'value']);
                        break;
                    
                    case 'nature':
                        nature = nature + storeState.Life.getIn(['anser','r'+i,'value']);
                        break;

                    case 'imagination':
                        imagination = imagination + storeState.Life.getIn(['anser','r'+i,'value']);
                        break;

                    case 'object':
                        object = object + storeState.Life.getIn(['anser','r'+i,'value']);
                        break;

                    case 'relationship':
                        relationship = relationship + storeState.Life.getIn(['anser','r'+i,'value']);
                        break;

                    case 'place':
                        place = place + storeState.Life.getIn(['anser','r'+i,'value']);
                        break;

                    case 'physicalActivity':
                        physicalActivity = physicalActivity + storeState.Life.getIn(['anser','r'+i,'value']);
                        break;
                    
                    case 'art':
                        art = art + storeState.Life.getIn(['anser','r'+i,'value']);
                        break;

                    default:
                        break;
                }                                                                
            }

            obj = {
                 society : society,
                 sensitivity : sensitivity,
                 creativity : creativity,
                 recognition : recognition,

                 family : family,
                 nature : nature,
                 imagination : imagination,
                 object : object,
                 relationship : relationship,
                 place : place,
                 physicalActivity : physicalActivity,
                 art  : art,
                 sum  : total
            }

            props.InputActions.updateResult(obj);
            const status = 'completed';
            props.InputActions.updateStatus(status);
            toggleImg(!showImg);

            const requestData = {
                type : 'life',
                code : cookies.em_no,
                jsonStr : JSON.stringify(obj),
                memberType : cookies.memberType,
                token : cookies.token
            }
            axios.post(API_URL+'/future/v1/saveTestResult',requestData)
            .then(function (response) {
                 if (response.data === true) {
                    setTimeout(() =>{ alert('제출되었습니다'); history.push('/totalReport/life') },2000);
                 }else{
                    setTimeout(() =>{ alert('데이터 서버 저장 실패'); history.push('/totalReport/life') },2000);
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
                <div className="contents _03_02">
                    <Navigator></Navigator>                    
                    <form onSubmit={handleSubmit}>
                    <div className="test_box">
                        <div>                        
                            <h3>1. 초인종이 울리면 누가 왔는지 가장 먼저 확인하러 갑니다.
                            </h3>
                            <ul>
                                <li>
                                    <input type="radio" id="r1_1" name="r1" value="10" onClick={handleChange}/>
                                    <label htmlFor="r1_1"></label>
                                    <span>매우 그렇다</span>
                                </li>                            
                                <li>
                                    <input type="radio" id="r1_2" name="r1" value="9" onClick={handleChange}  />
                                    <label htmlFor="r1_2"></label>
                                    <span>대체로 그렇다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r1_3" name="r1" value="8" onClick={handleChange}  />
                                    <label htmlFor="r1_3"></label>
                                    <span>보통이다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r1_4" name="r1" value="7" onClick={handleChange}  />
                                    <label htmlFor="r1_4"></label>
                                    <span>대체로 그렇지 않다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r1_5" name="r1" value="6" onClick={handleChange}  />
                                    <label htmlFor="r1_5"></label>
                                    <span>전혀 그렇지 않다</span>
                                </li>                            
                            </ul>                        
                        </div>                    
                        <div>
                            <h3>2. 동물을 관찰하고 그들의 울음소리를 흉내내기 좋아합니다.</h3>
                            <ul>
                                <li>
                                    <input type="radio" id="r2_1" name="r2" value="10" onClick={handleChange}  />
                                    <label htmlFor="r2_1"></label>
                                    <span>매우 그렇다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r2_2" name="r2" value="9" onClick={handleChange}  />
                                    <label htmlFor="r2_2"></label>
                                    <span>대체로 그렇다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r2_3" name="r2" value="8" onClick={handleChange}  />
                                    <label htmlFor="r2_3"></label>
                                    <span>보통이다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r2_4" name="r2" value="7" onClick={handleChange}  />
                                    <label htmlFor="r2_4"></label>
                                    <span>대체로 그렇지 않다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r2_5" name="r2" value="6" onClick={handleChange}  />
                                    <label htmlFor="r2_5"></label>
                                    <span>전혀 그렇지 않다</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3>3. 사물을 창의적인 방법으로 해석하여 놀이하는 것을 좋아합니다.</h3>
                            <ul>
                                <li>
                                    <input type="radio" id="r3_1" name="r3" value="10" onClick={handleChange}  />
                                    <label htmlFor="r3_1"></label>
                                    <span>매우 그렇다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r3_2" name="r3" value="9" onClick={handleChange}  />
                                    <label htmlFor="r3_2"></label>
                                    <span>대체로 그렇다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r3_3" name="r3" value="8" onClick={handleChange}  />
                                    <label htmlFor="r3_3"></label>
                                    <span>보통이다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r3_4" name="r3" value="7" onClick={handleChange}  />
                                    <label htmlFor="r3_4"></label>
                                    <span>대체로 그렇지 않다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r3_5" name="r3" value="6" onClick={handleChange}  />
                                    <label htmlFor="r3_5"></label>
                                    <span>전혀 그렇지 않다</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3>4. 부엌을 좋아하고 가족과 함께 요리하는 것을 좋아합니다.</h3>
                            <ul>
                                <li>
                                    <input type="radio" id="r4_1" name="r4" value="10" onClick={handleChange}  />
                                    <label htmlFor="r4_1"></label>
                                    <span>매우 그렇다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r4_2" name="r4" value="9" onClick={handleChange}  />
                                    <label htmlFor="r4_2"></label>
                                    <span>대체로 그렇다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r4_3" name="r4" value="8" onClick={handleChange}  />
                                    <label htmlFor="r4_3"></label>
                                    <span>보통이다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r4_4" name="r4" value="7" onClick={handleChange}  />
                                    <label htmlFor="r4_4"></label>
                                    <span>대체로 그렇지 않다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r4_5" name="r4" value="6" onClick={handleChange}  />
                                    <label htmlFor="r4_5"></label>
                                    <span>전혀 그렇지 않다</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3>5. 자신의 물건에 애착이 많습니다.</h3>
                            <ul>
                                <li>
                                    <input type="radio" id="r5_1" name="r5" value="10" onClick={handleChange}  />
                                    <label htmlFor="r5_1"></label>
                                    <span>매우 그렇다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r5_2" name="r5" value="9" onClick={handleChange}  />
                                    <label htmlFor="r5_2"></label>
                                    <span>대체로 그렇다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r5_3" name="r5" value="8" onClick={handleChange}  />
                                    <label htmlFor="r5_3"></label>
                                    <span>보통이다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r5_4" name="r5" value="7" onClick={handleChange}  />
                                    <label htmlFor="r5_4"></label>
                                    <span>대체로 그렇지 않다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r5_5" name="r5" value="6" onClick={handleChange}  />
                                    <label htmlFor="r5_5"></label>
                                    <span>전혀 그렇지 않다</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3>6. 꽃에 관심이 많습니다.</h3>
                            <ul>
                                <li>
                                    <input type="radio" id="r6_1" name="r6" value="10" onClick={handleChange}  />
                                    <label htmlFor="r6_1"></label>
                                    <span>매우 그렇다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r6_2" name="r6" value="9" onClick={handleChange}  />
                                    <label htmlFor="r6_2"></label>
                                    <span>대체로 그렇다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r6_3" name="r6" value="8" onClick={handleChange}  />
                                    <label htmlFor="r6_3"></label>
                                    <span>보통이다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r6_4" name="r6" value="7" onClick={handleChange}  />
                                    <label htmlFor="r6_4"></label>
                                    <span>대체로 그렇지 않다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r6_5" name="r6" value="6" onClick={handleChange}  />
                                    <label htmlFor="r6_5"></label>
                                    <span>전혀 그렇지 않다</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3>7. 채소를 편식하지 않고 잘 먹습니다.</h3>
                            <ul>
                                <li>
                                    <input type="radio" id="r7_1" name="r7" value="10" onClick={handleChange}  />
                                    <label htmlFor="r7_1"></label>
                                    <span>매우 그렇다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r7_2" name="r7" value="9" onClick={handleChange}  />
                                    <label htmlFor="r7_2"></label>
                                    <span>대체로 그렇다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r7_3" name="r7" value="8" onClick={handleChange}  />
                                    <label htmlFor="r7_3"></label>
                                    <span>보통이다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r7_4" name="r7" value="7" onClick={handleChange}  />
                                    <label htmlFor="r7_4"></label>
                                    <span>대체로 그렇지 않다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r7_5" name="r7" value="6" onClick={handleChange}  />
                                    <label htmlFor="r7_5"></label>
                                    <span>전혀 그렇지 않다</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3>8. 마트에 가는 것을 좋아합니다.</h3>
                            <ul>
                                <li>
                                    <input type="radio" id="r8_1" name="r8" value="10" onClick={handleChange}  />
                                    <label htmlFor="r8_1"></label>
                                    <span>매우 그렇다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r8_2" name="r8" value="9" onClick={handleChange}  />
                                    <label htmlFor="r8_2"></label>
                                    <span>대체로 그렇다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r8_3" name="r8" value="8" onClick={handleChange}  />
                                    <label htmlFor="r8_3"></label>
                                    <span>보통이다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r8_4" name="r8" value="7" onClick={handleChange}  />
                                    <label htmlFor="r8_4"></label>
                                    <span>대체로 그렇지 않다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r8_5" name="r8" value="6" onClick={handleChange}  />
                                    <label htmlFor="r8_5"></label>
                                    <span>전혀 그렇지 않다</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3>9. 엄마와 아빠가 하는 행동을 잘 따라합니다.</h3>
                            <ul>
                                <li>
                                    <input type="radio" id="r9_1" name="r9" value="10" onClick={handleChange}  />
                                    <label htmlFor="r9_1"></label>
                                    <span>매우 그렇다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r9_2" name="r9" value="9" onClick={handleChange}  />
                                    <label htmlFor="r9_2"></label>
                                    <span>대체로 그렇다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r9_3" name="r9" value="8" onClick={handleChange}  />
                                    <label htmlFor="r9_3"></label>
                                    <span>보통이다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r9_4" name="r9" value="7" onClick={handleChange}  />
                                    <label htmlFor="r9_4"></label>
                                    <span>대체로 그렇지 않다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r9_5" name="r9" value="6" onClick={handleChange}  />
                                    <label htmlFor="r9_5"></label>
                                    <span>전혀 그렇지 않다</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3>10. 자전거를 타는 법을 배우는 등 바깥놀이를 좋아합니다.</h3>
                            <ul>
                                <li>
                                    <input type="radio" id="r10_1" name="r10" value="10" onClick={handleChange}  />
                                    <label htmlFor="r10_1"></label>
                                    <span>매우 그렇다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r10_2" name="r10" value="9" onClick={handleChange}  />
                                    <label htmlFor="r10_2"></label>
                                    <span>대체로 그렇다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r10_3" name="r10" value="8" onClick={handleChange}  />
                                    <label htmlFor="r10_3"></label>
                                    <span>보통이다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r10_4" name="r10" value="7" onClick={handleChange}  />
                                    <label htmlFor="r10_4"></label>
                                    <span>대체로 그렇지 않다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r10_5" name="r10" value="6" onClick={handleChange}  />
                                    <label htmlFor="r10_5"></label>
                                    <span>전혀 그렇지 않다</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3>11. 노래와 함께 춤추는 것을 좋아합니다.</h3>
                            <ul>
                                <li>
                                    <input type="radio" id="r11_1" name="r11" value="10" onClick={handleChange}  />
                                    <label htmlFor="r11_1"></label>
                                    <span>매우 그렇다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r11_2" name="r11" value="9" onClick={handleChange}  />
                                    <label htmlFor="r11_2"></label>
                                    <span>대체로 그렇다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r11_3" name="r11" value="8" onClick={handleChange}  />
                                    <label htmlFor="r11_3"></label>
                                    <span>보통이다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r11_4" name="r11" value="7" onClick={handleChange}  />
                                    <label htmlFor="r11_4"></label>
                                    <span>대체로 그렇지 않다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r11_5" name="r11" value="6" onClick={handleChange}  />
                                    <label htmlFor="r11_5"></label>
                                    <span>전혀 그렇지 않다</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3>12. 처음 가보는 장소에 호기심이 많은 편입니다.</h3>
                            <ul>
                                <li>
                                    <input type="radio" id="r12_1" name="r12" value="10" onClick={handleChange}  />
                                    <label htmlFor="r12_1"></label>
                                    <span>매우 그렇다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r12_2" name="r12" value="9" onClick={handleChange}  />
                                    <label htmlFor="r12_2"></label>
                                    <span>대체로 그렇다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r12_3" name="r12" value="8" onClick={handleChange}  />
                                    <label htmlFor="r12_3"></label>
                                    <span>보통이다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r12_4" name="r12" value="7" onClick={handleChange}  />
                                    <label htmlFor="r12_4"></label>
                                    <span>대체로 그렇지 않다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r12_5" name="r12" value="6" onClick={handleChange}  />
                                    <label htmlFor="r12_5"></label>
                                    <span>전혀 그렇지 않다</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3>13. 주변 사람들에게 선물하는 것을 좋아합니다.</h3>
                            <ul>
                                <li>
                                    <input type="radio" id="r13_1" name="r13" value="10" onClick={handleChange}   />
                                    <label htmlFor="r13_1"></label>
                                    <span>매우 그렇다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r13_2" name="r13" value="9" onClick={handleChange}  />
                                    <label htmlFor="r13_2"></label>
                                    <span>대체로 그렇다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r13_3" name="r13" value="8" onClick={handleChange}  />
                                    <label htmlFor="r13_3"></label>
                                    <span>보통이다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r13_4" name="r13" value="7" onClick={handleChange}  />
                                    <label htmlFor="r13_4"></label>
                                    <span>대체로 그렇지 않다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r13_5" name="r13" value="6" onClick={handleChange}  />
                                    <label htmlFor="r13_5"></label>
                                    <span>전혀 그렇지 않다</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3>14. 친구들과 함께 노는 것을 좋아합니다.</h3>
                            <ul>
                                <li>
                                    <input type="radio" id="r14_1" name="r14" value="10" onClick={handleChange}   />
                                    <label htmlFor="r14_1"></label>
                                    <span>매우 그렇다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r14_2" name="r14" value="9" onClick={handleChange}  />
                                    <label htmlFor="r14_2"></label>
                                    <span>대체로 그렇다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r14_3" name="r14" value="8" onClick={handleChange}  />
                                    <label htmlFor="r14_3"></label>
                                    <span>보통이다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r14_4" name="r14" value="7" onClick={handleChange}  />
                                    <label htmlFor="r14_4"></label>
                                    <span>대체로 그렇지 않다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r14_5" name="r14" value="6" onClick={handleChange}  />
                                    <label htmlFor="r14_5"></label>
                                    <span>전혀 그렇지 않다</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3>15. 그림을 그리기를 좋아합니다.</h3>
                            <ul>
                                <li>
                                    <input type="radio" id="r15_1" name="r15" value="10" onClick={handleChange}   />
                                    <label htmlFor="r15_1"></label>
                                    <span>매우 그렇다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r15_2" name="r15" value="9" onClick={handleChange}  />
                                    <label htmlFor="r15_2"></label>
                                    <span>대체로 그렇다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r15_3" name="r15" value="8" onClick={handleChange}  />
                                    <label htmlFor="r15_3"></label>
                                    <span>보통이다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r15_4" name="r15" value="7" onClick={handleChange}  />
                                    <label htmlFor="r15_4"></label>
                                    <span>대체로 그렇지 않다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r15_5" name="r15" value="6" onClick={handleChange}  />
                                    <label htmlFor="r15_5"></label>
                                    <span>전혀 그렇지 않다</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3>16. 수에 관심이 많습니다.</h3>
                            <ul>
                                <li>
                                    <input type="radio" id="r16_1" name="r16" value="10" onClick={handleChange}   />
                                    <label htmlFor="r16_1"></label>
                                    <span>매우 그렇다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r16_2" name="r16" value="9" onClick={handleChange}  />
                                    <label htmlFor="r16_2"></label>
                                    <span>대체로 그렇다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r16_3" name="r16" value="8" onClick={handleChange}  />
                                    <label htmlFor="r16_3"></label>
                                    <span>보통이다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r16_4" name="r16" value="7" onClick={handleChange}  />
                                    <label htmlFor="r16_4"></label>
                                    <span>대체로 그렇지 않다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r16_5" name="r16" value="6" onClick={handleChange}  />
                                    <label htmlFor="r16_5"></label>
                                    <span>전혀 그렇지 않다</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3>17. 다른 사람을 잘 도와주고 배려합니다.</h3>
                            <ul>
                                <li>
                                    <input type="radio" id="r17_1" name="r17" value="10" onClick={handleChange}   />
                                    <label htmlFor="r17_1"></label>
                                    <span>매우 그렇다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r17_2" name="r17" value="9" onClick={handleChange}  />
                                    <label htmlFor="r17_2"></label>
                                    <span>대체로 그렇다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r17_3" name="r17" value="8" onClick={handleChange}  />
                                    <label htmlFor="r17_3"></label>
                                    <span>보통이다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r17_4" name="r17" value="7" onClick={handleChange}  />
                                    <label htmlFor="r17_4"></label>
                                    <span>대체로 그렇지 않다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r17_5" name="r17" value="6" onClick={handleChange}  />
                                    <label htmlFor="r17_5"></label>
                                    <span>전혀 그렇지 않다</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3>18. 스퀸십을 좋아하고 자신의 감정 표현을 잘합니다.</h3>
                            <ul>
                                <li>
                                    <input type="radio" id="r18_1" name="r18" value="10" onClick={handleChange}   />
                                    <label htmlFor="r18_1"></label>
                                    <span>매우 그렇다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r18_2" name="r18" value="9" onClick={handleChange}  />
                                    <label htmlFor="r18_2"></label>
                                    <span>대체로 그렇다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r18_3" name="r18" value="8" onClick={handleChange}  />
                                    <label htmlFor="r18_3"></label>
                                    <span>보통이다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r18_4" name="r18" value="7" onClick={handleChange}  />
                                    <label htmlFor="r18_4"></label>
                                    <span>대체로 그렇지 않다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r18_5" name="r18" value="6" onClick={handleChange}  />
                                    <label htmlFor="r18_5"></label>
                                    <span>전혀 그렇지 않다</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3>19. 많은 사람들 앞에서도 자신감있게 행동합니다.</h3>
                            <ul>
                                <li>
                                    <input type="radio" id="r19_1" name="r19" value="10" onClick={handleChange}   />
                                    <label htmlFor="r19_1"></label>
                                    <span>매우 그렇다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r19_2" name="r19" value="9" onClick={handleChange}  />
                                    <label htmlFor="r19_2"></label>
                                    <span>대체로 그렇다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r19_3" name="r19" value="8" onClick={handleChange}  />
                                    <label htmlFor="r19_3"></label>
                                    <span>보통이다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r19_4" name="r19" value="7" onClick={handleChange}  />
                                    <label htmlFor="r19_4"></label>
                                    <span>대체로 그렇지 않다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r19_5" name="r19" value="6" onClick={handleChange}  />
                                    <label htmlFor="r19_5"></label>
                                    <span>전혀 그렇지 않다</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3>20. 그림자 놀이를 좋아합니다.</h3>
                            <ul>
                                <li>
                                    <input type="radio" id="r20_1" name="r20" value="10" onClick={handleChange}   />
                                    <label htmlFor="r20_1"></label>
                                    <span>매우 그렇다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r20_2" name="r20" value="9" onClick={handleChange}  />
                                    <label htmlFor="r20_2"></label>
                                    <span>대체로 그렇다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r20_3" name="r20" value="8" onClick={handleChange}  />
                                    <label htmlFor="r20_3"></label>
                                    <span>보통이다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r20_4" name="r20" value="7" onClick={handleChange}  />
                                    <label htmlFor="r20_4"></label>
                                    <span>대체로 그렇지 않다</span>
                                </li>
                                <li>
                                    <input type="radio" id="r20_5" name="r20" value="6" onClick={handleChange}  />
                                    <label htmlFor="r20_5"></label>
                                    <span>전혀 그렇지 않다</span>
                                </li>
                            </ul>
                        </div>
                    </div>                
                    <div className="btn_wrap">
                        <NavLink to="/life">
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
        value: state.input
    }),
    (dispatch) => ({
        InputActions : bindActionCreators(inputActions,dispatch)
    })
)(LifeDiagnosis);
