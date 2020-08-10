import React, { useState,useEffect } from 'react';
import { NavLink,useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const TotalReportTap = () => {
    const [cookies] = useCookies();
    const lifeStatus = cookies.lifeData.status;
    const studyStatus = cookies.studyData.status
    const roadMapStatus = cookies.roadMap===0?'ready':'complete';
    const characterStatus = 'ready';
    const [curLocation,setLocation] = useState({
        life : '',
        study : '',
        roadMap : '',
        character : ''
    });

   

    const history = useHistory();
    const curRoute = history.location.pathname;
    
    const switchTap =  () => {
        switch (curRoute) {
            case '/totalReport/life':
                setLocation({
                    life : ' on',
                    study : '',
                    character : '',
                    roadMap : ''
                });
                break;
            case '/totalReport/study':
                setLocation({
                    life : '',
                    study : ' on',
                    character : '',
                    roadMap : ''
                });
                break;
            case '/totalReport/character':
                setLocation({
                    life : '',
                    study : '',
                    character : ' on',
                    roadMap : ''
                });
                break;
            case '/totalReport/roadMap':
                setLocation({
                    life : '',
                    study : '',
                    character : '',
                    roadMap : ' on'
                });
                break;
        
            default:
                break;
        }
    }
    useEffect(() => {
        switchTap();
    },[curRoute,studyStatus,lifeStatus,roadMapStatus,characterStatus]);
            
    return (             
        <div className="report_tab">            
            <div className={[lifeStatus,curLocation.life]}>
                <NavLink to="/totalReport/life">생활 성향 진단 Report</NavLink>                    
            </div>
            <div className={[studyStatus,curLocation.study]}>
                <NavLink to="/totalReport/study">습득 성향 진단 Report</NavLink>
            </div>
            <div className={[characterStatus,curLocation.character]}>                
                <NavLink to="/totalReport/character">문자 습득 진단 Report</NavLink>
            </div>
            <div className={[roadMapStatus,curLocation.roadMap]}>
                <NavLink to="/totalReport/roadMap">EGG Road Map</NavLink>
            </div>
        </div>
    );
};

export default TotalReportTap;