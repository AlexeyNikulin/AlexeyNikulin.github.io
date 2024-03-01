window.addEventListener('DOMContentLoaded', () => {
    // Calculation

    const calc = () => {
        const slides = document.querySelectorAll('.calc-slider__item'),
              btnNext = document.querySelector('.calc-slider__next'),
              btnPrev = document.querySelector('.calc-slider__prev'),
              btnAgain = document.querySelector('.calc-slider__again'),
              calcTitle = document.querySelector('.calc-slider__title'),
              completeSlides = document.querySelectorAll('.calc-complete__item'),
              colorTabelText = document.querySelector('[data-input-color="color-table"] span'),
              colorFacadeText = document.querySelector('[data-input-color="color-facade"] span'),
              colorTabelWrapper = document.querySelector('[data-color="table"]'),
              colorFasadeWrapper = document.querySelector('[data-color="facade"]'),
              colorTabelSlides = colorTabelWrapper.querySelectorAll('.calc-color__color'),
              colorFacadeSlides = colorFasadeWrapper.querySelectorAll('.calc-color__color'),
              dopSlides = document.querySelectorAll('[data-calc-parameter="dop"]'),
              dopWrapper = document.querySelector('.calc-payment__dop_wrapper ul'),
              finalPrice = document.querySelector('.calc-payment__title span');

        let countSlides = slides.length,
            currentSlide = 0;

        slides.forEach(slide => {
            slide.classList.remove('calc-slider__item_active');
        });

        switchSlide(slides, currentSlide, 'calc-slider__item_active');
        hideBtn();

        // Работы с дополнительными параметрами

        dopSlides.forEach(slideWrapper => {
            const slides = slideWrapper.querySelectorAll('.calc-additionally__item');
            slides.forEach(slide => {
                slide.addEventListener('click', (e) => {
                    if (e.target && e.target.matches('img')) {
                        slides.forEach(slide => {
                            slide.classList.remove('calc-additionally__item_active');
                        });

                        slide.classList.add('calc-additionally__item_active');

                        const price = +slide.querySelector('.calc-additionally__count').getAttribute('data-price');
                        const title = slideWrapper.getAttribute('data-dop-title');
                        const text = slide.querySelector('.calc-additionally__title').textContent.toLocaleLowerCase();

                        wrapperElement = dopWrapper.querySelector(`[data-dop-id="${title}"]`);
                        
                        if (wrapperElement) {
                            finalPrice.textContent = +finalPrice.textContent - +price;
                            wrapperElement.remove();
                        }

                        const spanTitle = document.createElement('span');
                        const spanText = document.createElement('span');
                        const wrapper = document.createElement('li');
                        spanTitle.textContent = title + ' - ';
                        spanText.textContent = text + '; ';
                        wrapper.setAttribute("data-dop-id", `${title}`);
                        spanText.classList.add('calc-payment__text');
                        wrapper.append(spanTitle);
                        wrapper.append(spanText);
                        dopWrapper.append(wrapper);
                        finalPrice.textContent = +finalPrice.textContent + +price;
                    }
                });
            });
        });

        // Работы с выбором цвета

        colorTabelSlides.forEach(function(slide) {
            slide.addEventListener('click', (e) => {
                colorTabelSlides.forEach(slide => {
                    slide.classList.remove('calc-color__color_active');
                });
                slide.classList.add('calc-color__color_active');
                colorTabelText.textContent = slide.getAttribute('data-title');
            });
        });

        colorFacadeSlides.forEach(function(slide) {
            slide.addEventListener('click', (e) => {
                colorFacadeSlides.forEach(slide => {
                    slide.classList.remove('calc-color__color_active');
                });
                slide.classList.add('calc-color__color_active');
                colorFacadeText.textContent = slide.getAttribute('data-title');
            });
        });

        // Комплектация

        document.querySelector('.calc-payment__complete span').textContent = completeSlides[0].querySelector('.calc-complete__text').textContent;

        completeSlides.forEach(slide => {
            slide.addEventListener('click', (e) => {
                if (e.target && e.target.matches("img") && !slide.classList.contains('calc-complete__item_active')) {
                    completeSlides.forEach(slide => {
                        slide.classList.remove('calc-complete__item_active');
                    });
                    slide.classList.add('calc-complete__item_active');
                    document.querySelector('.calc-payment__complete span').textContent = slide.querySelector('.calc-complete__text').textContent;
                }
            });
        });

        // Переключение слайдов кнопками

        btnNext.addEventListener('click', btnSwitchSlide);
        btnPrev.addEventListener('click', btnSwitchSlide);
        btnAgain.addEventListener('click', btnSwitchSlide);

        // Функции

        function changeTitleText(title, attributeSelector, idxSlide, slides) {
            title.textContent = slides[idxSlide].getAttribute(attributeSelector);
        }

        function btnSwitchSlide(e) {
            const btn = e.target;
            if (btn && btn.classList.contains('calc-slider__next')) {
                if (currentSlide < countSlides - 1) {
                    currentSlide++;
                    switchSlide(slides, currentSlide, 'calc-slider__item_active');
                    changeTitleText(calcTitle, 'data-calc-title', currentSlide, slides);
                }
            } else if (btn && btn.classList.contains('calc-slider__prev')) {
                if (currentSlide > 0) {
                    currentSlide--;
                    switchSlide(slides, currentSlide, 'calc-slider__item_active');
                    changeTitleText(calcTitle, 'data-calc-title', currentSlide, slides);
                }
            } else if (btn && btn.classList.contains('calc-slider__again')) {
                currentSlide = 0;
                switchSlide(slides, currentSlide, 'calc-slider__item_active');
                changeTitleText(calcTitle, 'data-calc-title', currentSlide, slides);
            }

            hideBtn();
        }

        function switchSlide(slides, idxSlide, selector) {
            slides.forEach(item => {
                item.classList.remove('calc-slider__item_active');
            });
            slides[idxSlide].classList.add(selector);
        }

        function hideBtn() {
            if (currentSlide == 0) {
                btnPrev.style.display = "none";
            } else {
                btnPrev.style.display = "block";
            }

            if (currentSlide === countSlides - 1) {
                btnNext.style.display = "none";
                btnAgain.style.display = "block";
            } else {
                btnNext.style.display = "block";
                btnAgain.style.display = "none";
            }
        }
            
        // let typeSlide = 'oven',
        //     dopPrice = 0,
        //     finishPrice = 50000;

        // slides.forEach(slide => {
            // slide.addEventListener('click', (e) => {
            //     if (e.target && e.target.matches("img") && !slide.classList.contains('calc-complete__item_active')) {
            //         slides.forEach(slide => {
            //             slide.classList.remove('calc-complete__item_active');
            //         });
            //         slide.classList.add('calc-complete__item_active');
            //         typeSlide = slide.getAttribute('data-type-slide');
            //         complete.textContent = slide.querySelector('.calc-complete__text').textContent;
            //     }
            // });
        // });

        // inputsColor.forEach(input => {
        //     input.addEventListener('input', (e) => {
        //         if (e.currentTarget && e.currentTarget.getAttribute('name') === 'color-table') {
        //             document.querySelector('[data-input-color="color-table"] span').textContent = e.currentTarget.value;
        //         } else if (e.currentTarget && e.currentTarget.getAttribute('name') === 'color-facade') {
        //             document.querySelector('[data-input-color="color-facade"] span').textContent = e.currentTarget.value;
        //         }
        //     });
        // });

        // dopItems.forEach(item => {
        //     let countElem = item.querySelector('.calc-additionally__count span'),
        //         countPrice = 0,
        //         basePrice = +item.getAttribute('data-dop-price');

        //     item.querySelector('.calc-additionally__btn_plus').addEventListener('click', () => {
        //         if (countPrice < 100000) {
        //             countPrice++;
        //             countElem.textContent = countPrice;
        //             dopPrice += basePrice;
        //             dopPriceText.textContent = dopPrice;
        //             finishPrice += basePrice;
        //             finishPriceText.textContent = finishPrice;
        //         }
        //     });

        //     item.querySelector('.calc-additionally__btn_minus').addEventListener('click', () => {
        //         if (countPrice > 0) {
        //             countPrice--;
        //             countElem.textContent = countPrice;
        //             dopPrice -= basePrice;
        //             dopPriceText.textContent = dopPrice;
        //             finishPrice -= basePrice;
        //             finishPriceText.textContent = finishPrice;
        //         }
        //     });
        // });
    }

    // Modal

    const modal = () => {
        const btnsModal = document.querySelectorAll('[data-modal="consultaion"]'),
            btnClose = document.querySelector('.modal__close'),
            overlay = document.querySelector('.overlay'),
            modalConsultation = overlay.querySelector('#consultation'),
            modalThanks = overlay.querySelector('#thanks');

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
            modalThanks.style.display = 'none';
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

    const toggleAboutText = () => {
        const textElement = document.querySelector('.about__descr'),
              moreBtn = document.querySelector('.about__more'),
              display = window.getComputedStyle(moreBtn).getPropertyValue('display');

        if (display === "block") {
            let text = textElement.textContent;
            if (text.length > 180) {
                textElement.textContent = text.slice(0, 180) + '...';
                moreBtn.addEventListener('click', () => {
                    textElement.textContent = text;
                    moreBtn.style.display = 'none';
                });
            }
        }
    }

    const menu = () => {
        const hamburger = document.querySelector('.hamburger'),
              close = document.querySelector('.close'),
              menu = document.querySelector('.header nav'),
              menuItems = document.querySelectorAll('.header__item');

        hamburger.addEventListener('click', () => {
            menu.classList.add('active');
            document.body.style.overflow = "hidden";
        });

        close.addEventListener('click', () => {
            menu.classList.remove('active');
            document.body.style.overflow = 'visible';
        });

        menuItems.forEach(item => {
            item.addEventListener('click', (e) => {
                menu.classList.remove('active');
                if (item.getAttribute('data-modal') !== 'consultaion') {
                    document.body.style.overflow = "visible";
                }
            });
        });
    }

    menu();
    toggleAboutText();
    calc();
    modal();
    smoothScrolling();
    maskPhone();
    // slider('.slider_materials');
    // slider('.slider_furniture');
    // tabs();
});
