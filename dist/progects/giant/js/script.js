// Гамбургер
function hamburger() {
    let burger = document.querySelector('.hamburger'),
        menu = document.querySelector('.mobile-menu'),
        close = document.querySelector('.mobile-menu__close'),
        overlay = document.querySelector('.mobile-menu__overlay'),
        links = document.querySelectorAll('.mobile-menu__item');

    burger.addEventListener('click', () => {
        if (menu.classList.contains('mobile-menu-active')) {
            menu.classList.remove('mobile-menu-active');
            document.body.style.overflow = '';
        } else {
            menu.classList.add('mobile-menu-active');
            document.body.style.overflow = 'hidden';
        } 
    });

    function hiddenMenu(elem) {
        elem.addEventListener('click', () => {
            menu.classList.remove('mobile-menu-active');
            document.body.style.overflow = '';
        });
    }

    hiddenMenu(close);
    hiddenMenu(overlay);

    links.forEach(link => {
        hiddenMenu(link);
    });
}

hamburger();