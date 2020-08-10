import React from 'react';
import Header from 'components/Header';
import Navigator from 'components/Navigator';
import TotalReportTap from 'components/TotalReportTap';
import TotalReportInfoMsg from 'components/TotalReportInfoMsg';

const TotalReport = () => {
    return (
        <div className="wrap" style={{height : 'auto',paddingBottom : '40px'}}>
            <div className="container">
                <Header></Header>
                <div className="contents _06_01">
                    <Navigator/>
                    <TotalReportInfoMsg/>
                    <TotalReportTap/>                    
                </div>
            </div>
        </div>
    );
};

export default TotalReport;