import React, {  } from 'react';
import { useCookies } from 'react-cookie';

const Header = () => {
    const [cookies] = useCookies();
    
    return (
        <header>
            <h2><img src="/assets/img/future/sub_logo_future.png" alt="잉글리시 에그 퓨처플래너"/></h2>
            <div className="user_info">
                <img src="/assets/img/future/user_info.png" alt=""/>
                <span>{cookies.plannerName}</span>
            </div>
        </header>
    );
};

export default Header;
