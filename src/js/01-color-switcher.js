const startBtn = document.getElementsByClassName('js-start')[0];
const stopBtn = document.getElementsByClassName('js-stop')[0];

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
};

let isBackgroundColorChanging = false;
let intervalId;

function changeBackgroundColor() {
   const randomColor = getRandomHexColor();
        document.body.style.backgroundColor = randomColor;   
};

startBtn.addEventListener('click', () => {
    startInterval();
});

stopBtn.addEventListener('click', () => {
    stopInterval();
});

function startInterval() {
    if (!isBackgroundColorChanging) {
        isBackgroundColorChanging = true;
        startBtn.disabled = true;
        stopBtn.disabled = false;

        intervalId = setInterval(() => {
            changeBackgroundColor();
        }, 1000);
    }
};

function stopInterval() {
    if (isBackgroundColorChanging) {
        isBackgroundColorChanging = false;
        startBtn.disabled = false;
        stopBtn.disabled = true;

        clearInterval(intervalId);
    }
};