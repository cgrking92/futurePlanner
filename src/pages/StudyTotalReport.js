import React, { useEffect,useState, Fragment } from 'react';
import Header from 'components/Header';
import Navigator from 'components/Navigator';
import StudyReportComponent from 'components/StudyReportComponent';
import TotalReportInfoMsg from 'components/TotalReportInfoMsg';
import TotalReportTap from 'components/TotalReportTap';
import NoReportComponent from 'components/NoReportComponent';
import ReportKakao from 'components/ReportKakao';
const StudyTotalReport = () => {
    const [modalStatus,setModalStatus] = useState('none');

    const showModal = () => {
        setModalStatus('block');
    }

    const closeModal = () => {
        setModalStatus('none');
    }

    useEffect(() => {
        
    },[]);
    
    return (
        <Fragment>
            <div className="wrap" style={{height : 'auto',paddingBottom : '40px'}}>
                <div className="container">
                    <Header></Header>
                    <div className="contents _06_01">
                        <Navigator/>
                        <TotalReportInfoMsg setModalStatus={showModal}/>
                        <TotalReportTap/>
                        <StudyReportComponent/>
                    </div>
                </div>
            </div>
            <ReportKakao modalStatus={modalStatus} closeModal={closeModal}></ReportKakao>
        </Fragment>
    );
};

export default StudyTotalReport;