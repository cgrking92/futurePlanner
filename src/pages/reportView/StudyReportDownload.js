import React, { useEffect, useState, } from 'react';
import axios from 'axios';
import * as apiConfig from 'lib/api';
import { useHistory } from 'react-router';
import ReportPrintButton from 'components/ReportPrintButton';

const StudyReportDownload = () => {
    const width15 = { width:'15%' };
    const widthAuto = { width:'auto' };    
    const API_URL = apiConfig.API_URL;
    
    const history = useHistory();
    const [totalScore,setTotalScore] = useState(0);    
    const [childName,setChildName] = useState('');
    const [rankResult,setRankResult] = useState('');
    
    let resultScore = {
        visual : 0,
        auditory : 0,
        physical : 0
    }

    let scoreRankResult = {}
    let resultOrder = {};
    let resultSize = [];
    let rank = 1;
    let testNo = 0;
    let memberType = 0;

    //스타일
    const [auditory,setAuditory] = useState({});    
    const [kinesthetic,setKinesthetic] = useState({});    
    const [visual,setVisual] = useState({});
    
    //백분율 값
    const [resultScorePercent,setResultScorePercent] = useState({
        visual : '',
        auditory : '',
        physical : ''
    })
    
    const setRank = () => {
        scoreRankResult = {
            visual : Math.round(resultScore.visual / 40 * 100),
            auditory : Math.round(resultScore.auditory / 30 * 100),
            physical : Math.round(resultScore.physical / 30 * 100)
        }
        setResultScorePercent({
            visual : scoreRankResult.visual,
            auditory : scoreRankResult.auditory,
            physical : scoreRankResult.physical
        })

        setAuditory({ width:scoreRankResult.auditory+'%',
                    backgroundColor : '#65d0da' });
        setVisual({ width:scoreRankResult.visual+'%',
                    backgroundColor : '#33b3e4' },
                    );

        setKinesthetic({ width:scoreRankResult.physical+'%',
                        backgroundColor : '#075482' });
        
        resultOrder = {
                                Visual : scoreRankResult.visual,
                                Auditory : scoreRankResult.auditory,
                                Kinesthetic : scoreRankResult.physical
                            };
        resultSize = [Object.keys(resultOrder).length];
        for (let i = 0; i < Object.keys(resultOrder).length; i++) {
            rank = 1;
            for (let j = 0; j < Object.keys(resultOrder).length; j++){
                if ((Object.values(resultOrder)[i] <= Object.values(resultOrder)[j]) && (i > j)) {
                    rank++;
                }
            }

            for (let j = 0; j < resultSize.length; j++) {
                if (resultSize[j] === rank) {
                    rank++;
                }            
            }
            if (rank === 1) {
                setRankResult(Object.keys(resultOrder)[i]);
            }
        }
    }

    useEffect(() => {
        async function getTestData() {
            const queryStr = new URLSearchParams(history.location.search);
            testNo  = queryStr.get('testNo');
            memberType  = queryStr.get('memberType');
            axios.post(API_URL+'/future/v1/getTestDataCustomer',{
                testNo : testNo,
                memberType : memberType
            })
            .then(function (response){
                const resResult = JSON.parse(response.data[0].fp_jsonString);
                resultScore = {
                    visual : resResult.visual,
                    auditory : resResult.auditory,
                    physical : resResult.physical
                }
                setTotalScore(resResult.total);
                setChildName(response.data[0].em_name);
                setRank();
            })
        }
        getTestData();
    },[]);

        
    return (   
        <div className="wrap" style={{ height : 'auto',paddingBottom : '40px',paddingTop : '10px' }}>
            <div className="container">
                <div className="contents _06_01">
                    <div className="print_wrap">
                        <div className="title"><span>습득 성향 진단 Report</span></div>
                        <p className="stit">우리 아이 성향을 통해 알맞은 습득 방법을 알아보세요.</p>
                        <div className="select_wrap">                
                        </div>
                        <div className="text_box">
                            <b>{childName}</b>어린이의 습득 성향은 <b>'{rankResult} Learner'</b> 입니다.
                        </div>
                        <div className="report_box">
                            <table>
                                <colgroup>
                                    <col style={width15}/>
                                    <col style={width15}/>
                                    <col style={widthAuto}/>
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th>Division</th>
                                        <th>Proportion</th>
                                        <th>
                                            <div>
                                                <span>10</span>
                                                <span>50</span>
                                                <span>100</span>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>Auditory</th>
                                        <th><b>{resultScorePercent.auditory}%</b></th>
                                        <td>
                                            <div>
                                                <span style={auditory}></span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Visual</th>
                                        <th><b>{resultScorePercent.visual}%</b></th>
                                        <td>
                                            <div><span style={visual}></span></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Kinesthetic</th>
                                        <th><b>{resultScorePercent.physical}%</b></th>
                                        <td>
                                            <div>
                                                <span style={kinesthetic}></span>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        {rankResult === 'Visual' &&
                        <div className="report_text clera">                
                            <img src="/assets/img/future/04_03.png" alt=""/>
                            <p className="t1">{childName} 어린이는 Visual Learner로 시각적 자극을 통한 정보 습득력이 좋은 아이 입니다.</p>
                            <p>
                                Visual Learner는 정보를 이미지나 영상, 그래프, 아이콘 등 참고자료와 함께 받아들이면 이해가 빠른 아이를 지칭합니다. 
                                이야기를 듣는 것보다 읽는 것을 선호하며 시각적으로 표현된 내용에 대한 이해도가 높아 중요한 내용은 다른 디자인이나 색채로 표시하면 쉽게 받아들입니다. 
                                집중하는 동안은 자극적인 음악보단 부드러운 음악이 도움이 되며 이 유형은 흥미로운 시각 자료를 제공하고 사진, TV, 인터넷 등 다양한 기술을 활용하는 것이 오래 기억하는 데 도움이 됩니다.
                            </p>
                            <p>
                                잉글리시에그의 다양한 화풍과 Picture Walk에 적합한 삽화는 Visual Learner인 {childName} 어린이에게 적합한 습득 도구입니다.
                                책을 읽을 때 그림책 표지에 관한 이야기를 나누면서 호기심을 자극해 주세요.
                                Picture Walk를 통해 그림이 주는 힌트를 충분히 이해하고 전체 이야기를 추측하는 활동은 {childName} 어린이의 스토리텔링 참여를 더욱더 즐겁게 해 줍니다. 
                                서정적이고 감성적인 삽화의 잉글리시에그 그림책과 영상을 통한 다양한 시각적 노출은 Visual Learner인 {childName} 어린이의 몰입도를 높여 영어 습득을 돕게 됩니다.
                            </p>
                        </div>
                        }{rankResult === 'Kinesthetic' &&
                        <div className="report_text clera">                
                            <img src="/assets/img/future/04_05.png" alt=""/>
                            <p className="t1">{childName} 어린이는 Kinesthetic Learner로  신체적 활동을 통해 새로운 것을 배우는 것이 익숙한 아이입니다.</p>
                            <p>
                                정보를 듣거나 보는 것보다 신체 활동을 통해 습득하는 것이 빠릅니다. 
                                특히 이 유형은 어려운 정보를 처음 접할 때 체험을 통해 배우는 것이 효과적입니다. 
                                Kinesthetic Learner는 설명을 통한 정보보다 역할극, 드라마, 견학 등으로 직, 간접적 체험을 통한 정보를 더욱더 쉽게 받아들입니다. 
                                또한, 손동작 같은 신체 언어를 사용해 의사소통하면 이해도가 더욱 높아집니다. 이 유형은 정보를 여러 번 반복해 접할수록 더욱 효과적으로 정보를 습득합니다. 
                                교구와 T.P.R.을 활용한 잉글리시에그의 영어 놀이는 Kinesthetic Learner인 {childName} 어린이에게 적합한 학습 방법입니다. 
                                에그의 놀이자료를 책과 연계해 활용해 주시고 댄스 영상을 보며 손동작과 춤을 따라 할 수 있게 해주세요. 
                                책, 플링, CD, Song Card 등을 활용해 같은 콘텐츠를 지루하지 않게 반복해 주는 것이 좋습니다. 
                                에그 콘텐츠의 일상대화로 재연해 보는 역할극 놀이는 {childName} 어린이의 운동 감각적 영어 습득을 돕게 됩니다.
                            </p>                
                        </div>
                        }{rankResult === 'Auditory' &&
                        <div className="report_text clera">                
                            <img src="/assets/img/future/04_04.png" alt=""/>
                            <p className="t1">{childName} 어린이는 Auditory Learner로 청각적인 자극을 통한 정보 습득력이 좋은 아이입니다.</p>
                            <p>
                                단순히 책을 읽는 것 보다 신나는 음악을 들으며 책을 읽을 때 내용을 더 빠르게 받아들입니다. 
                                시나 노래와 같이 리듬이 있는 정보를 듣고 따라 말하거나 큰소리로 읽으면 이해도가 높아집니다. 
                                이 유형은 어조, 말투의 변화를 감지해 의미를 파악하기 때문에 풍부한 어조로 설명해 주는 것이 기억에 오래 남습니다. 
                                잉글리시에그의 고퀄리티 오디오는 Auditory Learner인 {childName} 어린이에게 적합한 학습 도구입니다. 
                                에그의 음악들을 일상생활의 배경음악으로 활용해 주시고 눈으로 읽기 전에 플링펜으로 책 내용을 들을 수 있게 해주세요. 
                                하나의 텍스트를 노래와 내레이션으로 다양하게 접근하는 것이 좋습니다. 
                                브로드웨이 뮤지컬 배우들이 녹음한 잉글리시에그 오디오는 영어 특유의 라임, 악센트, 표현력을 살리고 있어 {childName} 어린이의 청각적 영어 습득을 돕게 됩니다.
                            </p>                
                        </div>
                        }
                        <div className="tbl_box">
                            <h3>용어 정리</h3>
                                <table>
                                    <colgroup>
                                        <col style={{ width:'187px' }}/>
                                        <col style={{ width:'auto' }}/>
                                    </colgroup>
                                    <tbody>
                                        <tr>
                                            <th>Picture Walk</th>
                                            <td>
                                                본격적인 책 읽기 이전 활동으로 아이들의 호기심을 자극해 읽기를 돕는 Pre-Reading 단계입니다. <br/>
                                                Picture Walk는 커버 페이지부터 시작됩니다. 아이들이 그림을 보고 무슨 내용일지 말하게 해주세요. <br/>
                                                글자에 주목하기 전에 책장을 넘기면서 그림에 관련한 다양한 질문을 던짐으로써 아이들은 내용을 추측하고 몰입하게 됩니다. <br/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>T.P.R.</th>
                                            <td>
                                                전신반응식 교수법(Total Physical Response)으로 좌뇌 영역인 언어학습과 우뇌 영역인 신체활동을 결합한 교수법입니다.  <br/>
                                                실질적인 발화를 위해서는 먼저 언어가 쓰여지는 상황을 이해하고 이를 몸으로 표현해 보는 것이 중요합니다. 
                                                아이들은  동작, 신호, 율동 등 신체로 반응하는 과정을 거치면서 자신감을 갖고 이해에 중점을 둔 의사 소통 능력을 키워 나가게 됩니다. 
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Code Switching</th>
                                            <td>
                                                자연스러운 제2언어 습득에서 나타납니다. 
                                                언어를 학습하여 의도적으로 번역해 사용하기 보다는 두 언어의 스위치를 필요에 따라 On/ Off 하며 자연스럽게 활용하는 능력을 말합니다.  
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Invented Spelling</th>
                                            <td>
                                                유아들의 글쓰기에서 보여지는 특징으로 알고 있는 말소리를 글자와 매칭시키는 글쓰기 초기 단계입니다. <br/>
                                                초기에는 알파벳의 대표 자음 소리를 나열해 쓰는 형태로 나타나며 점차 정확한 스펠링으로 발전해 나갑니다. <br/>

                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        <ReportPrintButton/>
                    </div>
                </div> 
            </div>
        </div>
    );
};

export default StudyReportDownload;
