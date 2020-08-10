import React, { useEffect, useState, Fragment } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import * as apiConfig from '../lib/api';
import { useHistory } from 'react-router';
import { NavLink } from 'react-router-dom';
import { default as NumberFormat } from "react-number-format";

const ReportKakao = (props) => {        
    let modalStatus = {
        display : props.modalStatus
    };    
    const API_URL = apiConfig.API_URL;
    const history = useHistory();
    const [cookies] = useCookies();        
    const [selectedTestDate,setSelectedTestDate] = useState({
        roadMap : 0,
        life : 0,
        study : 0,
        character : 0
    });

    const branchTelFormatter = (str) => {
        let result = '';
        const strLength = str.length;
        if (str.substring(0,2) === '02') {
            if (strLength === 10) {
                result = <NumberFormat value={str} displayType={'text'}  format="##-####-####"/>;
            }else{
                result = <NumberFormat value={str} displayType={'text'}  format="##-###-####"/>;
            }
        }else{
            if (strLength === 11) {
                result = <NumberFormat value={str} displayType={'text'}  format="###-#####-####"/>;
            }else{
                result = <NumberFormat value={str} displayType={'text'}  format="###-###-####"/>;
            }
        }
        
        return result;
    }

    const [downloadPath,setDownloadPath] = useState('');

    const handleDateSelect = (e) => {
        switch (e.target.name) {
            case 'roadMapDate':
                setSelectedTestDate({
                    roadMap : Number(e.target.value),
                    life : selectedTestDate.life,
                    study : selectedTestDate.study,
                    character : selectedTestDate.character
                })
                break;

            case 'studyDate':
                setSelectedTestDate({
                    roadMap : selectedTestDate.roadMap,
                    life : selectedTestDate.life,
                    study : Number(e.target.value),
                    character : selectedTestDate.character
                })
                break;

            case 'lifeDate':
                setSelectedTestDate({
                    roadMap : selectedTestDate.roadMap,
                    life : Number(e.target.value),
                    study : selectedTestDate.study,
                    character : selectedTestDate.character
                })
                break;

            case 'characterDate':
                setSelectedTestDate({
                    roadMap : selectedTestDate.roadMap,
                    life : selectedTestDate.life,
                    study : selectedTestDate.study,
                    character : Number(e.target.value)
                })
                break;
        
            default:
                break;
        }        
        
    }

    const base64Encoder = (str) => {
        return new Buffer(str).toString('base64');
    }

    

    const closeModal = () => {
        props.closeModal();
        setTalkStep({
            step : 1,
            stepClassName : 'talk_step step1',
            stepStatus : {
                step1 : 'on',
                step2 : '',
                step3 : ''
            }
        })
    }

    const [talkStep,setTalkStep] = useState({
        step : 1,
        stepClassName : 'talk_step step1',
        stepStatus : {
            step1 : 'on',
            step2 : '',
            step3 : ''
        },        
    })

    const nextStep = () => {
        let obj = {}        
        switch (talkStep.step + 1) {
            case 1:
                obj = {
                    step : talkStep.step + 1,
                    stepClassName : 'talk_step step1',
                    stepStatus : {
                        step1 : 'on',
                        step2 : '',
                        step3 : ''
                    }

                }
                break;

            case 2:

                obj = {
                    step : talkStep.step + 1,
                    stepClassName : 'talk_step step2',
                    stepStatus : {
                        step1 : '',
                        step2 : 'on',
                        step3 : ''
                    }

                }

                setDownloadPath(
                    '/reportView?code='+base64Encoder(cookies.em_no)
                    +'&life='+selectedTestDate.life
                    +'&study='+selectedTestDate.study
                    +'&roadMap='+selectedTestDate.roadMap
                    +'&character='+selectedTestDate.character
                    +'&branch='+branchInfo.branch
                    +'&memberType='+cookies.memberType
                   );
                
                break;

            case 3:

                obj = {
                    step : talkStep.step + 1,
                    stepClassName : 'talk_step step3',
                    stepStatus : {
                        step1 : '',
                        step2 : '',
                        step3 : 'on'
                    }

                }
            
                break;     
        
            default:
                break;
        }

        if (obj.step === 3) {

            let kakaoRequestData = {
                template_code : "egg_17",
                dest_phone : cookies.phone,
                msg : [
                        branchInfo.branchName,
                        cookies.childName,
                        branchInfo.branchTel,
                        document.location.origin+downloadPath
                    ],
                token : cookies.token
            }

            axios.post(API_URL+'/future/v1/sendKakao',kakaoRequestData)
            .then(function (response) {
                if (JSON.parse(response.data).result === 1) {
                    window.alert('알림톡 발송 성공');
                    setTalkStep(obj);
                }else{
                    window.alert('알림톡 발송 실패 : ' + response.msg);
                    return false;
                }
            })
            .catch(function (error) {
                window.alert('알림톡 발송 실패 : ' + error);
                return false;
            })
        }else{
            setTalkStep(obj);
        }

        
    }

    
    
    const [roadMapDateList,setRoadMapDateList] = useState([{   
        fp_no : '',
        fp_regDate : ''     
    }]);

    const [lifeDateList,setLifeDateList] = useState([{   
        fp_no : '',
        fp_regDate : ''     
    }])

    const [studyDateList,setStudyDateList] = useState([{   
        fp_no : '',
        fp_regDate : ''     
    }])

    const [characterDateList,setCharacterDateList] = useState([{   
        fp_no : '',
        fp_regDate : ''     
    }])

    const [branchInfo,setBranchInfo] = useState({
        branchName : '',
        branchTel : '',
        branch : ''
    })

    const setTestDate = (dateList) => {
        setRoadMapDateList([]);
        setCharacterDateList([]);
        setStudyDateList([]);
        setLifeDateList([]);
        setBranchInfo([]);
        setRoadMapDateList(dateList.roadMap);
        setCharacterDateList(dateList.character);
        setStudyDateList(dateList.study);
        setLifeDateList(dateList.life);
        setBranchInfo({
            branchName : dateList.branchInfo[0].eb_name,
            branchTel : dateList.branchInfo[0].eb_tel,
            branch : dateList.branchInfo[0].eb_no
        });
    }
    useEffect(() => {
            async function getTestDataList() {
            let dateList = {
                roadMap : [{}],
                life : [{}],
                study : [{}],
                character : [{}],
                branchInfo : [{}]
            };
            const requestData = {
                code : cookies.em_no,
                token : cookies.token,
                memberType : cookies.memberType
            }
            axios.post(API_URL+'/future/v1/getAllTestDateList',requestData)
            .then(function (response) {
                dateList.roadMap = response.data['roadMap'];
                dateList.life = response.data['life'];
                dateList.study = response.data['study'];
                dateList.character = response.data['character'];
                dateList.branchInfo = response.data['branchInfo'];
                setTestDate(dateList);
            })            
        }
            getTestDataList();
    },[]);
    return (
        <div className="layer_pop" style={modalStatus}>
            <div className="inner _06_01">
                <div className="title">
                <span>Total Report 카카오 알림톡</span>
                </div>
                <div className={talkStep.stepClassName}>                
                    <ul>
                        <li className={talkStep.stepStatus.step1}>정보확인</li>
                        <li className={talkStep.stepStatus.step2}>내용확인</li>
                        <li className={talkStep.stepStatus.step3}>완료</li>
                    </ul>
                </div>
            {talkStep.step === 1 &&
            <div>
                <h2>대상자 정보를 확인해 주세요.</h2>
                <table>
                    <colgroup>
                        <col style={{ width:'23%' }}/>
                        <col style={{ width:'23%' }}/>
                        <col style={{ width:'23%' }}/>
                        <col style={{ width:'auto' }}/>
                    </colgroup>
                    <thead>
                        <tr>
                            <th>센터</th>
                            <th>아이 이름</th>
                            <th>부모명</th>
                            <th>부모 휴대폰 번호</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{cookies.center}</td>
                            <td>{cookies.childName}</td>
                            <td>{cookies.parent}</td>
                            <td>
                                {cookies.phone.length === 11?
                                <NumberFormat value={cookies.phone} displayType={'text'}  format="###-####-####"/>
                                :
                                <NumberFormat value={cookies.phone} displayType={'text'}  format="###-###-####"/>
                                }
                            </td>
                        </tr>
                    </tbody>
                </table>
                <h2>테스트 일자를 확인해 주세요.</h2>
                <ul className="test_list">
                    <li>
                        <span>생활 진단 Report</span>
                        <select name="lifeDate" id="" onChange={handleDateSelect}>
                            <option value="">날짜선택</option>
                            {Object.entries(lifeDateList).map((t,k) =>
                            <option key={k} value={t[1].fp_no}>{t[1].fp_regDate}</option>
                            )}
                        </select>
                    </li>
                    <li>
                        <span>문자 습득 진단 Report</span>
                        <select name="characterDate" id="" onChange={handleDateSelect}>
                            <option value="">날짜선택</option>
                            {Object.entries(characterDateList).map((t,k) =>
                            <option key={k} value={t[1].fp_no}>{t[1].fp_regDate}</option>
                            )}
                        </select>
                    </li>
                    <li>
                        <span>학습 성향 Report</span>
                        <select name="studyDate" id="" onChange={handleDateSelect}>
                            <option value="">날짜선택</option>
                            {Object.entries(studyDateList).map((t,k) =>
                            <option key={k} value={t[1].fp_no}>{t[1].fp_regDate}</option>
                            )}
                        </select>
                    </li>
                    <li>
                        <span>EGG Road Map</span>
                        <select name="roadMapDate" id="" onChange={handleDateSelect}>
                            <option value="">날짜선택</option>
                            {Object.entries(roadMapDateList).map((t,k) =>
                            <option key={k} value={t[1].fp_no}>{t[1].fp_regDate}</option>
                            )}
                        </select>
                    </li>
                </ul>
            </div>
            }
            {talkStep.step === 2 &&
            <div>
                <p className="txt">
                    안녕하세요. English EGG {branchInfo.branchName} 센터입니다. <br/>
                    {cookies.childName} 어린이의 EGG Future Planner 결과를 보내 드립니다.<br/>
                    꼼꼼히 확인해 주시고, 관련 문의 사항은 아래 정보로 연락주세요.
                    
                </p>
                <div className="contact">
                    <p>
                        {branchInfo.branchName} 센터 <br/>
                        전화번호 : {branchTelFormatter(branchInfo.branchTel)}
                    </p>
                </div>
                <p className="test_result">
                    테스트 결과는 아래 URL을 클릭해 주세요.
                    <NavLink to={downloadPath}>{document.location.origin+downloadPath}</NavLink>
                </p>
            </div>
            }
            {talkStep.step === 3 &&
            <div>
                <p className="ok">
                    카카오 알림톡으로 발송이 완료 되었습니다. <br/><br/><br/><br/>
                    감사합니다.
                </p>
            </div>
            }
            <div className="btn_wrap">                
                {talkStep.step < 3 ?
                <Fragment>
                <button type="button" onClick={closeModal}>CANCEL</button>
                <button className="on" onClick={nextStep}>NEXT</button>                    
                </Fragment>                
                :
                <button className="on" onClick={closeModal}>OK</button>
                }
                
            </div>
            <button className="btn_closed" type="button" onClick={closeModal}>
                <img src="/assets/img/ico_closed.png" alt="레이어닫기"/>
            </button>
        </div>
    </div>
    );
};

export default ReportKakao;