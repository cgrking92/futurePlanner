import React,{useEffect, Fragment} from 'react';
const Level1Component = (props) => {
    let questions = []; 

    if(props.type === "full"){
        questions  = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
    } else {
        questions  = [1,2,3,4,5,6,7,8,9,10,11,12];
    }

    useEffect(() => {
        window.characterSwiperInit();
        return function cleanup(){
        }
    }, [props]);
    

    return (
        <div className="cont_box">
            <p className="tit">Level 1 (Step 4)</p>
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
                <div className="img_mask swiper-container">
                    <div className="swiper-wrapper">                        
                        <div className="swiper-slide">
                            <p><b>b</b>ear</p>
                            <img src="../assets/img/future/lv1_img1.png" alt=""/>
                        </div>
                        <div className="swiper-slide">
                            <p><b>c</b>andy</p>
                            <img src="../assets/img/future/lv1_img2.png" alt=""/>
                        </div>
                        <div className="swiper-slide">
                            <p><b>c</b>ircle</p>
                            <img src="../assets/img/future/lv1_img3.png" alt=""/>
                        </div>
                        <div className="swiper-slide">
                            <p><b>d</b>og</p>
                            <img src="../assets/img/future/lv1_img4.png" alt=""/>
                        </div>
                        <div className="swiper-slide">
                            <p><b>f</b>ish</p>
                            <img src="../assets/img/future/lv1_img5.png" alt=""/>
                        </div>
                        <div className="swiper-slide">
                            <p><b>g</b>reen</p>
                            <img src="../assets/img/future/lv1_img6.png" alt=""/>
                        </div>
                        <div className="swiper-slide">
                            <p><b>g</b>iraffe</p>
                            <img src="../assets/img/future/lv1_img7.png" alt=""/>
                        </div>
                        <div className="swiper-slide">
                            <p><b>h</b>at</p>
                            <img src="../assets/img/future/lv1_img8.png" alt=""/>
                        </div>
                        <div className="swiper-slide">
                            <p><b>j</b>uice</p>
                            <img src="../assets/img/future/lv1_img9.png" alt=""/>
                        </div>
                        <div className="swiper-slide">
                            <p><b>k</b>angaroo</p>
                            <img src="../assets/img/future/lv1_img10.png" alt=""/>
                        </div>
                        <div className="swiper-slide">
                            <p><b>l</b>ion</p>
                            <img src="../assets/img/future/lv1_img11.png" alt=""/>
                        </div>
                        <div className="swiper-slide">
                            <p><b>m</b>ilk</p>
                            <img src="../assets/img/future/lv1_img12.png" alt=""/>
                        </div>
                        {props.type === 'full' &&
                        <Fragment>
                        <div className="swiper-slide">
                            <p><b>n</b>ine</p>
                            <img src="../assets/img/future/lv1_img13.png" alt=""/>
                        </div>
                        <div className="swiper-slide">
                            <p><b>p</b>ig</p>
                            <img src="../assets/img/future/lv1_img14.png" alt=""/>
                        </div>
                        <div className="swiper-slide">
                            <p><b>q</b>ueen</p>
                            <img src="../assets/img/future/lv1_img15.png" alt=""/>
                        </div>
                        <div className="swiper-slide">
                            <p><b>r</b>ibbon</p>
                            <img src="../assets/img/future/lv1_img16.png" alt=""/>
                        </div>
                        <div className="swiper-slide">
                            <p><b>s</b>un</p>
                            <img src="../assets/img/future/lv1_img17.png" alt=""/>
                        </div>
                        <div className="swiper-slide">
                            <p><b>t</b>axi</p>
                            <img src="../assets/img/future/lv1_img18.png" alt=""/>
                        </div>
                        <div className="swiper-slide">
                            <p><b>v</b>an</p>
                            <img src="../assets/img/future/lv1_img19.png" alt=""/>
                        </div>
                        <div className="swiper-slide">
                            <p><b>w</b>atch</p>
                            <img src="../assets/img/future/lv1_img20.png" alt=""/>
                        </div>
                        <div className="swiper-slide">
                            <p>si<b>x</b></p>
                            <img src="../assets/img/future/lv1_img21.png" alt=""/>
                        </div>
                        <div className="swiper-slide">
                            <p><b>y</b>ellow</p>
                            <img src="../assets/img/future/lv1_img22.png" alt=""/>
                        </div>
                        <div className="swiper-slide">
                            <p><b>z</b>ebra</p>
                            <img src="../assets/img/future/lv1_img23.png" alt=""/>
                        </div>
                        </Fragment>
                        }
                        
                    </div>
                </div>
                <button className="swiper-button-prev"><img src="../assets/img/ico_left.png" alt=""/></button>
                <button className="swiper-button-next"><img src="../assets/img/ico_right.png" alt=""/></button>
            </div>
        </div>
    );
};

export default Level1Component;