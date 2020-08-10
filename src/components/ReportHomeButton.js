import React, {  } from 'react';
import { NavLink } from "react-router-dom";

const ReportHomeButton = () => {
    return (
        <div className="btn_wrap">
            <NavLink to="/home">
            <button className="on">Home</button>
            </NavLink>
        </div>
    );
};

export default ReportHomeButton;