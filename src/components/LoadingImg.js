import React from 'react';

const LoadingImg = () => {
    return (
        <div style={{ 
            position : 'fixed',
            top : '50%',
            left : '50%',
            zIndex : 10
        }}>
            <img alt="loading" src="/assets/img/loading.gif"></img>
        </div>
    );
};

export default LoadingImg;