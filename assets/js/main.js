
    /* global $, bulmaCarousel, Quill, atob, Blob */
    
    function quillGetHTML(inputDelta) {
        var tempCont = document.createElement("div");
        (new Quill(tempCont)).setContents(inputDelta);
        return tempCont.getElementsByClassName("ql-editor")[0].innerHTML;
    }
    
    function launchModal(target) {
        if (target.hasClass('is-active')) {
            $('html').css('overflow-y', 'auto');
            target.addClass('fadeOut');
            setTimeout(function() {
                target.removeClass('is-active');
                target.removeClass('fadeOut');
            }, 1000);
        } else {
            $('html').css('overflow-y', 'hidden');
            target.addClass('is-active');
            target.addClass('fadeIn');
            setTimeout(function() {
                target.removeClass('fadeIn');
            }, 1000);
        }
    }
    
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
        $.getJSON('https://usebasin.com/api/v1/submissions?filter_by=All&form_id=7238e4b51e37&page=1&query=&api_token=3ed9905cfa57651a22f4a3081147bc50', function(gave) {
            var i;
            var j = 1;
            var k = 1;
            var data = gave.submissions;
            var pages = Math.ceil(gave.meta.count / 250);
            for (i = 0; i < data.length; i++) {
                if (data[i].payload_params.type === 'calendar') {
                    var x = new Date(data[i].payload_params.time);
                    var y = new Date();
                    if (Number(x) >= Number(y)) {
                        calendar.push(data[i].payload_params);
                        if (j <= 12) {
                            $('#calendar-container').append('<div class="box">' + atob(data[i].payload_params.post) + '</div>');
                            j++;
                        }
                    }
                } else
                if (data[i].payload_params.type === 'blog') {
                    blog.push(data[i].payload_params);
                    if (k <= 4) {
                        $('#blog' + k + '-content').html(atob(data[i].payload_params.post));
                        $('#blog' + k + '-preview').html(atob(data[i].payload_params.pre));
                        k++;
                    }
                } else
                if (data[i].payload_params.type === 'newsletter') {
                    newsletter.push(data[i].payload_params.sub.toString());
                }
            }
            if (blog.length <= 4) {
                $('#blog-next').attr('disabled', 'disabled');
            }
            if (calendar.length === 0) {
                $('#calendar-container').append('<br /><p class="has-text-dark has-text-centered" style="width: 100%; font-size: 0.85em">(nothing to show)</p>');
            }
            $($('#calendarMonth').find('option')[d.getMonth()]).attr('selected', 'selected');
            $('#calendarDay').attr('value', d.getDate());
            $('#calendarYear').attr('min', d.getFullYear());
            $('#calendarYear').attr('value', d.getFullYear());
            $('#blog-next').on('click', function(e) {
                if (!$(this).is('[disabled]')) {
                    e.preventDefault();
                    blogPage = Number($(this).parent().data('page'));
                    console.log(blogPage);
                    if (blog.length <= (blogPage * 4 + 5)) {
                        $(this).attr('disabled', 'disabled');
                    }
                    $('#blog-prev').removeAttr('disabled');
                    $('#blog-current-page').html('&nbsp;&nbsp;Page ' + (blogPage + 1).toString() + '&nbsp;&nbsp;');
                    $(this).parent().data('page', (blogPage + 1).toString());
                    if (blog[blogPage * 4]) {
                        $('#blog1-content').html(atob(blog[blogPage * 4].post));
                        $('#blog1-preview').html(atob(blog[blogPage * 4].pre));
                    } else {
                        $('#blog1-content').html('');
                        $('#blog1-preview').html('');
                    }
                    if (blog[blogPage * 4 + 1]) {
                        $('#blog2-content').html(atob(blog[blogPage * 4 + 1].post));
                        $('#blog2-preview').html(atob(blog[blogPage * 4 + 1].pre));
                    } else {
                        $('#blog2-content').html('');
                        $('#blog2-preview').html('');
                    }
                    if (blog[blogPage * 4 + 2]) {
                        $('#blog3-content').html(atob(blog[blogPage * 4 + 2].post));
                        $('#blog3-preview').html(atob(blog[blogPage * 4 + 2].pre));
                    } else {
                        $('#blog3-content').html('');
                        $('#blog3-preview').html('');
                    }
                    if (blog[blogPage * 4 + 3]) {
                        $('#blog4-content').html(atob(blog[blogPage * 4 + 3].post));
                        $('#blog4-preview').html(atob(blog[blogPage * 4 + 3].pre));
                    } else {
                        $('#blog4-content').html('');
                        $('#blog4-preview').html('');
                    }
                }
            });
            $('#blog-prev').on('click', function(e) {
                if (!$(this).is('[disabled]')) {
                    e.preventDefault();
                    blogPage = Number($(this).parent().data('page'));
                    console.log(blogPage);
                    if (blogPage === 2) {
                        $(this).attr('disabled', 'disabled');
                    }
                    $('#blog-next').removeAttr('disabled');
                    $('#blog-current-page').html('&nbsp;&nbsp;Page ' + (blogPage - 1).toString() + '&nbsp;&nbsp;');
                    $(this).parent().data('page', (blogPage - 1).toString());
                    if (blog[(blogPage - 2) * 4]) {
                        $('#blog1-content').html(atob(blog[(blogPage - 2) * 4].post));
                        $('#blog1-preview').html(atob(blog[(blogPage - 2) * 4].pre));
                    } else {
                        $('#blog1-content').html('');
                        $('#blog1-preview').html('');
                    }
                    if (blog[(blogPage - 2) * 4 + 1]) {
                        $('#blog2-content').html(atob(blog[(blogPage - 2) * 4 + 1].post));
                        $('#blog2-preview').html(atob(blog[(blogPage - 2) * 4 + 1].pre));
                    } else {
                        $('#blog2-content').html('');
                        $('#blog2-preview').html('');
                    }
                    if (blog[(blogPage - 2) * 4 + 2]) {
                        $('#blog3-content').html(atob(blog[(blogPage - 2) * 4 + 2].post));
                        $('#blog3-preview').html(atob(blog[(blogPage - 2) * 4 + 2].pre));
                    } else {
                        $('#blog3-content').html('');
                        $('#blog3-preview').html('');
                    }
                    if (blog[(blogPage - 2) * 4 + 3]) {
                        $('#blog4-content').html(atob(blog[(blogPage - 2) * 4 + 3].post));
                        $('#blog4-preview').html(atob(blog[(blogPage - 2) * 4 + 3].pre));
                    } else {
                        $('#blog4-content').html('');
                        $('#blog4-preview').html('');
                    }
                }
            });
            let req = new XMLHttpRequest();
            req.onreadystatechange = () => {
                if (req.readyState == XMLHttpRequest.DONE) {
                    var response = JSON.parse(req.responseText);
                    carousel = response.carousel;
                    for (var i = 0; i < response.carousel.length; i++) {
                        $('#carousel-container').append('<div class="carousel-item has-background"><img class="is-background" src="' + response.carousel[i].url + '" alt="" width="640" height="310" /><div class="title">' + response.carousel[i].caption + '</div></div>')
                        $('#editCarouselSlides').append('<div class="editCarouselSlide" data-slide="' + (i + 1).toString() + '"><hr style="background-color: #ddd" /><br /><h4 class="title is-4"><a class="has-text-link" onclick="removeCarouselSlide(this.parentElement.parentElement)"><i class="fas fa-times fa-xs"></i></a>&nbsp;&nbsp;Slide ' + (i + 1).toString() + '</h4> <input type="text" class="input is-fullwidth carouselImage" placeholder="Image URL" value="' + response.carousel[i].url + '" /><br /><input type="text" class="input is-fullwidth carouselCaption" placeholder="Slide Caption" maxlength="80" value="' + response.carousel[i].caption + '" /><br /><div class="has-text-centered" style="width: 100%"><button onclick="updateCarouselSlide(this.parentElement.parentElement)" class="button is-dark">&nbsp;&nbsp;Update Slide&nbsp;&nbsp;</button></div><br /></div>')
                    }
                    var carousels = bulmaCarousel.attach();
                    var scroll = $(window).scrollTop();
                    if (scroll > 0) {
                        $('#logo').css('backgroundImage', 'linear-gradient(141deg, #dfd8d9 0%, whitesmoke 71%, white 100%)');
                        $('#logo').css('box-shadow', '0.5px 0.5px 2px #363636');
                    } else {
                        $('#logo').css('backgroundImage', 'none');
                        $('#logo').css('box-shadow', 'none');
                    }
                    $('#blog-app-mobile').html($('#blog-app-desktop').html());
                    $('[data-launch-modal]').on('click', function(e) {
                        var target = $('#' + $(this).data('launch-modal'));
                        e.preventDefault();
                        launchModal(target);
                    });
                    $('#loader').addClass('fadeOut');
                    $('#content').addClass('fadeIn');
                    $('#content').css('display', 'block');
                    setTimeout(function() {
                        $('#loader').css('display', 'none');
                    }, 1000);
                }
            };
            req.open('GET', 'https://api.jsonbin.io/b/5cb28647612a854ce451d985/latest', true);
            req.setRequestHeader('secret-key', '$2a$10$IXAdnKthslxv8Xq1Ms7Q5uy9QkdgfSUWxV//ijX.d7/UFe/vzJ0Ri');
            req.send();
        });
    });
    
    var toolbarOptions = [
        [{ 'font': [] }],
        ['bold', 'italic', 'underline', 'strike'],
        ['link', 'image', 'blockquote'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],
        [{ 'align': [] }, { 'indent': '-1'}, { 'indent': '+1' }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    ];
    
    
    var quill = new Quill('#editor-container', {
        modules: {
            toolbar: [
                [{ header: [1, 2, false] }],
                ['bold', 'italic', 'underline', 'strike', {'script': 'sub'}, {'script': 'super'}],
                [{'list': 'ordered'}, {'list': 'bullet'}, 'link']
            ]
        },
        placeholder: 'Let\'s create something great together.',
        theme: 'snow'
    });
    
    var quill2 = new Quill('#editor2-container', {
        modules: {
            toolbar: toolbarOptions
        },
        placeholder: 'And so it happened...',
        theme: 'snow'
    });
    
    var quill3 = new Quill('#editor3-container', {
        modules: {
            toolbar: [
                ['bold', 'italic', 'underline', 'strike'],
                [{'script': 'sub'}, {'script': 'super'}],
                ['link']
            ]
        },
        placeholder: 'Today, we\'ll create something new...',
        theme: 'snow'
    })
    
    var d = new Date();
    var blog = [];
    var newsletter = [];
    var calendar = [];
    var carousel = [];
    var blogPage = 1;
    var textFile = null;
    var makeTextFile = function (text) {
        var data = new Blob([text], {type: 'text/plain'});
        if (textFile !== null) {
            window.URL.revokeObjectURL(textFile);
        }
        textFile = window.URL.createObjectURL(data);
        return textFile;
    };
