    
    /* global gapi, $, btoa, Image */
	
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
	
	function newPost(userData) {
		$('#formcontent').find('*').removeAttr('disabled');
		$('#formcontent').removeAttr('style');
		post[0] = btoa('post');
		post[1] = btoa(userData[1]);
		post[2] = btoa(userData[5]);
		post[3] = btoa(userData[4]);
		$('#submitform').on('click', function() {
			$(this).addClass('is-loading');
			checkImageExists($('#banner').val(), function(bool) {
				if (bool) {
					if ($('#headline').val() !== '') {
						if ($('#textarea').val() !== '') {
							var confirmsubmit = confirm('Are you sure you want to post this story? This action cannot be undone.');
							if (confirmsubmit) {
								post[4] = btoa($('#banner').val());
								post[5] = btoa($('#textarea').val());
								post[6] = btoa($('#category').val());
								post[7] = btoa($('#audience').val());
								$.ajax({
									url: "https://usebasin.com/f/54fb03dbbc9c.json",
									method: "POST",
									data: {'data': post},
									dataType: "json",
									success: function() {
										signOut();	
									},
									error: function() {
										alert('An error occured.')
									}
								});
							}
						} else {
							$('#textarea').removeClass('is-link');
							window.location.href = '#textarea';
							$('#textarea').addClass('is-danger animated shake fast');
							$('#submitform').removeClass('is-loading');
							setTimeout(function() {
								$('#textarea').removeClass('animated shake fast');
								setTimeout(function() {
									$('#textarea').removeClass('is-danger');
									$('#textarea').addClass('is-link');
								}, 3699);
							}, 801);
						}
					} else {
						$('#headline').removeClass('is-link');
						window.location.href = '#headline	';
						$('#headline').addClass('is-danger animated shake fast');
						$('#submitform').removeClass('is-loading');
						setTimeout(function() {
							$('#headline').removeClass('animated shake fast');
							setTimeout(function() {
								$('#headline').removeClass('is-danger');
								$('#headline').addClass('is-link');
							}, 3699);
						}, 801);
					}
				} else {
					$('#banner').removeClass('is-link');
					window.location.href = '#banner';
					$('#banner').addClass('is-danger animated shake fast');
					$('#submitform').removeClass('is-loading');
					setTimeout(function() {
						$('#banner').removeClass('animated shake fast');
						setTimeout(function() {
							$('#banner').removeClass('is-danger');
							$('#banner').addClass('is-link');
						}, 3699);
					}, 801);
				}
			});
		});
	}

    function onSignIn(googleUser) {
    	var i;
    	var err = true;
		var profile = googleUser.getBasicProfile();
		var data = [profile.getId(), profile.getName(), profile.getGivenName(), profile.getFamilyName(), profile.getImageUrl(), (profile.getGivenName().toLowerCase() + profile.getFamilyName().toLowerCase() + '@deerlakepto.com'), profile.getEmail()];
        var users = ["109159002929177465118"];
        for (i = 0; i < users.length; i++) {
        	if (data[0] === users[i]) {
	        	$('#signin').html('<i class="fas fa-check"></i>&nbsp;&nbsp;&nbsp;<b>Access Granted</b></button>');
	        	$('#signin').removeClass('is-loading');
	        	$('#signin').attr('disabled', 'disabled');
        		newPost(data);
        		err = false;
        		break;
        	}
        }
        if (err) {
        	$('#signin').html('<i class="fas fa-times"></i>&nbsp;&nbsp;&nbsp;<b>Access Denied</b></button>');
        	$('#signin').removeClass('is-loading');
        }
	}
	
	function signOut() {
		var auth2 = gapi.auth2.getAuthInstance();
		auth2.signOut().then(function () {
	        $('#signin').html('<i class="fab fa-google"></i>&nbsp;&nbsp;&nbsp;<b>Sign In</b>');
	        $('#signin').removeAttr('disabled');
			$('#formcontent').find('*').attr('disabled', 'disabled');
			$('#formcontent').attr('style', 'opacity: 0.5; cursor: not-allowed;');
			$('#submitform').removeClass('is-loading');
		});
	}
	
	var post = [];
	
	$('#signin').on('click', function() {
		$('.abcRioButtonContentWrapper').trigger('click');	
		$(this).addClass('is-loading');
	});