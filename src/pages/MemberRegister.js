import React, {  } from 'react';
import StartComponent from 'components/StartComponent';
import { NavLink,useHistory } from "react-router-dom";
import axios from 'axios';
import * as apiConfig from '../lib/api';
import { useCookies } from 'react-cookie';

const MemberRegister = () => {
    const history = useHistory();
    const API_URL = apiConfig.API_URL;
    let requestData = {};
    const [cookies] =  useCookies();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (e.target.name.value === "") {
            alert('이름을 입력해주세요');

            return false;
        }

        if (e.target.email.value === "") {
            alert('이메일을 입력해주세요');

            return false;
        }

        if (e.target.hp.value === "") {
            alert('핸드폰을 입력해주세요');

            return false;
        }

        requestData = {
            childName : e.target.name.value,
            email : e.target.email.value,
            hp : e.target.hp.value,
            token : cookies.token
        }

        axios.post(API_URL+'/future/v1/regMember',requestData)
        .then(function (response) {
            if(response.data === true){
                alert('등록 성공');
                history.push('/searchMember');
            }else{
                alert('등록 실패');
            }
        })

        
    }

    return (
        <div className="wrap">
                <div className="container">
                    <StartComponent></StartComponent>
                    <div className="layer_pop">
                        <div className="inner _00_03">
                            <p className="tit">Test 진행 / Report 확인을 위하여 <br/>아래 정보를 입력 해 주세요.</p>
                            <form onSubmit={handleSubmit}>
                            <div className="input_wrap">
                                <input type="text" name="name" placeholder="이름"/>
                                <input type="text" name="email" placeholder="Email"/>
                                <input type="text" name="hp" placeholder="휴대폰 (-구분 없이 입력해 주세요.)"/>
                            </div>
                            <div className="btn_wrap">
                                <NavLink to="/">
                                <button>취소</button>
                                </NavLink>
                                <button className="on" type="submit">확인</button>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default MemberRegister;