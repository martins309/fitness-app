'use strict';

const navslide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-item');

    burger.addEventListener('click', () =>{
        nav.classList.toggle('nav-active');
    });
}

navSlide();