import React,{} from 'react';
import Navigator from 'components/Navigator';
import Header from 'components/Header';

const CharacterSelectLevel = () => {
    const handleGoPage = (url) => {
        window.location.href = url;
    }
    return (
        <div className="wrap">
            <div className="container">
                <Header></Header>
                <div className="contents _05_02">
                    <Navigator></Navigator>
                    <div className="cont_box">
                        <div className="title"><span>EGG Sound Chart</span></div>
                        <p className="stit">우리 아이의 문자 준비도를 알아보세요.</p>
                        <div className="test_level_wrap">
                            <div>
                                <h2>Level  1</h2>
                                <div>Step4</div>
                                <button onClick={(e) => handleGoPage('/character/study?level=1&type=full')}>Full Version</button>
                                <button onClick={(e) => handleGoPage('/character/study?level=1&type=half')}>Half Version</button>
                            </div>
                            <div>
                                <h2>Level  2</h2>
                                <div>Step5</div>
                                <button onClick={(e) => handleGoPage('/character/study?level=2&type=full')}>Full Version</button>
                                <button onClick={(e) => handleGoPage('/character/study?level=2&type=half')}>Half Version</button>
                            </div>
                        </div>
                    </div>
                    {/* <div className="btn_wrap">
                        <button className="on">OK</button>
                    </div> */}
                </div>
            </div>
        </div>

    );
};

export default CharacterSelectLevel;