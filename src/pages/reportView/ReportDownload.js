import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import * as apiConfig from 'lib/api';
import { useCookies } from "react-cookie";
import { default as NumberFormat } from "react-number-format";
import {  Link } from 'react-router-dom';

const ReportDownload = () => {
    const history = useHistory();
    const queryStr = new URLSearchParams(history.location.search);
    const API_URL = apiConfig.API_URL;
    const [paramData] = useState({
        code : new Buffer(queryStr.get('code'),'base64').toString('ascii'),
        life : queryStr.get('life'),
        study : queryStr.get('study'),
        character : queryStr.get('character'),
        roadMap : queryStr.get('roadMap'),
        branch : queryStr.get('branch'),
        memberType : queryStr.get('memberType'),
    });    

    const [downloadURL] = useState({
        life : '/reportView/life?testNo='+paramData.life+'&memberType='+paramData.memberType,
        study : '/reportView/study?testNo='+paramData.study+'&memberType='+paramData.memberType,
        character : '/reportView/character?testNo='+paramData.character+'&memberType='+paramData.memberType,
        roadMap : '/reportView/roadMap?testNo='+paramData.roadMap+'&memberType='+paramData.memberType
    })

    const [cookies] = useCookies();

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

    const [responseData,setResponseData] = useState({
        life : null,
        study : null,
        character : null,
        roadMap : null,
        branchInfo : {
            branchName : '',
            branchTel : ''
        },
        memberInfo : {
            childName : '',
            parentName : '',
            phone : '',
            branchName : ''
        }
    });

    useEffect(() => {
        async function getReport(){
            axios.post(API_URL+'/future/v1/downloadTestData',paramData)
            .then(function (response) {
                setResponseData({
                    life : response.data.life[0],
                    study : response.data.study[0],
                    character : response.data.character[0],
                    roadMap : response.data.roadMap[0],
                    branchInfo : {
                                    branchName : response.data.branchInfo[0].eb_name,
                                    branchTel : response.data.branchInfo[0].eb_tel,
                                },
                    memberInfo : {
                                    childName : response.data.memberInfo[0].em_name,
                                    parentName : response.data.memberInfo[0].em_parent,
                                    phone : response.data.memberInfo[0].em_hp,
                                    branchName : response.data.memberInfo[0].eb_name
                                }
                })
            })
        }
        getReport();
    },[])
    return (
        <div className="layer_pop">
            <div className="inner _08_04">
                <div className="title"><span>Total Report</span></div>
                <p className="t1">
                    안녕하세요. English EGG {responseData.branchInfo.branchName} 센터입니다. <br/>
                    <b>{cookies.childName}</b> 학생의 <b>EGG Future Planner 결과</b>를 보내 드립니다.<br/>
                    꼼꼼히 확인해 주시고, 관련 문의 사항은 아래 정보로 연락주세요.<br/>
                    감사합니다
                </p>
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
                            <td>{responseData.memberInfo.branchName}</td>
                            <td>{responseData.memberInfo.childName}</td>
                            <td>{responseData.memberInfo.parentName}</td>
                            <td>{responseData.memberInfo.phone.length === 11?
                                    <NumberFormat value={responseData.memberInfo.phone} displayType={'text'}  format="###-####-####"/>
                                    :
                                    <NumberFormat value={responseData.memberInfo.phone} displayType={'text'}  format="###-###-####"/>
                                }
                            </td>
                        </tr>
                    </tbody>
                </table>
                <h2>Report</h2>
                <table className="tbody">
                    <colgroup>
                        <col style={{ width:'33.3333%' }}/>
                        <col style={{ width:'33.3333%' }}/>
                        <col style={{ width:'auto' }}/>
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>생활 진단</th>
                            <td>{responseData.life==null?'-':responseData.life.fp_regDate}</td>
                            <td>{responseData.life==null?'-':<Link to={downloadURL.life} target="_blank"><button>결과 보기</button></Link>}</td>
                        </tr>
                        <tr>
                            <th>학습 성향</th>
                            <td>{responseData.study==null?'-':responseData.study.fp_regDate}</td>
                            <td>{responseData.study==null?'-':<Link to={downloadURL.study} target="_blank"><button>결과 보기</button></Link>}</td>

                        </tr>
                        <tr>
                            <th>문자 습득 진단</th>
                            <td>{responseData.character==null?'-':responseData.character.fp_regDate}</td>
                            <td>{responseData.character==null?'-':<Link to={downloadURL.character} target="_blank"><button>결과 보기</button></Link>}</td>
                        </tr>
                        <tr>
                            <th>EGG Roadmap</th>
                            <td>{responseData.roadMap==null?'-':responseData.roadMap.fp_regDate}</td>
                            <td>{responseData.roadMap==null?'-':<Link to={downloadURL.roadMap} target="_blank"><button>결과 보기</button></Link>}</td>
                        </tr>
                    </tbody>
                </table>
                <p className="t2">
                    ※ {responseData.branchInfo.branchName} 센터 <br/>
                    ※ 전화번호: {branchTelFormatter(responseData.branchInfo.branchTel)}
                </p>
            </div>
        </div>
    );
};

export default ReportDownload;