'use strict';


const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.menu-long');
    console.log("BURGER:", burger);
    burger.addEventListener('click', () => {
        nav.classList.toggle('show_nav');
    });
}

navSlide();