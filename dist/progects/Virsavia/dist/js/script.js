window.addEventListener('DOMContentLoaded', () => {
    // Calculation

    const calc = () => {
        const slides = document.querySelectorAll('.calc-complete__item'),
            complete = document.querySelector('.calc-payment__complete span'),
            inputsColor = document.querySelectorAll('.calc-color input'),
            dopItems = document.querySelectorAll('.calc-additionally__item'),
            finishPriceText = document.querySelectorAll('.calc-payment__price span')[0],
            dopPriceText = document.querySelectorAll('.calc-payment__additionally span')[0];
            
        let typeSlide = 'oven',
            dopPrice = 0,
            finishPrice = 50000;

        slides.forEach(slide => {
            slide.addEventListener('click', (e) => {
                if (e.target && e.target.matches("img") && !slide.classList.contains('calc-complete__item_active')) {
                    slides.forEach(slide => {
                        slide.classList.remove('calc-complete__item_active');
                    });
                    slide.classList.add('calc-complete__item_active');
                    typeSlide = slide.getAttribute('data-type-slide');
                    complete.textContent = slide.querySelector('.calc-complete__text').textContent;
                }
            });
        });

        inputsColor.forEach(input => {
            input.addEventListener('input', (e) => {
                if (e.currentTarget && e.currentTarget.getAttribute('name') === 'color-table') {
                    document.querySelector('[data-input-color="color-table"] span').textContent = e.currentTarget.value;
                } else if (e.currentTarget && e.currentTarget.getAttribute('name') === 'color-facade') {
                    document.querySelector('[data-input-color="color-facade"] span').textContent = e.currentTarget.value;
                }
            });
        });

        dopItems.forEach(item => {
            let countElem = item.querySelector('.calc-additionally__count span'),
                countPrice = 0,
                basePrice = +item.getAttribute('data-dop-price');

            item.querySelector('.calc-additionally__btn_plus').addEventListener('click', () => {
                if (countPrice < 100000) {
                    countPrice++;
                    countElem.textContent = countPrice;
                    dopPrice += basePrice;
                    dopPriceText.textContent = dopPrice;
                    finishPrice += basePrice;
                    finishPriceText.textContent = finishPrice;
                }
            });

            item.querySelector('.calc-additionally__btn_minus').addEventListener('click', () => {
                if (countPrice > 0) {
                    countPrice--;
                    countElem.textContent = countPrice;
                    dopPrice -= basePrice;
                    dopPriceText.textContent = dopPrice;
                    finishPrice -= basePrice;
                    finishPriceText.textContent = finishPrice;
                }
            });
        });
    }

    // Modal

    const modal = () => {
        const btnsModal = document.querySelectorAll('[data-modal="consultaion"]'),
            btnClose = document.querySelector('.modal__close'),
            overlay = document.querySelector('.overlay'),
            modalConsultation = overlay.querySelector('#consultation');

        btnsModal.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();

                overlay.style.display = 'block';
                modalConsultation.style.display = 'block';
                document.body.style.overflow = 'hidden';
            })
        });

        btnClose.addEventListener('click', () => {
            overlay.style.display = 'none';
            modalConsultation.style.display = 'none';
            document.body.style.overflow = 'visible';
        });
    }

    // Smooth Scrolling

    const smoothScrolling = () => {
        const smoothLinks = document.querySelectorAll('a[href^="#"]'),
            btnSmoothLink = document.querySelector('[data-btn="to-calc"]'),
            arrowScrollTop = document.querySelector('.arrow_scroll');


        for (let smoothLink of smoothLinks) {
            smoothLink.addEventListener('click', function (e) {
                e.preventDefault();
                const id = smoothLink.getAttribute('href');
                if (id != '#') {
                    document.querySelector(id).scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        };

        btnSmoothLink.addEventListener('click', () => {
            const scrollTarget = document.querySelector('#calc');

            const elementPosition = scrollTarget.getBoundingClientRect().top;
            const offsetPosition = elementPosition;
            console.log(offsetPosition);
            window.scrollBy({
                top: offsetPosition,
                behavior: 'smooth'
            });

        });

        window.addEventListener('scroll', () => {
            if (window.scrollY > 1000) {
                arrowScrollTop.style.opacity = '1';
            } else {
                arrowScrollTop.style.opacity = '0';
            }
        });

        arrowScrollTop.addEventListener('click', () => {
            window.scrollBy({
                top: -window.scrollY,
                behavior: 'smooth'
            });
        });
    }

    // Mask Phone

    function maskPhone() {
        [].forEach.call( document.querySelectorAll('[data-input="phone"]'), function(input) {
            let keyCode;
            function mask(event) {
                event.keyCode && (keyCode = event.keyCode);
                let pos = this.selectionStart;
                if (pos < 3) event.preventDefault();
                let matrix = "+7 (___) ___ ____",
                    i = 0,
                    def = matrix.replace(/\D/g, ""),
                    val = this.value.replace(/\D/g, ""),
                    new_value = matrix.replace(/[_\d]/g, function(a) {
                        return i < val.length ? val.charAt(i++) || def.charAt(i) : a
                    });
                i = new_value.indexOf("_");
                if (i != -1) {
                    i < 5 && (i = 3);
                    new_value = new_value.slice(0, i)
                }
                let reg = matrix.substr(0, this.value.length).replace(/_+/g,
                    function(a) {
                        return "\\d{1," + a.length + "}"
                    }).replace(/[+()]/g, "\\$&");
                reg = new RegExp("^" + reg + "$");
                if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
                if (event.type == "blur" && this.value.length < 5)  this.value = ""
            }
        
            input.addEventListener("input", mask, false);
            input.addEventListener("focus", mask, false);
            input.addEventListener("blur", mask, false);
            input.addEventListener("keydown", mask, false)
        
        });
    }

    // Slider

    const slider = (sliderSelector) => {
        const slider = document.querySelector(sliderSelector),
            slideInner = slider.querySelector('.slider__inner'),
            slides = slider.querySelectorAll('.slider__item'),
            nextBtn = slider.querySelector('.slider__next'),
            prevBtn = slider.querySelector('.slider__prev');

        if (slides.length > 0) {
            let slideStyles = window.getComputedStyle(slides[0]),
                pattern = parseInt(slideStyles.width) + parseInt(slideStyles.marginRight),
                pos = 0,
                lengthPos = slides.length;
            
            nextBtn.addEventListener('click', () => {
                if (pos + 2 < lengthPos) {
                    pos++;
                    slideInner.style.cssText = `transform: translateX(-${pattern*pos}px);`;
                } else {
                    pos = 0;
                    slideInner.style.cssText = `transform: translateX(-${pattern*pos}px);`;
                }
                nextBtn.disabled = true;
                setTimeout(() => {
                    nextBtn.disabled = false;
                }, 400);
            });

            prevBtn.addEventListener('click', () => {
                if (pos > 0) {
                    pos--;
                    slideInner.style.cssText = `transform: translateX(-${pattern*pos}px);`;
                } else {
                    pos = lengthPos - 2;
                    slideInner.style.cssText = `transform: translateX(-${pattern*pos}px);`; 
                }
                prevBtn.disabled = true;
                setTimeout(() => {
                    prevBtn.disabled = false;
                }, 400);
            });
        }
    }

    const tabs = () => {
        const tabs = document.querySelectorAll('.materials__tab'),
              contents = document.querySelectorAll('[data-slider="content"]');

        tabs.forEach((tab, tabIdx) => {
            tab.addEventListener('click', () => {
                contents.forEach((content, contentIdx) => {
                    if (tabIdx === contentIdx) {
                        content.style.display = 'block';
                    } else {
                        content.style.display = 'none';
                    }
                });
                tabs.forEach(tab => {
                    tab.classList.remove('materials__tab_active');
                })
                tab.classList.add('materials__tab_active');
            });
        });
    }

    calc();
    modal();
    smoothScrolling();
    maskPhone();
    slider('.slider_materials');
    slider('.slider_furniture');
    tabs();
});