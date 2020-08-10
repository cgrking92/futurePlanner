import React, { useEffect, useState, Fragment } from 'react';
import { useCookies } from 'react-cookie';
import NoReportComponent from 'components/NoReportComponent';
import ReportPrintButton from 'components/ReportPrintButton';
const RoadMapComponent = () => {
    const [cookies] = useCookies();
    
    const [divClassName,setDivClassName] = useState('');
    const [roadMapYear,setroadMapYear] = useState('');
    const [roadMap] = useState(cookies.roadMap);
    const [roadMapComment] = useState(cookies.roadMapComment);
    const [isTest,setIsTest] = useState(true);
    useEffect(() => {
        async function switchClass(){            
            switch (roadMap) {
                case "1":
                    setDivClassName('roadmap_step years2');
                    setroadMapYear(4);
                    break;
        
                case "2":
                    setDivClassName('roadmap_step years3');
                    setroadMapYear(4);
                    break;
        
                case "3":
                    setDivClassName('roadmap_step years4');
                    setroadMapYear(3);
                    break;
            
                default:
                    setIsTest(false);
                    break;
            }
        }
        switchClass();
        
    })
    return (
            <Fragment>
                {isTest === true && 
                <div className="print_wrap">
                    <div className="title"><span>EGG Road Map</span></div>
                    <div className="text_box" style={{ marginTop: '60px' }}>
                        <p>
                            <b>{cookies.childName}</b>어린이의 <b>EGG Road Map</b> 입니다.
                        </p>
                    </div>
                <div className={divClassName}>
                    <div className="tool_tip2">
                    영어를 즐기고, 영어가 자신있는 아이! <br/><strong>{cookies.childName}</strong> 어린이의 <b>{roadMapYear}년 후</b> 모습입니다.
                    </div>
                    {cookies.roadMap == 1 &&                
                    <img src="../assets/img/future/07_01_roadmap.png" alt=""/>
                    }                
                    {cookies.roadMap == 2 &&                
                    <img src="../assets/img/future/07_02_roadmap.png" alt=""/>
                    }
                    {cookies.roadMap == 3 &&
                    <img src="../assets/img/future/07_03_roadmap.png" alt=""/>
                    }
                </div>
                <p className="txt">
                    * 위 로드맵과 단계별 언어 발달은 잉글리시에그 콘텐츠에 하루 두 시간 노출을 전제로 짜여진 Plan 입니다. <br/>
                    &nbsp;&nbsp;우리 아이의 영어습득 Plan을 위해 결과지 해설표를 참고하세요.
                </p>
                <div className="tbl_box">
                    <h3>General Comment</h3>
                    <textarea name="" id="" cols="30" rows="10" defaultValue={roadMapComment}></textarea>                
                    <h3>자연 발화 4단계 해설표</h3>
                    <table>
                        <colgroup>
                            <col style={{ width:'105px' }}/>
                            <col style={{ width:'300px' }}/>
                            <col style={{ width:'auto' }}/>
                        </colgroup>
                        <thead>
                            <tr>
                                <th>구분</th>
                                <th>단계</th>
                                <th>상세설명</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><b>Stage1</b></td>
                                <td><b>Input Period</b></td>
                                <td>
                                    본격적인 발화가 이루어지기 전 단계 <br/>
                                    상황과 단어를 매칭시켜 언어를 내적으로 축적하는 단계
                                </td>
                            </tr>
                            <tr>
                                <td><b>Stage2</b></td>
                                <td><b>Early Production</b></td>
                                <td>단어 위주 발화, 생활토크</td>
                            </tr>
                            <tr>
                                <td><b>Stage3</b></td>
                                <td><b>Speech Emergence</b></td>
                                <td>문장 형태의 발화 등장, 셀프토크 등장</td>
                            </tr>
                            <tr>
                                <td><b>Stage4</b></td>
                                <td><b>Conversation</b></td>
                                <td>자신의 생각과 의견 표현, 상호작용적인 대화 가능</td>
                            </tr>
                        </tbody>
                    </table>                
                </div>
                <ReportPrintButton/>
            </div>            
            }
            {isTest === false &&
            <NoReportComponent/>
            }
        </Fragment>
    );
};

export default RoadMapComponent;