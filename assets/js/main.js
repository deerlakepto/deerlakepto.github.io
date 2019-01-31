
    /* global $ */
    
    $(window).scroll(function (event) {
        var scroll = $(window).scrollTop();
        if (scroll > 0) {
            $('#logo').css('backgroundImage', 'linear-gradient(141deg, #dfd8d9 0%, whitesmoke 71%, white 100%)');
            $('#logo').css('box-shadow', '0.5px 0.5px 2px #363636');
        } else {
            $('#logo').css('backgroundImage', 'none');
            $('#logo').css('box-shadow', 'none');
        }
    });
    
    $(document).ready(function() {
        var scroll = $(window).scrollTop();
        if (scroll > 0) {
            $('#logo').css('backgroundImage', 'linear-gradient(141deg, #dfd8d9 0%, whitesmoke 71%, white 100%)');
            $('#logo').css('box-shadow', '0.5px 0.5px 2px #363636');
        } else {
            $('#logo').css('backgroundImage', 'none');
            $('#logo').css('box-shadow', 'none');
        }
       $('#blog-app-mobile').html($('#blog-app-desktop').html());
    });