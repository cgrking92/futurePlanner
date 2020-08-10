import React,{ Fragment,useState } from 'react';
import Navigator from 'components/Navigator';
import Header from 'components/Header';
import CharacterReportComponent from 'components/CharacterReportComponent';
import ReportHomeButton from 'components/ReportHomeButton';
import TotalReportInfoMsg from 'components/TotalReportInfoMsg';
import TotalReportTap from 'components/TotalReportTap';
import ReportKakao from 'components/ReportKakao';
import LoadingImg from '../components/LoadingImg';
import { useHistory } from 'react-router';

const CharacterReport = () => {

    const [modalStatus,setModalStatus] = useState('none');
    const [showImg, toggleImg] = useState(false);

    const showModal = () => {
        setModalStatus('block');
    }

    const closeModal = () => {
        setModalStatus('none');
    }

    const showLoading = (isShow) =>{
        toggleImg(isShow)
    };

    const history = useHistory();


    return (
        <Fragment>
            <div className="wrap" style={{height : 'auto',paddingBottom : '40px'}}>
                <div className="container">
                    { showImg === true && <LoadingImg></LoadingImg> }
                    <Header></Header>
                    <div className="contents _06_01">                
                    <Navigator></Navigator>
                    <TotalReportInfoMsg setModalStatus={showModal}></TotalReportInfoMsg>
                    <TotalReportTap></TotalReportTap>
                    <CharacterReportComponent showLoading={showLoading} ></CharacterReportComponent>
                    {history.location.pathname !== '/totalReport/character' &&
                    <ReportHomeButton></ReportHomeButton>
                    }
                    </div>
                </div>
            </div>
            <ReportKakao modalStatus={modalStatus} closeModal={closeModal}></ReportKakao>
        </Fragment>
        
    );
};

export default CharacterReport;