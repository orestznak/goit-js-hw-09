import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";

const refs= {
    time: document.querySelector('#datetime-picker'),
    deltaDays: document.querySelector('[data-days]'),
    deltaHours: document.querySelector('[data-hours]'),
    deltaMinutes: document.querySelector('[data-minutes]'),
    deltaSeconds: document.querySelector('[data-seconds]'),
    btnStart: document.querySelector('button[data-start]'),
}

let delta = null;
let userDate= null;
let timerId = null;


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      //console.log(selectedDates[0]);
      if(selectedDates[0] < Date.now()) {
        window.alert('Please choose a date in the future');
      } else {
        refs.btnStart.style.disabled = true;
        refs.btnStart.style.color = '#000000';
        userDate = selectedDates[0];
         
      } 
         
    },
  };

refs.btnStart.style.color = '#666666';
refs.btnStart.style.disabled = false;

flatpickr(refs.time,options);

refs.btnStart.addEventListener('click', onStart);

function onStart (evt) {
    evt.preventDefault();

    timerId = setInterval (() =>{
        delta = userDate - Date.now();
        if(delta<0) {
            clearInterval(timerId);
            return;
        }
        addTextContetnt(delta);
        
    },1000) 
}
 
function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }

function addLeadingZero(value) {
    return String(value).padStart(2,'0');

}

function addTextContetnt(deltaTime){
    refs.deltaDays.textContent = addLeadingZero(convertMs(deltaTime).days);
    refs.deltaHours.textContent = addLeadingZero(convertMs(deltaTime).hours);
    refs.deltaMinutes.textContent = addLeadingZero(convertMs(deltaTime).minutes);
    refs.deltaSeconds.textContent = addLeadingZero(convertMs(deltaTime).seconds);
}