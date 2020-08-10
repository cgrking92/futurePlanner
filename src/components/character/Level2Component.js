import React,{useEffect, Fragment} from 'react';
const Level2Component = (props) => {

    let questions = []; 

    if(props.type === "full"){
        questions  = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
    } else {
        questions  = [1,2,3,4,5,6,7,8,9,10,11,12];
    }

    useEffect(() => {
        return function cleanup(){
        }
    }, [props]);

    return (
		<Fragment>
        <div className="cont_box">
            <p className="tit">Level 2 (Step 5)</p>
            <div className="step_box paginations swiper-container">
                <ul className="swiper-wrapper">
                    {
                        questions.map((item, i)=>{
                            return (
                            <li key={i} className="swiper-slide on">{item}</li>
                            )}
                        )
                    }
                </ul>
            </div>
            <div className="img_test_box">
                <div className="img_mask lv2 swiper-container">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide">
                            <p>b<b>a</b>t</p>
                            <img src="../assets/img/future/lv2_img1.png" alt=""/>
                        </div>
                        <div className="swiper-slide">
                            <p><b>e</b>gg</p>
                            <img src="../assets/img/future/lv2_img2.png" alt=""/>
                        </div>
                        <div className="swiper-slide">
                            <p>p<b>i</b>nk</p>
                            <img src="../assets/img/future/lv2_img3.png" alt=""/>
                        </div>
                        <div className="swiper-slide">
                            <p>b<b>o</b>x</p>
                            <img src="../assets/img/future/lv2_img4.png" alt=""/>
                        </div>
                        <div className="swiper-slide">
                            <p>d<b>u</b>ck</p>
                            <img src="../assets/img/future/lv2_img5.png" alt=""/>
                        </div>
                        <div className="swiper-slide">
                            <p><b>ch</b>eese</p>
                            <img src="../assets/img/future/lv2_img6.png" alt=""/>
                        </div>
                        <div className="swiper-slide">
                            <p><b>ph</b>one</p>
                            <img src="../assets/img/future/lv2_img7.png" alt=""/>
                        </div>
                        <div className="swiper-slide">
                            <p><b>sh</b>oes</p>
                            <img src="../assets/img/future/lv2_img8.png" alt=""/>
                        </div>
                        <div className="swiper-slide">
                            <p><b>th</b>ree</p>
                            <img src="../assets/img/future/lv2_img9.png" alt=""/>
                        </div>
                        <div className="swiper-slide">
                            <p><b>wh</b>ite</p>
                            <img src="../assets/img/future/lv2_img10.png" alt=""/>
                        </div>
                        <div className="swiper-slide">
                            <p>r<b>ai</b>n</p>
                            <img src="../assets/img/future/lv2_img11.png" alt=""/>
                        </div>
                        <div className="swiper-slide">
                            <p>s<b>au</b>sage</p>
                            <img src="../assets/img/future/lv2_img12.png" alt=""/>
                        </div>
                        {props.type === 'full' &&
                        <Fragment>
                        <div className="swiper-slide">
                            <p>t<b>ee</b>th</p>
                            <img src="../assets/img/future/lv2_img13.png" alt=""/>
                        </div>
                        <div className="swiper-slide">
                            <p>j<b>ew</b>el</p>
                            <img src="../assets/img/future/lv2_img14.png" alt=""/>
                        </div>
                        <div className="swiper-slide">
                            <p>b<b>i</b>k<b>e</b></p>
                            <img src="../assets/img/future/lv2_img15.png" alt=""/>
                        </div>
                        <div className="swiper-slide">
                            <p>r<b>o</b>s<b>e</b></p>
                            <img src="../assets/img/future/lv2_img16.png" alt=""/>
                        </div>
                        <div className="swiper-slide">
                            <p>t<b>oi</b>let</p>
                            <img src="../assets/img/future/lv2_img17.png" alt=""/>
                        </div>
                        <div className="swiper-slide">
                            <p>cl<b>ou</b>d</p>
                            <img src="../assets/img/future/lv2_img18.png" alt=""/>
                        </div>
                        <div className="swiper-slide">
                            <p>ball<b>oo</b>n</p>
                            <img src="../assets/img/future/lv2_img19.png" alt=""/>
                        </div>
                        <div className="swiper-slide">
                            <p>b<b>oo</b>k</p>
                            <img src="../assets/img/future/lv2_img20.png" alt=""/>
                        </div>
                        <div className="swiper-slide">
                            <p>l<b>o</b>ve</p>
                            <img src="../assets/img/future/lv2_img21.png" alt=""/>
                        </div>
                        <div className="swiper-slide">
                            <p>c<b>u</b>shion</p>
                            <img src="../assets/img/future/lv2_img22.png" alt=""/>
                        </div>
                        <div className="swiper-slide">
                            <p>bl<b>ue</b></p>
                            <img src="../assets/img/future/lv2_img23.png" alt=""/>
                        </div>
                        <div className="swiper-slide">
                            <p>dragonfl<b>y</b></p>
                            <img src="../assets/img/future/lv2_img24.png" alt=""/>
                        </div>
                        </Fragment>
                        }
                    </div>
                </div>
                <button className="swiper-button-prev"><img src="../assets/img/ico_left.png" alt=""/></button>
                <button className="swiper-button-next"><img src="../assets/img/ico_right.png" alt=""/></button>
            </div>
        </div>

        </Fragment>
    );
};

export default Level2Component;