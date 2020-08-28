$(document).ready(function(){
	$(document).ready(function(){
		$('.review__inner').slick({
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			prevArrow: '<button type="button" class="slick-prev"><img src="icons/review/left.svg"></button>',
			nextArrow: '<button type="button" class="slick-next"><img src="icons/review/right.svg"></button>'
		});
	});

	// modal

	$('[data-modal=consultation]').on('click', function() {
		$('.overlay, #consultation').fadeIn('fast');
	});
	$('.modal__close').on('click', function() {
		$('.overlay, #consultation, #thanks').fadeOut('fast');
	});

	// validate form

	function validateForm(form) {
		$(form).validate({
			rules: {
				name: {
					required: true,
					minlength: 2
				},
				phone: "required",
				email: {
				  required: true,
				  email: true
				}
			},
			messages: {
				name: {
					required: "Пожалуйста, введите свое имя",
					minlength: jQuery.validator.format("Имя должно состоять не менее чем из {0} символов")
				},
				phone: "Пожалуйста, введите свой номер телефона",
				email: {
				  required: "Пожалуйста, введите свою почту",
				  email: "Неправильно введен почтовый адресс"
				}
			}
		});
	}

	validateForm('.catalog form');
	validateForm('.consultation__form');
	validateForm('.modal form');

	// mask for phone

	$('input[name=phone]').mask("+7 (999) 999-99-99");


	// form

	$('form').submit(function(e) {
		e.preventDefault();
		$.ajax({
			type: 'POST',
			url: "server.php",
			data: $(this).serialize()
		}).done(function() {
			$(this).find("input").val("");
			$('.overlay, #consultation').fadeOut();
			$('.overlay, #thanks').fadeIn('slow');

			$('form').trigger('reset');
		});
		return false;
	});
});
