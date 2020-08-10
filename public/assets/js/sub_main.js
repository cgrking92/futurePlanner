$(function(){
    // gnb
    var mType = 0;
    $('.main_menu li a').on('mouseenter',function () {
        $('.sub_menu').show();
    });
    $('.bookmark').on('mouseenter',function(){
        $('.sub_menu').show();
        if(! mType == 1){
            $('.sub_menu .btn_setting').css('display', 'inline-block');
        }
    });
    $('.sub_menu .btn_setting').on('click', function () {
        mType = 1;
        $('.sub_menu').addClass('bookmark_set');
        $(this).hide();
        $('.btn_ok, .btn_cancel').show();
    });
    $('.btn_ok, .btn_cancel').on('click', function () {
        $('.sub_menu').removeClass('bookmark_set');
        $('.btn_ok, .btn_cancel').hide();
        $('.btn_setting').show();
    });
    $('.sub_menu nav').on('mouseleave',function(){
        $('.sub_menu').hide();
    });
    $('header h1').on('mouseenter', function () {
        $('.sub_menu').hide();
    });
    //step select
    $('.step_info p').click(function () {
        $(this).next('ul').slideToggle('fast');
        $(this).toggleClass('on');
    });

    $('.step_info li').click(function () {
        var currentTxt = $(this).text();
        $(this).closest('.step_info').find('p').text(currentTxt).removeClass('on');
        $(this).parent().slideUp('fast');
    });
    //img popup
    $('.ly_link.img_list a').on('click',function(){
        var img_url = $(this).find('img').attr('src');
        $('.bg_dimmed').show();
        $('.ly_img').show();
        $('.ly_img .img_box img').attr('src', img_url);
        $('.page_btn').css('z-index','-1');
    });
    $('.ly_img .btn_ly_closed').on('click',function(){
        $('.ly_img').hide();
        $('.bg_dimmed').hide();
        $('.page_btn').css('z-index', '10');
    });

    $('.time_box a').click(function () {
        var thisNum = $(this).index() + 1;
        $('.time_box').removeClass().addClass('time_box').addClass('bg_' + thisNum);
        $('.cont_box').removeClass().addClass('cont_box').addClass('cont_' + thisNum);
    });

    $('.download_box .btn_movie').on('click', function () {
        $('.movie_layer').show();
        $('.bg_dimmed').show();
        var movieNum = $(this).attr('rel');
        $('.' + movieNum).addClass('on').siblings().removeClass('on');
        console.log(movieNum);
    });
    $('.movie_layer .btn_ly_closed').on('click', function(){
        $('.movie_layer').hide();
        $('.bg_dimmed').hide();
    });
});