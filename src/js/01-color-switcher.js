const ref = {
    btnStart: document.querySelector('button[data-start]'),
    btnStop: document.querySelector('button[data-stop]'),
    body: document.querySelector('body')

};

let intervalId = null;

ref.btnStart.addEventListener('click', onStart);
ref.btnStop.addEventListener('click', onStop);

function onStart(evt) {
    evt.preventDefault();
    ref.btnStart.disabled = false;
    ref.btnStart.style.color =  '#666666';

    intervalId = setInterval(() => {
        const changeColor = getRandomHexColor();
        ref.body.style.background = changeColor;
    },1000);
    ref.btnStart.removeEventListener('click',onStart);
};

function onStop(evt) {
    evt.preventDefault();
    clearInterval(intervalId);

    ref.btnStart.style.disabled = true;
    ref.btnStart.style.color =  '#000000';
    ref.btnStart.addEventListener('click', onStart);
};

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}