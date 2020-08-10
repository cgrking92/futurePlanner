import React, { Component } from 'react';
import Navigator from 'components/Navigator';
import Header from 'components/Header';
import { NavLink } from "react-router-dom";

class TrialVideo extends Component {
    render() {
        return (
                <div className="wrap">
                    <div className="container">
                        <Header></Header>
                        <div className="contents _02_01">                           
                            <Navigator></Navigator>
                            <p className="tit">EGG 콘텐츠 미리 만나기!<br/><b>Trial Video 단계</b> 입니다. <br/>원하시는 콘텐츠를 선택해 주세요.</p>
                            <ul>
                                <li>
                                    <NavLink to="trialVideo/view/1">
                                        <img src="/assets/img/future/02_01_img01.png" alt=""/>
                                    </NavLink>
                                    <b>Who Is It?</b>
                                </li>
                                <li>
                                    <NavLink to="trialVideo/view/2">
                                        <img src="/assets/img/future/02_01_img02.png" alt=""/>
                                    </NavLink>
                                    <b>Mommy, Look at Me!</b>
                                </li>
                                <li>
                                    <NavLink to="trialVideo/view/3">
                                        <img src="/assets/img/future/02_01_img03.png" alt=""/>
                                    </NavLink>
                                    <b>Daddy, Wake Up!</b>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

        );
    }
}

export default TrialVideo;