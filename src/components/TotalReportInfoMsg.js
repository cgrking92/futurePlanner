import React, {  } from 'react';
import { useHistory } from 'react-router';

const TotalReportInfoMsg = (props) => {
    const history = useHistory();

    const showModal = () => {        
        props.setModalStatus();
    }

    return (
        <ul className="alarm_talk">
            <li>테스트별 항목을 클릭 하면 결과를 확인할 수 있습니다.</li>
            {history.location.pathname !== '/totalReport' &&
            <li>Total Report 결과를 카카오 알림톡으로 보낼 수 있습니다. <button type="button" onClick={showModal}>알림톡 보내기</button></li>
            }
        </ul>
    );
};

export default TotalReportInfoMsg;