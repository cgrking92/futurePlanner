import React, { Fragment, useState } from 'react';
import Header from 'components/Header';
import SelectRoadmap from 'components/SelectRoadmap';
import { NavLink } from "react-router-dom";
import { useStore } from "react-redux";
import { useCookies } from 'react-cookie';

const Home = () => {
    const [cookies] = useCookies();
    
    const lifeStatus = cookies.lifeData.status;
    console.log(cookies.lifeData);
    const videoStatus = cookies.trialVideoData.status;
    const studyStatus = cookies.studyData.status;
    const [modalStatus,setModalStatus] = useState('none');
    const imgMouseOver = (e) => {
        e.target.src = e.target.src.replace(/.png/, '_on.png');
    }
    const imgMouseOut = (e) => {
        e.target.src = e.target.src.replace(/_on\.png/, '.png');
    }

    const closeModal = () => {
        setModalStatus('none');
    }

    const showModal = () => {
        setModalStatus('block');
    }

    return (
        <Fragment>
            <div className="wrap">
                <div className="container">
                    <Header></Header>
                    <div className="contents home">
                        <ul className="home_list">
                            <li className={videoStatus}>
                                <NavLink to="/trialVideo">
                                    <img src="/assets/img/future/home01.png" alt="" onMouseOver={imgMouseOver} onMouseOut={imgMouseOut}/>
                                </NavLink>
                                <b >Trial Video</b>                            
                            </li>
                            <li className={lifeStatus}>
                                <NavLink to="/life">
                                    <img src="/assets/img/future/home02.png" alt="" onMouseOver={imgMouseOver} onMouseOut={imgMouseOut}/>
                                </NavLink>
                                <b>생활 성향 진단</b>
                            </li>
                            <li className={studyStatus}>
                                <NavLink to="/study">
                                    <img src="/assets/img/future/home03.png" alt="" onMouseOver={imgMouseOver} onMouseOut={imgMouseOut}/>
                                </NavLink>
                                <b>습득 성향 진단</b>
                            </li>
                            <li className="progress">
                                <NavLink to="/character">
                                    <img src="/assets/img/future/home04.png" alt="" onMouseOver={imgMouseOver} onMouseOut={imgMouseOut}/>
                                </NavLink>
                                <b>문자 습득 진단</b>
                                7세 이상만 진단 가능
                            </li>
                            <li>
                                <a href="#" onClick={showModal}>
                                    <img src="/assets/img/future/home05.png" alt="" onMouseOver={imgMouseOver} onMouseOut={imgMouseOut}/>
                                </a>
                                <b>EGG Road Map</b>
                            </li>
                            
                            <li>
                                <NavLink to="/totalReport">
                                    <img src="/assets/img/future/home06.png" alt="" onMouseOver={imgMouseOver} onMouseOut={imgMouseOut}/>
                                </NavLink>
                                <b>Total Report</b>
                            </li>                        
                        </ul>
                    </div>
                </div>
            </div>
            <SelectRoadmap modalStatus={modalStatus} closeModal={closeModal}></SelectRoadmap>
        </Fragment>
    );
};


export default Home;
    