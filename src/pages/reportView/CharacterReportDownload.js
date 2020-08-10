import React, { Fragment, useState, useEffect, useRef } from 'react';
import * as apiConfig from 'lib/api';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import {evaluation} from 'contents/characterEvaluation';
import { useHistory } from 'react-router';
import ReportPrintButton from 'components/ReportPrintButton';
const CharacterReportDownload = (props) => {
    const [cookies] = useCookies();
    const [evaluationIndex,] = useState(-1);
    const API_URL = apiConfig.API_URL;
    const [childName,setChildName] = useState('');
    const [userEvaluation, setUserEvaluation] = useState(
        {
            stage: '',
            step: '',
            recomandPlay: [],
            recomandContent: [],
            content: ''
        }
    );

    let testNo = 0;
    let memberType = 0;
    const history = useHistory();    
    useEffect(() => {
        async function fetchUserTestResult() {

            const queryStr = new URLSearchParams(history.location.search);
            testNo  = queryStr.get('testNo');
            memberType  = queryStr.get('memberType');
            axios.post(API_URL+'/future/v1/getTestDataCustomer',{
                testNo : testNo,
                memberType : memberType
            })
            .then(function (result){
                setUserEvaluation(evaluation[JSON.parse(result.data[0].fp_jsonString).evaluationIndex])
                setChildName(result.data[0].em_name);
            })                                
        }
        fetchUserTestResult();                
    }, []);
            

    return (
            <div className="wrap" style={{height : 'auto',paddingBottom : '40px',paddingTop : '10px'}}>
                <div className="container">
                    <div className="contents _06_01">                
                        <div className="title"><span>문자 습득 진단 Report</span></div>
                        <p className="stit">우리 아이의 문자 관심도를 알아보세요.</p>
                        <div className="select_wrap">                    
                        </div>
                        <div className="text_box">
                            <p>
                                <b>{childName}</b>어린이의 문자 습득 준비는 <b>'{userEvaluation.step}'</b> 단계에 해당합니다.
                            </p>
                        </div>
                        <h3>문자 학습도 단계 : {userEvaluation.step}</h3>
                        <h3>진단내용</h3>
                        <div className="info_box">
                            <div dangerouslySetInnerHTML={{__html: userEvaluation.content}} ></div>
                        </div>
                        <div className="playbox">
                            <h4>추천 콘텐츠</h4>
                        {
                            userEvaluation.recomandContent.map((item, i)=>{
                                return (
                                <span key={i}>{item}</span>
                                )
                            })
                        }
                        </div>
                        <div className="playbox">
                            <h4>추천 영어놀이</h4>
                        {
                            userEvaluation.recomandPlay.map((item, i)=>{
                                return (
                                <span key={i}>{item}</span>
                                )
                            })
                        }
                        </div>
                        <div className="tbl_box">
                        <h3>문자 학습 5단계 해설표</h3>
                            <table>
                                <colgroup>
                                    <col style={{width: 106}}/> 
                                    <col style={{width: 300}}/> 
                                    <col style={{width: 'auto'}}/> 
                                    <col style={{width: 245}}/> 
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th>구분</th>
                                        <th>단계</th>
                                        <th>상세설명</th>
                                        <th>요약설명</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><b>Stage 1</b></td>
                                        <td>
                                            <b>Print Concept</b><br/>
                                            문자 관심
                                        </td>
                                        <td>
                                            Students demonstrate understanding of the organization and basic feature of print.
                                        </td>
                                        <td>
                                            문자에 관심을 갖기 시작하는 단계
                                        </td>
                                        </tr><tr>
                                            <td><b>Stage 2</b></td>
                                            <td>
                                                <b>Phonological Awareness</b><br/>
                                                음운 인식/ 소리와 글자 매칭
                                            </td>
                                            <td>
                                                Students demonstrate understanding of spoken words, syllables and sounds (phonemes).
                                            </td>
                                            <td> 
                                                소리에 매칭되는 음가를 이해하는 단계 
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><b>Stage 3</b></td>
                                            <td>
                                                <b>Phonics and Word Recognition</b><br/>
                                                소리위주 읽기 / Decoding
                                            </td>
                                            <td>
                                                Students use the relationships between  letter and sound, spelling patterns, and morphological analysis to decode written English.
                                            </td>
                                            <td>
                                                파닉스 법칙을 활용해 소리위주로 읽기 (Decoding) 가능한 단계
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><b>Stage 4</b></td>
                                            <td>
                                                <b>Strategies and Vocabulary<br/>
                                                Development</b><br/>
                                                읽기전략 / 어휘확장
                                            </td>
                                            <td>
                                                Students understand new vocabulary and use it correctly when reading and writing.

                                            </td>
                                            <td>
                                                어휘 확장 및 읽은 내용을 단편적으로 이해하는 단계
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><b>Stage 5</b></td>
                                            <td>
                                                <b>Integrated Reading</b><br/>
                                                통합리딩 / <br/>문화, 인성, 감정, 교훈 이해 
                                            </td>
                                            <td>
                                                Students understand the intention and the cultural background of the story. They use various reading strategies to understand between the lines of the writing.
                                            </td>
                                            <td>
                                                문자를 통해 문화, 인성, 감정, 교훈 등 글의 의도를 파악 하는 단계
                                            </td>
                                        </tr>                            
                                </tbody>
                            </table>
                        </div>
                        <ReportPrintButton/>
                    </div>
                </div>
            </div>
    );
};

export default CharacterReportDownload;