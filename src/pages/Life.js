import React, {  } from 'react';
import { Link } from 'react-router-dom';

import Header from 'components/Header';
import Navigator from 'components/Navigator';

const Life = () => {
    const width25 = { width : '25%' };
    return (
        <div className="wrap">
            <div className="container">
                <Header></Header>
                <div className="contents _03_01">
                    <Navigator></Navigator>
                    <div className="cont_box">
                        <p className="tit">우리 아이의 관심, 생활 습관을 통해 <br/><b>잉글리시 에그 콘텐츠와의 일치도</b>를 알아보세요.</p>
                        <div className="img_wrap">
                            <img src="/assets/img/future/03_01.png" alt="" style={width25} />
                        </div>
                    </div>
                    <div className="btn_wrap">
                        <Link to="/totalReport/life">
                        <button>Report</button>
                        </Link>
                        <Link to="/life/diagnosis">
                        <button className="on">Start</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Life;