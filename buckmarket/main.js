
    /* global $ */
    
    function submitForm() {
        window.$('#frame').attr('src', 'thanks.html');
    }
    
    function inIframe () {
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    }
    
    $('#continue').on('click', function() {
        console.log('run');
        if (window.location.hash && !isNaN(window.location.hash.split('#')[1])) {
            if ($('#continue').hasClass('to-submit')) {
                var submit = confirm('Are you sure you want to submit the form? This action cannot be undone.');
                if (submit) {
                    $('#continue').addClass('is-loading');
                    submitForm();
                }
            } else {
                var sectionId = '#' + (Number(window.location.hash.split('#')[1]) + 1).toString();
                console.log(sectionId);
                $('section' + sectionId).css('display', 'block');
                if ($('section' + sectionId).hasClass('to-submit')) {
                    $('#continue').html('&nbsp;Submit&nbsp;&nbsp;&nbsp;<i class="fas fa-check"></i>&nbsp;');
                    $('#continue').addClass('to-submit');
                }
                window.location.href = sectionId;
            }
        } else {
            if($('#name').val() !== '') {
                var cell = $('#cell').val().replace(/\D/g,'');
                if (cell.length === 10) {
                    var type;
                    if ($('#booth').val() === 'vendor') {
                        type = 7;
                    } else {
                        type = 2;
                    }
                    $('#booth').attr('disabled', 'disabled');
                    $('#cell').removeClass('is-danger');
                    $('#name').removeClass('is-danger');
                    $('section#' + type.toString()).css('display', 'block');
                    window.location.href = '#' + type.toString();
                } else {
                    $('#cell').addClass('is-danger animated shake fast');
                    setTimeout(function(){
                        $('#cell').removeClass('animated shake fast');
                    }, 1000);
                }
            } else {
                $('#name').addClass('is-danger animated shake fast');
                setTimeout(function(){
                    $('#name').removeClass('animated shake fast');
                }, 1000);
            }
        }
    });

    /*if(!inIframe()) {
        window.location.href = './';
    }*/
    
