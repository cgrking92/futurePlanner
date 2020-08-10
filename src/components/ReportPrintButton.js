import React from 'react';

const ReportPrintButton = () => {
    return (
        <div className="btn_wrap">
            <button className="on" type="button" onClick={() => window.print()}>Print</button>
        </div>
    );
};

export default ReportPrintButton;