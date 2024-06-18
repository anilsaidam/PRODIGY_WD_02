let startTime, updatedTime, difference, pausedTime;
let tInterval;
let running = false;
let lapCounter = 0;
let previousLapTime = 0;

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const pauseButton = document.getElementById('pause');
const laps = document.getElementById('laps');

startStopButton.addEventListener('click', () => {
    if (!running) {
        if (!pausedTime) {
            startTime = new Date().getTime();
        } else {
            startTime = new Date().getTime() - pausedTime;
            pausedTime = undefined;
        }
        tInterval = setInterval(getShowTime, 1);
        running = true;
        startStopButton.innerHTML = 'Stop';
    } else {
        clearInterval(tInterval);
        running = false;
        startStopButton.innerHTML = 'Start';
    }
});

resetButton.addEventListener('click', () => {
    clearInterval(tInterval);
    running = false;
    startStopButton.innerHTML = 'Start';
    display.innerHTML = '00:00:00';
    laps.innerHTML = '';
    lapCounter = 0;
    previousLapTime = 0;
    pausedTime = undefined;
});

lapButton.addEventListener('click', () => {
    if (running) {
        lapCounter++;
        const lapTime = display.innerHTML;
        const lapItem = document.createElement('li');
        const lapDifference = calculateLapDifference();
        lapItem.textContent = `Lap ${lapCounter}: ${lapTime} (+${lapDifference})`;
        laps.appendChild(lapItem);
        previousLapTime = difference;
    }
});

pauseButton.addEventListener('click', () => {
    if (running) {
        clearInterval(tInterval);
        pausedTime = new Date().getTime() - startTime;
        running = false;
        startStopButton.innerHTML = 'Start';
    }
});

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    display.innerHTML = 
        (hours < 10 ? "0" : "") + hours + ":" + 
        (minutes < 10 ? "0" : "") + minutes + ":" + 
        (seconds < 10 ? "0" : "") + seconds;
}

function calculateLapDifference() {
    const lapDifference = difference - previousLapTime;
    const minutes = Math.floor((lapDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((lapDifference % (1000 * 60)) / 1000);
    return (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

