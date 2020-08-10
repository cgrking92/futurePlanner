import React from 'react';
import axios from 'axios';
import * as apiConfig from '../lib/api';

const SampleLogin = () => {
    const API_URL = apiConfig.API_URL;
    const handleSubmit = (e) => {        
        e.preventDefault();
        const requestData = {
            id : 'itmentor1',
            pass : 'itmentor1',
        }

        axios.post(API_URL+'/login/check', requestData)
        .then(function (response) {
            if(response.data === true){
                alert('등록 성공');
                //history.push('/searchMember');
            }else{
                alert('등록 실패');
            }
        })
        
    };
    return (
        <div className="wrap" style={{height : 'auto',paddingBottom : '40px'}}>
            <div><input type="text"  name="id" id="id"/></div>
            <div><input type="password" name="pass" id="pass"/></div>
            <button type="button"  onClick={handleSubmit}>Login</button>
        </div>
    );
};

export default SampleLogin;