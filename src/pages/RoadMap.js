import React, { Fragment,useState, useEffect } from 'react';
import Header from 'components/Header';
import Navigator from 'components/Navigator';
import TotalReportInfoMsg from 'components/TotalReportInfoMsg';
import TotalReportTap from 'components/TotalReportTap';
import RoadMapComponent from 'components/RoadMapComponent';
import ReportKakao from 'components/ReportKakao';
import { useCookies } from 'react-cookie';
import SelectRoadmap from 'components/SelectRoadmap';
import * as inputActions from 'modules/Kakao';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const RoadMap = () => {

    const [modalStatus,setModalStatus] = useState('none');
    const [roadMapModalStatus,setRoadMapModalStatus] = useState('none');
    
    const [cookies] = useCookies();

    const showModal = () => {
        setModalStatus('block');
        
    }

    const closeModal = () => {
        setModalStatus('none');
    }

    const closeRoadMapModal = () => {
        setRoadMapModalStatus('none');
    }

    

    useEffect(() => {
        async function checkRoadMap() {
            if (cookies.roadMap == 0) {
                setRoadMapModalStatus('block');
            }
        }

        checkRoadMap();
    },);
    
    return (
        <Fragment>
        <div className="wrap" style={{height : 'auto',paddingBottom : '40px'}}>
            <div className="container">
                <Header></Header>
                <div className="contents _07_01">
                    <Navigator></Navigator>
                    <TotalReportInfoMsg setModalStatus={showModal}/>
                    <TotalReportTap></TotalReportTap>                    
                    <RoadMapComponent></RoadMapComponent>
                    
                </div>
            </div>
        </div>
        <ReportKakao modalStatus={modalStatus} closeModal={closeModal}></ReportKakao>
        <SelectRoadmap modalStatus={roadMapModalStatus} closeModal={closeRoadMapModal}></SelectRoadmap>
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
)(RoadMap);