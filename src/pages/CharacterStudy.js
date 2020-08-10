import React,{useEffect, Fragment, useState} from 'react';
import Navigator from 'components/Navigator';
import Header from 'components/Header';
import {  useHistory, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useStore } from "react-redux";
import * as inputActions from 'modules/Life';
import axios from 'axios';
import Level1Component from 'components/character/Level1Component';
import Level2Component from 'components/character/Level2Component';
import {evaluation} from 'contents/characterEvaluation';
import * as apiConfig from '../lib/api';
import { useCookies } from 'react-cookie';

const CharacterStudy = (props) => {
    const history = useHistory();
    const location = useLocation();
    const [isShowResult, setShowResult] = useState(false);
    const [evaluationIndex, setEvaluationIndex] = useState(-1);
    const [cookies] = useCookies();
    //const level = location.;
    const parameter = new URLSearchParams(location.search); 

    useEffect(() => {
        window.characterSwiperInit();
        return function cleanup(){
        }
    });

    const handleCloseResultModal = () => {
        setEvaluationIndex(-1);
        setShowResult(false);
    }

    const handleShowResultModal = () => {
        setShowResult(true);
    }

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        setEvaluationIndex(value);
      }

    const handleSubmit = (e) => {     
        e.preventDefault();
        const obj = {
            evaluationIndex : evaluationIndex,
            type: parameter.get('type'),
            level: parameter.get('level')
        }

        const requestData = {
            type : 'character',
            code : cookies.em_no,
            jsonStr : JSON.stringify(obj),
            token: cookies.token,
            memberType : cookies.memberType     
        }
        
        axios.post(apiConfig.API_URL+'/future/v1/saveTestResult',requestData)
        .then(function (response) {
             if (response.data === true) {
                alert('제출되었습니다'); 
                setShowResult(true);
                history.push('/totalReport/character') ;
             }else{
                alert('데이터 서버 저장 실패'); 
                setShowResult(true);
             }
        })
    }

    return (
        <Fragment>
        <div className="wrap">
            <div className="container">
                <Header></Header>
                <div className="contents _05_04">
                    <Navigator></Navigator>
                    {
                        parameter.get('level') === '1' &&
                        <Level1Component type={parameter.get('type')} level={parameter.get('level')}/>
                    }
                    {
                        parameter.get('level') === '2' &&
                        <Level2Component type={parameter.get('type')} level={parameter.get('level')}/>
                    }
                    
                    <div className="btn_wrap">
                        <button onClick={handleShowResultModal}>Input Result</button>
                    </div>
                </div>
            </div>
        </div>

        {
            isShowResult &&
        <div className="layer_pop">
            <div className="inner _05_05">
                <div className="title"><span>결과 선택 (for Staff)</span></div>
                <div className="for_staff">
                    <h2>문자습득 준비도</h2>
                    <table className="test_box">
                        <colgroup>
                            <col style={{width:155}}/>
                            <col style={{width:'auto'}}/>
                            <col style={{width:180}}/>
                            <col style={{width:180}}/>
                        </colgroup>
                        <thead>
                            <tr>
                                <th>
                                    <label htmlFor="ch1">문자습득 준비도</label>
                                </th>
                                <th>내용</th>
                                <th>추천 콘텐츠</th>
                                <th>추천 영어놀이</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div className="check_txt">
                                        <input type="radio" id="ch1_1"
                                                value="0" checked={evaluationIndex === "0"}
                                                onChange={handleInputChange} />

                                        <label htmlFor="ch1_1">{evaluation[0].stage} <br/>Print Concept</label>
                                    </div>
                                </td>
                                <td>
                                    <div dangerouslySetInnerHTML={{__html: evaluation[0].content}} ></div>
                                </td>                                
                                <td>
                                    Everyday Package <br/>
                                    (STEP1ㆍ2ㆍ3) <br/><br/>
                                    Read UP Package <br/>
                                    (STEP4ㆍ5)
                                </td>
                                <td>
                                    Story Performance <br/>
                                    (STEP1ㆍ2ㆍ3) <br/><br/>
                                    Read UP Performance <br/>
                                    (STEP4)
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="check_txt">
                                        <input type="radio" id="ch1_2"
                                                value="1" checked={evaluationIndex === "1"}
                                                onChange={handleInputChange} />
                                        <label htmlFor="ch1_2">{evaluation[1].stage}<br/>Phonological Awareness</label>
                                    </div>
                                </td>
                                <td>
                                    <div dangerouslySetInnerHTML={{__html: evaluation[1].content}} ></div>
                                </td>                                
                                <td>
                                    Everyday Package <br/>
                                    (STEP1ㆍ2ㆍ3) <br/><br/>
                                    Read UP Package <br/>
                                    (STEP4ㆍ5)
                                </td>
                                <td>
                                    Story Performance <br/>
                                    (STEP1ㆍ2ㆍ3) <br/><br/>
                                    Read UP Performance <br/>
                                    (STEP4)
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="check_txt">
                                        <input type="radio" id="ch1_3"
                                                value="2" checked={evaluationIndex === "2"}
                                                onChange={handleInputChange} />
                                        <label htmlFor="ch1_3">{evaluation[2].stage}<br/>Phonics and Word Recognition</label>
                                    </div>
                                </td>
                                <td>
                                    <div dangerouslySetInnerHTML={{__html: evaluation[2].content}} ></div>
                                </td>                                
                                <td>
                                    Everyday Package <br/>
                                    (STEP1ㆍ2ㆍ3) <br/><br/>
                                    Read UP Package <br/>
                                    (STEP4ㆍ5) <br/><br/>
                                    Culture Line
                                </td>
                                <td>
                                    Story Performance <br/>
                                    (STEP1ㆍ2ㆍ3) <br/><br/>
                                    Read UP Performance <br/>
                                    (STEP4ㆍ5) <br/><br/>
                                    Storytelling Performance <br/>
                                    (STEP1)
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="check_txt">
                                        <input type="radio" id="ch1_4"
                                                value="3" checked={evaluationIndex === "3"}
                                                onChange={handleInputChange} />
                                        <label htmlFor="ch1_4">{evaluation[3].stage} <br/>Strategies and Vocabulary Development</label>
                                    </div>
                                </td>
                                <td>
                                    <div dangerouslySetInnerHTML={{__html: evaluation[3].content}} ></div>
                                </td>                                
                                <td>
                                    Everyday Package <br/>
                                    (STEP1ㆍ2ㆍ3) <br/><br/>
                                    Read UP Package <br/>
                                    (STEP4ㆍ5) <br/><br/>
                                    Culture Line
                                </td>
                                <td>
                                    Read UP Performance <br/>
                                    (STEP4ㆍ5) <br/><br/>
                                    Storytelling Performance <br/>
                                    (STEP1ㆍ2)
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="check_txt">
                                    <input type="radio" id="ch1_5"
                                                value="4" checked={evaluationIndex === "4"}
                                                onChange={handleInputChange} />

                                        <label htmlFor="ch1_5">{evaluation[4].stage} <br/>Integrated Reading</label>
                                    </div>
                                </td>
                                <td>
                                    <div dangerouslySetInnerHTML={{__html: evaluation[4].content}} ></div>
                                </td>                                
                                <td>
                                    Everyday Package <br/>
                                    (STEP1ㆍ2ㆍ3) <br/><br/>
                                    Read UP Package <br/>
                                    (STEP4ㆍ5) <br/><br/>
                                    Culture Line
                                </td>
                                <td>
                                    Storytelling Performance <br/>
                                    (STEP1ㆍ2ㆍ3)
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="btn_wrap">
                    <button onClick={handleCloseResultModal}>취소</button>
                    <button className="on" onClick={handleSubmit}>확인</button>
                </div>
                <button className="btn_closed" onClick={handleCloseResultModal}><img src="../assets/img/ico_closed.png" alt="레이어닫기"/></button>
            </div>
        </div>
        }
    </Fragment>
    );
};

export default connect(
    (state) => ({
        value: state.input
    }),
    (dispatch) => ({
        InputActions : bindActionCreators(inputActions,dispatch)
    })
)(CharacterStudy);