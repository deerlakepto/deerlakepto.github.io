    
    /* global gapi, $, btoa, Image, quill,	quill2, quill3, quillGetHTML, newsletter, makeTextFile, atob, carousel */
	
	function checkImageExists(imageUrl, callBack) {
		var imageData = new Image();
		imageData.onload = function() {
			callBack(true);
		};
		imageData.onerror = function() {
			callBack(false);
		};
		imageData.src = imageUrl;
	}
	
	function getWhitelist(callback) {
		let req = new XMLHttpRequest();
		req.onreadystatechange = () => {
		  if (req.readyState == XMLHttpRequest.DONE) {
		    callback(JSON.parse(req.responseText));
		  }
		};
		req.open('GET', 'https://api.jsonbin.io/b/5cb2493a994f2a47176cae83/latest', true);
		req.setRequestHeader('secret-key', '$2a$10$IXAdnKthslxv8Xq1Ms7Q5uy9QkdgfSUWxV//ijX.d7/UFe/vzJ0Ri');
		req.send();
	}
	
	function removeFromWhitelist(user, given) {
		var element = given;
		if (signedIn) {
			if (confirm('Are you sure you want to remove this user from the whitelist?')){ 
				getWhitelist(function(response) {
					var whitelist = response.whitelist;
					whitelist.splice(whitelist.indexOf(btoa(user)), 1);
					let req = new XMLHttpRequest();
					req.onreadystatechange = () => {
						if (req.readyState == XMLHttpRequest.DONE) {
							var data = JSON.parse(req.responseText);
							if (data.success) {
								alert('Success!');
								$(element).remove();
							} else {
								alert('An unexpected error occured.')
							}
						}
					};
					req.open('PUT', 'https://api.jsonbin.io/b/5cb2493a994f2a47176cae83', true);
					req.setRequestHeader('Content-type', 'application/json');
					req.setRequestHeader('secret-key', '$2a$10$IXAdnKthslxv8Xq1Ms7Q5uy9QkdgfSUWxV//ijX.d7/UFe/vzJ0Ri');
					req.send(JSON.stringify({whitelist: whitelist}));
				});
			}
		}
	}
	
	function addToWhitelist(user) {
		if (signedIn) {
			getWhitelist(function(response) {
				var whitelist = response.whitelist;
				whitelist.push(btoa(user));
				let req = new XMLHttpRequest();
				req.onreadystatechange = () => {
					if (req.readyState == XMLHttpRequest.DONE) {
						var data = JSON.parse(req.responseText);
						if (data.success) {
							$('#addToWhitelist').removeClass('is-loading');
							alert('Success!');
						} else {
							$('#addToWhitelist').removeClass('is-loading');
							alert('An unexpected error occured.')
						}
					}
				};
				req.open('PUT', 'https://api.jsonbin.io/b/5cb2493a994f2a47176cae83', true);
				req.setRequestHeader('Content-type', 'application/json');
				req.setRequestHeader('secret-key', '$2a$10$IXAdnKthslxv8Xq1Ms7Q5uy9QkdgfSUWxV//ijX.d7/UFe/vzJ0Ri');
				req.send(JSON.stringify({whitelist: whitelist}));
			});
		}
	}
	
	function removeCarouselSlide(element) {
		if (signedIn) {
			$(element).children().filter('div.has-text-centered').children().filter('button.button').addClass('is-loading');
			var slide = $(element).attr('data-slide');
			carousel.splice((Number(slide) - 1), 1);
			if (confirm('Are you sure you want to remove this slide from the carousel? This action cannot be undone.')) {
				let req = new XMLHttpRequest();
				req.onreadystatechange = () => {
					if (req.readyState == XMLHttpRequest.DONE) {
						var data = JSON.parse(req.responseText);
						if (data.success) {
							$(element).children().filter('div.has-text-centered').children().filter('button.button').removeClass('is-loading');
							alert('Success!');
							window.location.href = './';
						} else {
							$(element).children().filter('div.has-text-centered').children().filter('button.button').removeClass('is-loading');
							alert('An unexpected error occured.');
						}
					}
				};
				req.open('PUT', 'https://api.jsonbin.io/b/5cb28647612a854ce451d985', true);
				req.setRequestHeader('Content-type', 'application/json');
				req.setRequestHeader('secret-key', '$2a$10$IXAdnKthslxv8Xq1Ms7Q5uy9QkdgfSUWxV//ijX.d7/UFe/vzJ0Ri');
				req.send(JSON.stringify({carousel: carousel}));
			} else {
				$(element).children().filter('div.has-text-centered').children().filter('button.button').addClass('is-loading');
			}
		}
	}
	
	function updateCarouselSlide(element) {
		if (signedIn) {
			$(element).children().filter('div.has-text-centered').children().filter('button.button').addClass('is-loading');
			var slide = $(element).attr('data-slide');
			carousel[Number(slide) - 1] = {
				url: $(element).children().filter('input.carouselImage').val(),
				caption: $(element).children().filter('input.carouselCaption').val()
			};
			if (confirm('Are you sure you want to update the carousel? This action cannot be undone.')) {
				let req = new XMLHttpRequest();
				req.onreadystatechange = () => {
					if (req.readyState == XMLHttpRequest.DONE) {
						var data = JSON.parse(req.responseText);
						if (data.success) {
							$(element).children().filter('div.has-text-centered').children().filter('button.button').removeClass('is-loading');
							alert('Success!');
							window.location.href = './';
						} else {
							$(element).children().filter('div.has-text-centered').children().filter('button.button').removeClass('is-loading');
							alert('An unexpected error occured.');
						}
					}
				};
				req.open('PUT', 'https://api.jsonbin.io/b/5cb28647612a854ce451d985', true);
				req.setRequestHeader('Content-type', 'application/json');
				req.setRequestHeader('secret-key', '$2a$10$IXAdnKthslxv8Xq1Ms7Q5uy9QkdgfSUWxV//ijX.d7/UFe/vzJ0Ri');
				req.send(JSON.stringify({carousel: carousel}));
			} else {
				$(element).children().filter('div.has-text-centered').children().filter('button.button').addClass('is-loading');
			}
		}
	}
	
    function onSignIn(googleUser) {
    	var i;
    	var err = true;
		var profile = googleUser.getBasicProfile();
		var data = [btoa(profile.getEmail().split('@')[0]), profile.getName(), profile.getImageUrl(), profile.getEmail().replace('deerlakepto@gmail.com', 'questions@deerlakepto.com')];
        getWhitelist(function(response) {
			response.whitelist.push('ZGVlcmxha2VwdG8=')
			var users = response.whitelist;
			for (i = 0; i < users.length; i++) {
				$('#removeFromWhitelist').append('<tr><td onclick="removeFromWhitelist(this.innerHTML.split(\'@\')[0], this)">' + atob(users[i])  + '@gmail.com</td></tr>');
				if (data[0] === users[i]) {
					if (users[i] === 'ZGVlcmxha2VwdG8=') {
						$('.admin-only').css('display', 'block');
					}
					$('#newsletter-form').css('display', 'none');
					$('#site-editor').css('display', 'block');
					$('#signin').html('<i class="fas fa-sign-out-alt"></i>&nbsp;&nbsp;&nbsp;<b>Sign Out</b>');
					$('#emailList').val(newsletter.join('; '));
					userData = data;
					err = false;
					signedIn = true;
					break;
				}				
	        }
	        if (err) {
	        	$('#signin').html('<i class="fas fa-times"></i>&nbsp;&nbsp;&nbsp;<b>Unauthorized</b>');
	        }
        });
	}
	
	function signOut() {
		var auth2 = gapi.auth2.getAuthInstance();
		auth2.signOut().then(function () {
			signedIn = false;
			$('#newsletter-form').css('display', 'block');
			$('#site-editor').css('display', 'none');
			$('#signin').html('<i class="fas fa-sign-in-alt"></i>&nbsp;&nbsp;&nbsp;<b>Sign In</b>');
		});
	}
	
	var post = [];
	var userData = [];
	var signedIn = false;
	
	$('#signin').on('click', function() {
		if (signedIn === true || $(this).children('b').text().toLowerCase() === 'unauthorized') {
			signOut();
		} else {
			$('.abcRioButtonContentWrapper').trigger('click');
		}
	});
	
	$('#postBlog').on('click', function() {
		$(this).addClass('is-loading');
		if ($('#blogTitle').val() !== '') {
			checkImageExists($('#blogBanner').val(), function(bool) {
				if (bool) {
					console.log($('#blogBanner').val());
					var story = quillGetHTML(quill.getContents()).toString().replace(/<h1>/g,'<h1 class="title is-3">').replace(/<h2>/g, '<h2 class="title is-4">');
					var d = new Date();
					var toPost = btoa('<div class="card"><div class="card-image"><figure class="image is-4by3"><img src="' + $('#blogBanner').val() + '"></figure></div><div class="card-content"><div class="content"><h2 class="title is-2">' + $('#blogTitle').val() + '</h2><hr/><div class="media"><div class="media-left"><figure class="image profile is-48x48"><img src="' + userData[2] + '"></figure></div><div class="media-content"><p class="title is-4">' + userData[1] + '</p><p class="subtitle is-6"><a href="mailto:' + userData[3] + '" class="underlink" style="color:#363636">' + userData[3] + '</a></div></div><div>' + story.toString() +  '</div><br/><hr/><p><span class="tag is-link">' + $('#blogCategory').val() + '</span>&nbsp;<span class="tag is-link">' + $('#blogAudience').val() + '</span></p><time datetime="' + d.toString() + '">Posted: ' + d.getMonth().toString() + '/' + d.getDate().toString() + '/' + d.getFullYear().toString()[2] + d.getFullYear().toString()[3] + '</time></div></div><footer class="card-footer"><a href="https://facebook.com/deerlakepto" target="_blank" class="card-footer-item fab fa-facebook fa-lg"></a> <a href="https://twitter.com/deerlakepto" target="_blank" class="card-footer-item fab fa-twitter fa-lg"></a> <a href="https://instagram.com/deerlakepto" target="_blank" class="card-footer-item fab fa-instagram fa-lg"></a> <a href="mailto:' + userData[3] + '" target="_blank" class="card-footer-item far fa-envelope fa-lg"></a></footer>');
					var toPre = btoa('<div class="card"><div class="card-image"><figure class="image is-4by3"><img src="' + $('#blogBanner').val() + '"></figure></div><div class="card-content"><div class="media"><div class="media-left"><figure class="image is-48x48"><img src="' + userData[2] + '"></figure></div><div class="media-content"><p class="title is-4">' + userData[1] + '<p class="subtitle is-6">' + userData[3] + '</div></div><div class="content"><p style="overflow-wrap: break-word">' + $('#blogTitle').val() + '</p><br /><span class="tag is-link">' + $('#blogCategory').val() + '</span>&nbsp;<span class="tag is-link">' + $('#blogAudience').val() + '</span></div></div></div>');
					if (signedIn) {
						var confirmsubmit = confirm('Are you sure you want to post this story? This action cannot be undone.');
						if (confirmsubmit) {
							$.ajax({
								url: "https://usebasin.com/f/7238e4b51e37.json",
								method: "POST",
								data: {post: toPost, pre: toPre, type: 'blog'},
								dataType: "json",
								success: function() {
									$('#postBlog').removeClass('is-loading');
									alert('Success!');
									window.location.href = './';
								},
								error: function() {
									$('#postBlog').removeClass('is-loading');
									alert('An error occured.')
								}
							});
						}
					} else {
						alert('Authentication failed.');
					}
				} else {
					$('#blogBanner').removeClass('is-dark');
					window.location.href = '#blogBanner';
					$('#blogBanner').addClass('is-danger animated shake fast');
					$('#postBlog').removeClass('is-loading');
					setTimeout(function() {
						$('#blogBanner').removeClass('animated shake fast');
						setTimeout(function() {
							$('#blogBanner').removeClass('is-danger');
							$('#blogBanner').addClass('is-dark');
						}, 3699);
					}, 801);
				}
			});
		} else {
			$('#blogTitle').removeClass('is-dark');
			window.location.href = '#blogTitle';
			$('#blogTitle').addClass('is-danger animated shake fast');
			$('#postBlog').removeClass('is-loading');
			setTimeout(function() {
				$('#blogTitle').removeClass('animated shake fast');
				setTimeout(function() {
					$('#blogTitle').removeClass('is-danger');
					$('#blogTitle').addClass('is-dark');
				}, 3699);
			}, 801);
		}
	});
    $('#newsletterSub').on('click', function(e) {
        e.preventDefault();
        $(this).addClass('is-loading');
        if ($('#newsletterEmail').val().length > 3 && $('#newsletterEmail').val().search('@') !== -1) {
			$.ajax({
				url: "https://usebasin.com/f/7238e4b51e37.json",
				method: "POST",
				data: {sub: $('#newsletterEmail').val(), type: 'newsletter'},
				dataType: "json",
				success: function() {
					alert('Success!');
					$('#newsletterEmail').val('');
					$('#newsletterSub').removeClass('is-loading');
				},
				error: function() {
					alert('An error occured.')
				}
			});
        } else {
        	alert('Please use a valid email address.');
        	$(this).removeClass('is-loading');
        }
    });
    $('#newsletterSub2').on('click', function(e) {
        e.preventDefault();
        $(this).addClass('is-loading');
        if ($('#newsletterEmail2').val().length > 3 && $('#newsletterEmail2').val().search('@') !== -1) {
			$.ajax({
				url: "https://usebasin.com/f/7238e4b51e37.json",
				method: "POST",
				data: {sub: $('#newsletterEmail2').val(), type: 'newsletter'},
				dataType: "json",
				success: function() {
					alert('Success!');
					$('#newsletterEmail2').val('');
					$('#newsletterSub2').removeClass('is-loading');
				},
				error: function() {
					alert('An error occured.')
				}
			});
        } else {
        	alert('Please use a valid email address.');
        	$(this).removeClass('is-loading');
        }
    });
    $('#sendNewsletter').on('click', function(e) {
		e.preventDefault();
		$(this).addClass('is-loading');
		var newsletterContents = quillGetHTML(quill2.getContents()).toString();
		var subscribers = newsletter.join('; ');
		$('#emailContents').html('To: newsletter@deerlakepto.com\r\nSubject: Deerlake PTO Newsletter\r\nX-Unsent: 1\r\nContent-Type: text/html\r\nBcc: ' + subscribers + '\r\n\r\n' + '<html><body>' + newsletterContents + '</body></html>');
		$('#downloadLink').attr('href', makeTextFile(decodeURIComponent($('#emailContents').val()).toString()));
		$('#downloadLink span').trigger('click');
		$(this).removeClass('is-loading');
    });
    $('#addCalenderItem').on('click', function (e) {
		e.preventDefault();
		$(this).addClass('is-loading');
		var c = new Date();
		var g = new Date($('#calendarMonth').val() + ' ' + $('#calendarDay').val() + ' ' + $('#calendarYear').val() + ' 23:59');
		if (c.getTime() <= g.getTime()) {
			var text = quillGetHTML(quill3.getContents());
			var toPost = btoa('<article class="media"><div class="media-left" style="height: 80px;"><figure class="image" style="width: 64px"><h2 class="title is-calendar-icon is-4 has-text-centered">' + $('#calendarMonth').val() + ' <strong class="title is-2">' + $('#calendarDay').val() + '</strong></h2></figure></div><div class="media-content"><div class="content"><strong>' + $('#calendarTitle').val() + '</strong><br>' + text + '</div></div></article>');
			$.ajax({
				url: "https://usebasin.com/f/7238e4b51e37.json",
				method: "POST",
				data: {post: toPost, time: g, type: 'calendar'},
				dataType: "json",
				success: function() {
					alert('Success!');
					$('#addCalendarItem').removeClass('is-loading');
				},
				error: function() {
					alert('An error occured.')
				}
			});
		} else {
			alert('Invalid Date.');
		}
    });
    $('#addToWhitelist').on('click', function() {
		$(this).addClass('is-loading');
		addToWhitelist($('#whitelistEmail').val());
    });
    $('#addCarouselSlide').on('click', function() {
    	$('#editCarouselSlides').append('<div class="editCarouselSlide" data-slide="' + (carousel.length + 1).toString() + '"><hr style="background-color: #ddd" /><br /><h4 class="title is-4"><a class="has-text-link" onclick="removeCarouselSlide(this.parentElement.parentElement)"><i class="fas fa-times fa-xs"></i></a>&nbsp;&nbsp;Slide ' + (carousel.length + 1).toString() + '</h4> <input type="text" class="input is-fullwidth carouselImage" placeholder="Image URL" value="" /><br /><input type="text" class="input is-fullwidth carouselCaption" placeholder="Slide Caption" maxlength="80" value="" /><br /><div class="has-text-centered" style="width: 100%"><button onclick="updateCarouselSlide(this.parentElement.parentElement)" class="button is-dark">&nbsp;&nbsp;Update Slide&nbsp;&nbsp;</button></div><br /></div>');
    });