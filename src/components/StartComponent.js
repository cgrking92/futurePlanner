import React, { useState } from 'react';
import Header from 'components/Header';
import { NavLink } from "react-router-dom";

const StartComponent = () => {
    const style = { margin:'40px 0 55px' };
    const imgStyle = { width: '45%' };    
    return (
        <div className="wrap">
            <div className="container">
                <Header></Header>
                <div className="contents _00_01">
                    <div className="img_wrap" style={style}>
                        <img src="/assets/img/future/main_00_01.png" alt="" style={imgStyle}/>
                    </div>
                    <div className="title">
                        <span>Future Planner</span>
                    </div>
                    <ul className="txt_list">
                        <li>진행을 위해서는 <b>미래고객 등록</b>을 완료하여야 합니다.</li>
                        <li>등록된 미래고객 / 정회원이 테스트를 진행할 경우 <b>등록 회원 사용</b>을 해주세요.</li>
                        {/* <li>테스트 진행 중인 고객은 <b>Test 진행 / Report 확인</b>을 클릭해 주세요.</li> */}
                    </ul>
                </div>
                <div className="btn_wrap">                    
                    <NavLink to="/searchMember">
                    <button className="on">Start</button>
                    </NavLink>                    
                </div>
            </div>
        </div>
            
    );
};


export default StartComponent;