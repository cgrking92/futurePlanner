import React, { useState,useEffect,useRef, Fragment } from 'react';
import Chart from "react-apexcharts";
import FamilyBooks from 'components/books/FamilyBooks';
import RelationshipBooks from 'components/books/RelationshipBooks';
import ObjectBooks from 'components/books/ObjectBooks';
import PlaceBooks from 'components/books/PlaceBooks';
import PhysicalActivityBooks from 'components/books/PhysicalActivityBooks';
import ArtBooks from 'components/books/ArtBooks';
import NatureBooks from 'components/books/NatureBooks';
import ImaginationBooks from 'components/books/ImaginationBooks';
import { useCookies } from "react-cookie";
import ReportPrintButton from 'components/ReportPrintButton';
import NoReportComponet from 'components/NoReportComponent';
import axios from 'axios';
import * as apiConfig from 'lib/api';
import { useHistory } from 'react-router';
import NoReportComponent from './NoReportComponent';

const LifeReportComponent = () => {    
    const [cookies] = useCookies();
    const [totalScore,setTotalScore] = useState(cookies.lifeData.testResult.interest.total / 2);
    const history = useHistory();
    let testNo = useRef(0);
    const [requestData] = useState({
        code : cookies.em_no,
        testType : 'life',
        token : cookies.token,
        memberType : cookies.memberType
    });
    const [isTest,setIsTest] = useState(true);

    const [transKorean] = useState({
                                        society : '사회',
                                        sensitivity : '감성',
                                        creativity : '창의',
                                        recognition : '인지',
                                        family : '가족',
                                        nature : '자연',
                                        imagination : '상상',
                                        object : '사물',
                                        relationship : '관계',
                                        place : '장소',
                                        physicalActivity : '신체활동',
                                        art : '예술'
                                    });

    const [transInterResult1,setTransInterResult1] = useState('');
    const [transInterResult2,setTransInterResult2] = useState('');
    const [transPerResult,setTransPerResult] = useState('');
                                        
    const [radarChart,setRaderChart] = useState({
                                        series : [{
                                            name : 'radar chart',
                                            data : []
                                        }],
                                        options : {
                                            chart : {
                                                type : 'radar'
                                            },                                            
                                            xaxis : {
                                                categories : ['가족','사물','예술','장소','관계','상상','신체활동','자연'],
                                                labels : {
                                                    style : {
                                                        // fontSize : '15px'
                                                    }
                                                }
                                            },
                                            yaxis : {
                                                max : 100,
                                                min : 0,
                                                tickAmount : 2,
                                                labels : { 
                                                    formatter : (data) => {return data+'%'}
                                                }
                                            }
                                        }
                                    });
    const [barChart,setBarChart] = useState({
                                            series : [{
                                                name : 'bar chart',
                                                data : []
                                            }],
                                            
                                            options : {
                                                chart : {
                                                    type : 'bar'
                                                },                                            
                                                xaxis : {
                                                    categories : ['감성','창의','인지','사회']
                                                    
                                                },                                                
                                                yaxis : {
                                                    max : 100,
                                                    min : 0,
                                                    tickAmount : 10,
                                                    labels : { 
                                                        formatter : (data) => {return data+'%'}
                                                    }
                                                },
                                                
                                            }
    });
    

    const [testDateList,setTestDateList] = useState([]);
        
    const API_URL = apiConfig.API_URL;
    

    const setTestDate = (responseData) => {
        setTestDateList(responseData.data);
    }

    
    let personalityScore = {
        creativity : 0,
        recognition : 0,
        society : 0,
        sensitivity : 0
    };
    
    let interestScore = {
                            family : 0,
                            object : 0,
                            art : 0,
                            place : 0,
                            relationship : 0,
                            physicalActivity : 0,
                            imagination : 0,
                            nature : 0,
                        };
    let personalityResult = {};
    let interestResult = {};
    let personalityOrder = {};    
    let interestOrder = {}
    let personalitySize = [];
    let interestSize = [];
    let personalityRank = 1;
    let interestRank = 1;
    
    const setRank = async () => {
        personalityResult = {
            creativity : personalityScore.creativity,
            recognition : personalityScore.recognition,
            society : personalityScore.society,
            sensitivity : personalityScore.sensitivity
        };
        interestResult ={
                family : interestScore.family / 10 * 0.125 + 0.9 / 1000,
                object : interestScore.object / 10  * 0.125 + 0.4 / 1000,
                art : interestScore.art / 10  * 0.125 + 0.2 / 1000,
                place : interestScore.place / 10  * 0.125 + 0.3 / 1000,
                relationship : interestScore.relationship / 15  * 0.125 + 0.5 / 1000,
                physicalActivity : interestScore.physicalActivity / 15  * 0.125 + 0.7 / 1000,
                imagination : interestScore.imagination / 15  * 0.125 + 0.8 / 1000,
                nature : interestScore.nature / 15  * 0.125 + 0.6 / 1000,
        };
        personalityOrder = {
                creativity : personalityResult.creativity / 25 * 0.25 + 0.9 / 1000,
                recognition : personalityResult.recognition / 25 * 0.25 + 0.8 / 1000,
                society : personalityResult.society / 25 * 0.25 + 0.7 / 1000,
                sensitivity : personalityResult.sensitivity / 25 * 0.25 + 0.6 / 1000
        };
        interestOrder = {
                family : interestResult.family,
                imagination : interestResult.imagination,
                physicalActivity : interestResult.physicalActivity,
                nature : interestResult.nature,
                relationship : interestResult.relationship,
                object : interestResult.object,
                place : interestResult.place,
                art : interestResult.art
        };
        personalitySize = [Object.keys(personalityOrder).length];
        interestSize = [Object.keys(interestOrder).length];

        for (let i = 0; i < Object.keys(personalityOrder).length; i++) {
            personalityRank = 1;
            for (let j = 0; j < Object.keys(personalityOrder).length; j++) {
                if ((Object.values(personalityOrder)[i] < Object.values(personalityOrder)[j])) {
                    personalityRank++;
                }            
            }

            for (let j = 0; j < personalitySize.length; j++) {
                if(personalitySize[j] === personalityRank){
                    personalityRank++;
                }
            }

            if (personalityRank >= personalitySize[0]) {
                setTransPerResult(transKorean[Object.keys(personalityOrder)[i]]);
            }

        }
        for (let i = 0; i < Object.keys(interestOrder).length; i++) {
            interestRank = 1;
            for (let j = 0; j < Object.keys(interestOrder).length; j++) {
                if ((Object.values(interestOrder)[i] < Object.values(interestOrder)[j])) {
                    interestRank++;
                }            
            }

            for (let j = 0; j < interestSize.length; j++) {
                if(interestSize[j] === interestRank){
                    interestRank++;
                }
            }
            if (interestRank === 1) {
                setTransInterResult1(transKorean[Object.keys(interestOrder)[i]]);        
            }

            if (interestRank === 2) {
                setTransInterResult2(transKorean[Object.keys(interestOrder)[i]]);        
            }
            
        }    

        setRaderChart({
            series : [{
                name : 'radar chart',
                data : [
                        (interestScore.family / 10 * 100),
                        (interestScore.object / 10 * 100),
                        (interestScore.art / 10 * 100),
                        (interestScore.place / 10 * 100),
                        (interestScore.relationship / 15 * 100),
                        (interestScore.imagination / 15 * 100),
                        (interestScore.physicalActivity / 15 * 100),
                        (interestScore.nature / 15 * 100),
                    ],
                    
            }],
            options : {
                chart : {
                    type : 'radar'
                },

            }
        });

        setBarChart({
            series : [{
                name : 'barChart',
                data : [
                        Math.floor(personalityScore.sensitivity / 25 * 100),
                        Math.floor(personalityScore.creativity / 25 * 100),
                        Math.floor(personalityScore.recognition / 25 * 100),
                        Math.floor(personalityScore.society / 25 * 100),
                    ]
                    
            }],
            options : {
                chart : {
                    type : 'bar'
                },      
            }
        })

    }

        

    useEffect(() => {
        let temp = 0;
        async function getTestDate() {            
            axios.post(API_URL+'/future/v1/getTestDateList',requestData)
                .then(function (response) {      
                    if (response.data.length > 0) {
                        setTestDate(response);
                        temp = response.data[0].fp_no;
                        axios.post(API_URL+'/future/v1/getTestData',{
                            testNo : temp,
                            token : cookies.token,
                            memberType : cookies.memberType
                        })
                        .then(function (response){                    
                            const resResult = JSON.parse(response.data[0].fp_jsonString);
                            personalityScore = {
                                creativity : resResult.creativity / 2,
                                recognition : resResult.recognition / 2,
                                society : resResult.society / 2,
                                sensitivity : resResult.sensitivity / 2
                            };
                            interestScore = {
                                family : resResult.family / 2,
                                object : resResult.object / 2,
                                art : resResult.art / 2,
                                place : resResult.place / 2,
                                relationship : resResult.relationship / 2,
                                physicalActivity : resResult.physicalActivity / 2,
                                imagination : resResult.imagination / 2,
                                nature : resResult.nature / 2
                            };
                            setTotalScore(resResult.sum / 2);
                            setRank();                            
                        })
                }else{
                    setIsTest(false);
                }
            })
        }
        getTestDate();
    },[])

    const getTestData = () => {
        axios.post(API_URL+'/future/v1/getTestData',{
            testNo : testNo,
            token : cookies.token,
            memberType : cookies.memberType
        })
        .then(function (response) {
            const resResult = JSON.parse(response.data[0].fp_jsonString);
            personalityScore = {
                creativity : resResult.creativity / 2,
                recognition : resResult.recognition / 2,
                society : resResult.society / 2,
                sensitivity : resResult.sensitivity / 2
            };

            interestScore = {
                family : resResult.family / 2,
                object : resResult.object / 2,
                art : resResult.art / 2,
                place : resResult.place / 2,
                relationship : resResult.relationship / 2,
                physicalActivity : resResult.physicalActivity / 2,
                imagination : resResult.imagination / 2,
                nature : resResult.nature / 2
            };
            setTotalScore(resResult.sum / 2);

            setRank();                                
        })
        .catch(function (error){
            alert(error);
        })
    }

    const handleDateChange = (e) => {

        if (e.target.value === '') {
            return false;
        }
        testNo = e.target.value;
        
        getTestData();

    }


    return (
        
        <div className="print_wrap">            
            {isTest === true &&
            <Fragment>
            <div className="title">
                <span>생활 성향 진단 Report</span>
            </div>
            <p className="stit">우리 아이 생활 습관을 통해 잉글리시에그 콘텐츠와의 일치도를 알아보세요.</p>
            <div className="select_wrap">
                <select name="testList" id="" onChange={handleDateChange}>
                    <option value="">--테스트 날짜 선택--</option>
                    {                            
                        testDateList.map((item, i)=>{
                            return (
                                <option value={item.fp_no} key={i}>{item.fp_regDate}</option>
                                )}
                            )
                    }
                </select>
            </div>
            <div className="text_box">
            <b>{cookies.childName}</b> 어린이는<span>{transInterResult1}</span>, <span>{transInterResult2}</span> 에 가장 관심도가 높고 <span>{transPerResult}</span> 영역 발달에 더 많은
                관심을 가져야 될 것으로 보입니다.
                <br/><br/>
                <b>{cookies.childName}</b> 어린이의 높은 생활 관심도는 <span>{transInterResult1}</span> ,<span>{transInterResult2}</span>이고, 이러한 프로파일은 잉글리시에그 콘텐츠와 <span>{totalScore}%</span>일치하는 것으로
                나타났습니다.
            </div>
            <div className="profile_box">
                <div>
                    <h3>흥미지수 프로파일</h3>
                    <div className="">
                        <Chart options={radarChart.options} series={radarChart.series} type="radar"/>
                    </div>
                </div>
                <div>
                    <h3>인성 영역 프로파일</h3>
                    <div className="">
                        <Chart options={barChart.options} series={barChart.series} type="bar"/>
                    </div>
                </div>
            </div>
            <div className="book_box">
                <h3><b>'{transInterResult1}'</b> 에 연관된 잉글리시에그 콘텐츠</h3>
                {transInterResult1 === '가족' &&
                <FamilyBooks/>
                }
                {transInterResult1 === '관계' &&
                <RelationshipBooks/>
                }
                {transInterResult1 === '사물' &&
                <ObjectBooks/>
                }
                {transInterResult1 === '장소' &&
                <PlaceBooks/>
                }
                {transInterResult1 === '예술' &&
                <ArtBooks/>
                }
                {transInterResult1 === '자연' &&
                <NatureBooks/>
                }
                {transInterResult1 === '상상' &&
                <ImaginationBooks/>
                }
                {transInterResult1 === '신체활동' &&
                <PhysicalActivityBooks/>
                }
            </div>
            <div className="book_box">
                <h3><b>'{transInterResult2}'</b> 에 연관된 잉글리시에그 콘텐츠</h3>
                {transInterResult2 === '가족' &&
                <FamilyBooks/>
                }
                {transInterResult2 === '관계' &&
                <RelationshipBooks/>
                }
                {transInterResult2 === '사물' &&
                <ObjectBooks/>
                }
                {transInterResult2 === '장소' &&
                <PlaceBooks/>
                }
                {transInterResult2 === '예술' &&
                <ArtBooks/>
                }
                {transInterResult2 === '자연' &&
                <NatureBooks/>
                }
                {transInterResult2 === '상상' &&
                <ImaginationBooks/>
                }
                {transInterResult2 === '신체활동' &&
                <PhysicalActivityBooks/>
                }
            </div>
            <ReportPrintButton/>
            </Fragment>            
            }
            {isTest === false &&
            <NoReportComponent/>
            }
        </div>
    );
};


export default LifeReportComponent;