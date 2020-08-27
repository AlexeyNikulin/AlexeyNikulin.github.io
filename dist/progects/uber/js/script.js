const burger = document.querySelector('.header__humburger'),
      links = document.querySelectorAll('.header__link'),
      menu = document.querySelector('.header__menu');

burger.addEventListener('click', (e) => {
    burger.classList.toggle('header__humburger_active');
    menu.classList.toggle('header__menu_active');
    if (menu.classList.contains('header__menu_active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

links.forEach(item => {
    item.addEventListener('click', (e) => {
        burger.classList.toggle('header__humburger_active');
        menu.classList.toggle('header__menu_active');
        document.body.style.overflow = '';
    });
});