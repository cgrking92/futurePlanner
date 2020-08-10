import React, {  } from 'react';
import { Link } from 'react-router-dom';

import Navigator from 'components/Navigator';
import Header from 'components/Header';

const Study = () => {
    const widt25 = { width : '25%' };
    return (
        <div className="wrap">
            <div className="container">
                <Header></Header>
                <div className="contents _04_01">
                    <Navigator></Navigator>
                    <div className="cont_box">
                        <p className="tit"><b>우리 아이 성향</b>을 통해<br/><b>알맞은 습득 방법</b>을 알아보세요.</p>
                        <div className="img_wrap">
                            <img src="/assets/img/future/04_01.png" alt="" style={widt25}/>
                        </div>
                    </div>
                    <div className="btn_wrap">
                        <Link to="/totalReport/study">
                        <button>Report</button>
                        </Link>
                        <Link to="/study/diagnosis">
                        <button className="on">Start</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Study;