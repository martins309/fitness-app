'use strict';

function getLoggedWorkout(type_id) {
    const newLoggedWorkout = document.querySelector('#modal-body p')
    newLoggedWorkout.appendChild(type_id);
}