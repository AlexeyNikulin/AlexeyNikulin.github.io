window.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.menu'),
      burger =  document.querySelector('.humburger'),
      closeElem =  document.querySelector('.menu__close'),
      items = menu.querySelectorAll('li');

    burger.addEventListener('click', () => {
        menu.classList.add('active'); 
    });

    closeElem.addEventListener('click', () => {
        menu.classList.remove('active'); 
    });

    items.forEach(item => {
        item.addEventListener('click', () => {
            menu.classList.remove('active');
        });
    });

    // rating

    const range = document.querySelectorAll('.skill-efficiency__appearance'),
        procent = document.querySelectorAll('.skill-efficiency__procent');

    procent.forEach((item, i) => {
        range[i].style.width = item.textContent;
    });
});