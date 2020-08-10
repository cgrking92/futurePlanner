import React, {  } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
const Navigator = () => {    
    const activeStyle = { color : '#ec6413' }
    const history = useHistory();
    const ageCheck = (e) => {
        e.preventDefault();
        
        if (window.confirm('7세 이상 어린이만 대상으로 서비스 됩니다. 확인 후 이용해 주세요.')) {
            history.push('/character');
        }
        
    }

    return (
        <nav>
            <ul>
                <li>                            
                    <NavLink to="/home" activeStyle={activeStyle}>
                        <img src="/assets/img/future/nav01.png" alt=""/>
                        <span>Home</span>
                    </NavLink>
                </li>                        
                <li>                            
                    <NavLink to="/trialVideo" activeStyle={activeStyle}>
                        <img src="/assets/img/future/nav02.png" alt=""/>
                        <span>Trial Video</span>
                    </NavLink>                
                </li>
                <li>
                    <NavLink to="/life" activeStyle={activeStyle}>                            
                        <img src="/assets/img/future/nav03.png" alt=""/>
                        <span>생활 성향 진단</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/study" activeStyle={activeStyle}>
                        <img src="/assets/img/future/nav04.png" alt=""/>
                        <span>습득 성향 진단</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/character" activeStyle={activeStyle} onClick={ageCheck}>
                        <img src="/assets/img/future/nav05.png" alt=""/>
                        <span>문자 습득 진단</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/totalReport" activeStyle={activeStyle}>
                        <img src="/assets/img/future/nav06.png" alt=""/>
                        <span>Total Report</span>
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};


export default Navigator;