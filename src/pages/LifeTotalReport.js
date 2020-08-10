import React, { useEffect,useState, Fragment } from 'react';
import Header from 'components/Header';
import Navigator from 'components/Navigator';
import LifeReportComponent from 'components/LifeReportComponent';
import TotalReportInfoMsg from 'components/TotalReportInfoMsg';
import TotalReportTap from 'components/TotalReportTap';
import ReportKakao from 'components/ReportKakao';
import { useCookies } from 'react-cookie';
const LifeTotalReport = () => {

    const [cookies] = useCookies();
    const totalScore = cookies.lifeData.testResult.interest.total;
    const [isTest,toggleTest] = useState(false);

    const [modalStatus,setModalStatus] = useState('none');

    const showModal = () => {
        setModalStatus('block');
    }

    const closeModal = () => {
        setModalStatus('none');
    }

    useEffect(()=> {
        if (totalScore > 0) {
            toggleTest(true);
        }
    },[totalScore]);

    return (
        <Fragment>
        <div className="wrap" style={{height : 'auto',paddingBottom : '40px'}}>
            <div className="container">
                <Header></Header>
                <div className="contents _06_01">
                    <Navigator/>
                    <TotalReportInfoMsg setModalStatus={showModal}/>
                    <TotalReportTap/>
                    <LifeReportComponent/>                    
                </div>
            </div>
        </div>
        <ReportKakao modalStatus={modalStatus} closeModal={closeModal}></ReportKakao>
        </Fragment>
    );
};

export default LifeTotalReport;