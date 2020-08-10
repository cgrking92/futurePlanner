import React, { Component, } from 'react';
import Header from 'components/Header';
import Navigator from 'components/Navigator';
import StudyReportComponent from 'components/StudyReportComponent';
import ReportHomeButton from 'components/ReportHomeButton';

class StudyReport extends Component {
    render() {        
        return (
            <div className="wrap" style={{ height : 'auto',paddingBottom : '40px' }}>
                <div className="container">
                    <Header></Header>
                    <div className="contents _04_03">
                        <Navigator></Navigator>
                        <StudyReportComponent></StudyReportComponent>
                        <ReportHomeButton></ReportHomeButton>
                    </div>
                </div>
            </div>

        );
    }
}

export default StudyReport;