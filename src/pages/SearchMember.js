import React, { useState } from 'react';
import Header from 'components/Header';
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useStore } from "react-redux";
import * as memberActions from 'modules/Member';
import axios from 'axios';
import * as apiConfig from '../lib/api';
import { useCookies } from 'react-cookie';

const SearchMember = (props) => {
    const width8 = { width: '8%' };
    const width10 = { width: '10%' };
    const widthAuto = { width: 'auto' };
    const margin = { marginTop: '150px' };
    const API_URL = apiConfig.API_URL;
    
    const [cookies,setCookie,removeCookies] =  useCookies();
    const token = cookies.token;
    const [childName,setChildName] = useState('');
    const [searchType,setSearchType] = useState('2');                
    const [isMemberSelected,setMemberSelected] = useState(false);    
    const [resultState, setResultState] = useState([{
        code : '',
        name : '',
        email : '',
        parent : '',
        phone : '',
        addr : '',
        center : ''
    }]);

    
    const store = useStore();
    const storeState = store.getState();
    const storedMemberName = storeState.Member.getIn(['selectedMember','name']);
    const handleChange = (e) => {
        setChildName(e.target.value);
        if (e.key === 'Enter') {
            handleGetMember();
        }
    }
    const setSelectedMember = (obj) => {        
        if (obj.name !== '') {            
            removeCookies('roadMap');
            removeCookies('storedData')
            const { MemberActions } = props;
            MemberActions.setMember(obj);
            setMemberSelected(true);
            setCookie('childName',obj.name,{path : '/',maxAge : 18000});
            setCookie('em_no',obj.code,{path : '/',maxAge : 18000});
            setCookie('center',obj.center,{path : '/',maxAge : 18000});
            setCookie('phone',obj.phone,{path : '/',maxAge : 18000});
            setCookie('parent',obj.parent,{path : '/',maxAge : 18000});
            setCookie('memberType',searchType,{path : '/',maxAge : 18000});
        }
    }
    

    const sample = (responseData) => {
        setResultState([]);
        const name = 'name';
        const email = 'email';
        const phone = 'phone';
        const parent = 'parent';
        const addr = 'addr';
        const center = 'center';
        const code = 'code';
        for (let i = 0; i < responseData.data.length; i++) {
            // for (let i = 0; i < 20; i++) {
            setResultState(prevState => [...prevState, { [name] : responseData.data[i].em_name,
                                                         [email] : responseData.data[i].em_email,
                                                         [parent] : responseData.data[i].em_parent,
                                                         [phone] : responseData.data[i].em_hp,
                                                         [addr] : responseData.data[i].em_addr1,
                                                         [center] : responseData.data[i].eb_name,
                                                         [code] : responseData.data[i].em_no
                                                       }])            
        }
    }
    

    const handleSearchType = (e) => {
        setResultState([]);
        setSearchType(e.target.value);
    }    

    const handleGetMember = () => {      
        const requestData = {
            childName : childName,
            searchType : searchType,
            token : token            
        }
        
        axios.post(API_URL+'/future/v1/getMember',requestData, {
            headers : { 'Accept': 'application/json', 'Content-Type': 'application/json' }
        })
        .then(function (response) {                              
            sample(response)
            
        })

        // axios.post(API_URL+'/future/v1/getMember',requestData)
        // axios({
        //     method : 'post',
        //     url : API_URL+'/future/v1/getMember',
        //     data : JSON.stringify(requestData),
        //     headers : { 'Accept': 'application/json', 'Content-Type': 'application/json' }
        // }) 
        // .then(function (response) {                              
        //     sample(response)
            
        // })
    }

    const memberMouseOver = (e) => {
        e.target.parentElement.style.backgroundColor = "#fff2ac";
        e.target.parentElement.style.backgroundImage = "linear-gradient(to right, #ffe359 0%, #fff2ac 100%)"
    }

    const memberMouseOut = (e) => {
        e.target.parentElement.style.backgroundColor = "";
        e.target.parentElement.style.backgroundImage = ""
    }

    return (
        <div className="wrap" style={{height : 'auto',paddingBottom : '40px'}}>
            {console.log(1)}
            <div className="container">
                <Header></Header>
                <div className="contents _00_02">
                    <article>
                        <h3 className="tbl_tit">미래고객, 정회원을 선택 후 검색 하세요.</h3>
                        <div className="cont">
                            <div>
                                <input type="radio" id="r1" name="r1" value="1" onClick={handleSearchType} />
                                <label htmlFor="r1"></label>
                                <span>미래고객</span>
                            </div>
                            <p>※ 미래고객으로 등록되지 않은 회원은 신규로 등록 해 주세요.</p>                        
                            <button>
                                <a href="https://ecm.englishegg.co.kr/iceBreaking">미래고객 등록</a>
                            </button>
                        </div>
                        <div className="cont">
                            <div>
                                <input type="radio" id="r2" name="r1" value="2" defaultChecked onClick={handleSearchType}/>
                                <label htmlFor="r2"></label>
                                <span>정회원</span>
                            </div>
                            <div className="search_box">
                                <input type="text" onKeyUp={handleChange} />
                                <button type="button" onClick={handleGetMember}>
                                    <img src="/assets/img/ico_search.png" alt="검색"/>
                                </button>
                            </div>
                        </div>
                    </article>
                    <article>
                        <h3 className="tbl_tit">아래 회원 중 테스트를 진행할 회원을 선택하시기 바랍니다.</h3>
                        <table>
                            <colgroup>
                                <col style={width8}/>
                                <col style={width8}/>
                                <col style={width8}/>
                                <col style={width10}/>
                                <col style={widthAuto}/>
                                <col style={width10}/>
                                <col style={widthAuto}/>
                                <col style={width10}/>
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>회원코드</th>
                                    <th>회원명</th>
                                    <th>부모명</th>
                                    <th>휴대폰</th>
                                    <th>주소</th>
                                    <th>센터 / 멘토</th>
                                    <th>이메일</th>
                                    <th>보유제품</th>
                                </tr>
                            </thead>
                            <tbody>                            
                                {Object.entries(resultState).map((t,k) => 
                                <tr onMouseOver={memberMouseOver} onMouseOut={memberMouseOut} style={{ cursor : 'pointer' }} key={k} onClick={(e) => setSelectedMember(t[1])}>
                                    <td>{t[1].code}</td>
                                    <td>{t[1].name}</td>
                                    <td>{t[1].parent}</td>
                                    <td>{t[1].phone}</td>
                                    <td>{t[1].addr}</td>
                                    <td>{t[1].center}</td>
                                    <td>{t[1].email}</td>
                                    <td></td>
                                </tr> )}
                            </tbody>
                        </table>
                    </article>
                    {isMemberSelected === true &&
                    <h3 className="tbl_tit">선택 된 "{storedMemberName}" 회원으로 테스트가 진행됩니다.</h3>
                    }
                </div>
                {isMemberSelected === true &&
                <div className="btn_wrap" style={margin}>
                    <NavLink to="/home">
                    <button className="on">Test 진행 / Report 확인</button>
                    </NavLink>
                </div>
                    }
            </div>
        </div>
    );
};
export default connect(
    (state) => ({
        value : state.input
    }),
    (dispatch) => ({
        MemberActions : bindActionCreators(memberActions,dispatch)
    })
)(SearchMember)
