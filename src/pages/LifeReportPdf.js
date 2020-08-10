import React, { Fragment } from 'react';
import Pdf from 'react-to-pdf';
import ReactDOM from 'react-dom';

const ref = React.createRef();

const LifeReportPdf = () => {

    const toPdf = () => {

    }
    return (
            <Fragment>
            <Pdf targetRef={ref} filename="sample.pdf">
            {({toPdf}) => <button type="button" onClick={toPdf}>test</button>}
            </Pdf>
            <div ref={ref} stlye={{ width: '100%',
                                                    height: '100%',
                                                    minHeight: '840px',
                                                    overflowY: 'auto',
                                                    paddingTop: '20px',
                                                    position: 'relative' }}>
            <div className="wrap"  >
                <div className="container"> 
                    <div className="contents _06_01">
                        <div className="print_wrap">
                            <div className="title">
                                <span>생활 성향 Report</span>
                            </div>
                            <p className="stit">우리 아이 생활 습관을 통해 잉글리시 에그와의 일치도를 알아보세요.</p>
                            <div style={{ marginTop: '20px' }}>
                                <div className="text_box">
                                    <b>홍길동</b>어린이는 <span>신체활동</span> ,<span>관계</span> 에 가장 높은 관심도를 보이고 있으며 <span>인지</span> 영역 발달에 더 많은
                                    관심을 가져야 될 것으로 보입니다.
                                    <br/><br/>
                                    높은 생활 관심도는 <span>신체활동</span> ,<span>관계</span> 이고, 프로파일은 잉글리시 에그 콘텐츠와 <span>86%</span> 일치하는 것으로
                                    나타났습니다.
                                </div>
                                <div className="profile_box">
                                    <div>
                                        <h3>흥미지수 프로파일</h3>
                                        <div className=""><img src="../assets/img/future/03_03_img01.png" alt=""/></div>
                                    </div>
                                    <div>
                                        <h3>인성 영역 프로파일</h3>
                                        <div className=""><img src="../assets/img/future/03_03_img02.png" alt=""/></div>
                                    </div>
                                </div>
                                <div className="book_box">
                                    <h3><b>'가족'</b> 에 연관된 에그 교재</h3>
                                    <ul>
                                        <li>
                                            <img src="../assets/img/future/03_03_book1.png" alt=""/>
                                            <span>Who Is It?</span>
                                        </li>
                                        <li>
                                            <img src="../assets/img/future/03_03_book2.png" alt=""/>
                                            <span>Daddy, <br/>Wake Up!</span>
                                        </li>
                                        <li>
                                            <img src="../assets/img/future/03_03_book3.png" alt=""/>
                                            <span>Uh-oh! <br/>I'm in Trouble!</span>
                                        </li>
                                        <li>
                                            <img src="../assets/img/future/03_03_book4.png" alt=""/>
                                            <span>Daddy, Please!</span>
                                        </li>
                                        <li>
                                            <img src="../assets/img/future/03_03_book5.png" alt=""/>
                                            <span>Hello?</span>
                                        </li>
                                        <li>
                                            <img src="../assets/img/future/03_03_book6.png" alt=""/>
                                            <span>What Do You <br/>Love the Best?</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="book_box">
                                    <h3><b>'관계'</b> 에 연관된 에그 교재</h3>
                                    <ul>
                                        <li>
                                            <img src="../assets/img/future/03_03_book7.png" alt=""/>
                                            <span>It's Mine</span>
                                        </li>
                                        <li>
                                            <img src="../assets/img/future/03_03_book8.png" alt=""/>
                                            <span>Lion the Liar</span>
                                        </li>
                                        <li>
                                            <img src="../assets/img/future/03_03_book9.png" alt=""/>
                                            <span>The Naughty <br/>Nickies</span>
                                        </li>
                                        <li>
                                            <img src="../assets/img/future/03_03_book10.png" alt=""/>
                                            <span>Stuck in the Mud</span>
                                        </li>
                                        <li>
                                            <img src="../assets/img/future/03_03_book11.png" alt=""/>
                                            <span>Town Mouse <br/>in the City</span>
                                        </li>
                                        <li>
                                            <img src="../assets/img/future/03_03_book12.png" alt=""/>
                                            <span>No, Cat. <br/>That's Bad!</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            </Fragment>
    );
};

const rootElement = document.getElementById('root');
// ReactDOM.render(<LifeReportPdf/>,rootElement);

export default LifeReportPdf;