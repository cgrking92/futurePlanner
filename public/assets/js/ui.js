$(function () {

    // home.html
    // $('.home_list li').find('img').hover(function () { 
    //     $(this).attr("src", $(this).attr("src").replace(/.png$/, '_on.png')); 
    // }, function () { 
    //     $(this).attr("src", $(this).attr("src").replace(/_on\.png$/, '.png')); 
    // });

    // level test
    if ($('._05_04').length > 0) { 
        $('.img_mask .swiper-slide img').hide();
        $('.img_mask .swiper-slide p').click(function(){
            $(this).hide();
            $(this).next('img').fadeIn();
        });
    }
    
});




