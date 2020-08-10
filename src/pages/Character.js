import React, {  } from 'react';
import {  NavLink } from "react-router-dom";

import Header from 'components/Header';
import Navigator from 'components/Navigator';

const Character = () => {
    const width25 = {width : '25%'};
    return (        
        <div className="wrap">
            <div className="container">
                <Header></Header>
                <div className="contents _05_01">
                    <Navigator></Navigator>
                    <div className="cont_box">
                        <p className="tit">우리 아이의 <br/><b>문자 준비도</b>를 알아보세요.</p>
                        <div className="img_wrap">
                            <img src="/assets/img/future/05_01.png" alt="" style={width25}/>
                        </div>
                    </div>
                    <div className="btn_wrap">
                        <NavLink to="/character/level"><button className="on" >Start</button></NavLink>
                    </div>
                </div>
            </div>
	    </div>
        
    );
};

export default Character;