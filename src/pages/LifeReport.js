import React, {  } from 'react';
import Header from 'components/Header';
import Navigator from 'components/Navigator';
import LifeReportComponent from 'components/LifeReportComponent';
import ReportHomeButton from 'components/ReportHomeButton';

const LifeReport = () => {

    return (
            <div className="wrap" style={{height : 'auto',paddingBottom : '40px'}}>
                <div className="container">
                    <Header></Header>
                    <div className="contents _03_03">
                        <Navigator></Navigator>
                        <LifeReportComponent></LifeReportComponent>
                        <ReportHomeButton></ReportHomeButton>
                    </div>
                </div>
            </div>
    );
};


export default LifeReport;