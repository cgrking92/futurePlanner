import React, { useState } from 'react';

import * as inputActions from 'modules/Roadmap';
import LoadingImg from '../components/LoadingImg';
import axios from 'axios';
import * as apiConfig from '../lib/api';
import { useCookies } from 'react-cookie';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useHistory } from 'react-router';

const SelectRoadmap = (props) => {
    let modalStatus = {
        display : props.modalStatus,
    };
    const API_URL = apiConfig.API_URL;
    const [showImg,toggleImg] = useState(false);
    const history = useHistory();
    const [cookies,setCookies] = useCookies();
    
    const closeModal = () => {
        props.closeModal();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        toggleImg(!showImg);        
        const obj = {
            roadMap : Number(e.target.check2.value),
            roadMapComment : e.target.comment.value
        }
        const requestData = {
            type : 'roadMap',
            code : cookies.em_no,
            jsonStr : JSON.stringify(obj),
            token : cookies.token,
            memberType : cookies.memberType
        }
        props.InputActions.setRoadmap(obj);
        axios.post(API_URL+'/future/v1/saveTestResult',requestData)
        .then(function (response) {
            if (response.data === true) {
                setCookies('roadMap',Number(obj.roadMap,{path : '/',maxAge : 18000}));
                setCookies('roadMapComment',obj.roadMapComment,{path : '/',maxAge : 18000});
                setTimeout(() =>{ alert('제출되었습니다'); history.push('/totalReport/roadMap') },2000);
            }else{
                setTimeout(() =>{ alert('데이터 서버 저장 실패'); history.push('/totalReport/roadMap') },2000);
            }
       })
    }

    return (
        <div className="layer_pop" style={modalStatus}>
            {showImg === true &&
            <LoadingImg></LoadingImg>
            }
            <div className="inner _05_05" style={{ height : '710px' }}>
                <form onSubmit={handleSubmit}>
                <div className="title"><span>Road Map 결과 선택 (for Staff)</span></div>       
                <div className="for_staff">                    
                    <div className="btm_box">
                        <div className="roadmap_box">
                            <h2>EGG Road Map</h2>                            
                            <table>
                                <colgroup>
                                    <col style={{ width:'50px' }}/>
                                    <col style={{ width:'auto' }}/>
                                </colgroup>
                                <thead>
                                    <tr>                                        
                                        <th colSpan="2">Road Map</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><input type="radio" id="ch2_2" name="check2" value="1"/></td>
                                        <td><label htmlFor="ch2_2">3~4세</label></td>
                                    </tr>
                                    <tr>
                                        <td><input type="radio" id="ch2_3" name="check2" value="2"/></td>
                                        <td><label htmlFor="ch2_3">4~5세</label></td>
                                    </tr>
                                    <tr>
                                        <td><input type="radio" id="ch2_4" name="check2" value="3"/></td>
                                        <td><label htmlFor="ch2_4">6~7세</label></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="comment_box">
                            <h2>General Comment</h2>
                            <textarea name="comment" id="" cols="30" rows="10" defaultValue=""></textarea>
                        </div>
                    </div>
                </div>         
                <div className="btn_wrap">
                    <button type="button" onClick={closeModal}>취소</button>
                    <button className="on" type="submit">확인</button>
                </div>
                <button type="button" className="btn_closed" onClick={closeModal}>
                    <img src="../assets/img/ico_closed.png" alt="레이어닫기"/>
                </button>
                </form>
            </div>
        </div>
    );
};

export default connect(
    (state) => ({
        value: state.input
    }),
    (dispatch) => ({
        InputActions : bindActionCreators(inputActions,dispatch)
    })
)(SelectRoadmap);
