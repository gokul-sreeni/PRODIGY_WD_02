let timerDisplay = document.getElementById('timer');
let startPauseButton = document.getElementById('startPause');
let resetButton = document.getElementById('reset');
let lapButton = document.getElementById('lap');
let lapsList = document.getElementById('laps');

let timerInterval;
let elapsedTime = 0;
let isRunning = false;
let lapCounter = 1;

function formatTime(ms) {
  let milliseconds = ms % 1000;
  let seconds = Math.floor(ms / 1000) % 60;
  let minutes = Math.floor(ms / (1000 * 60)) % 60;
  let hours = Math.floor(ms / (1000 * 60 * 60));

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`;
}

function updateTimer() {
  timerDisplay.textContent = formatTime(elapsedTime);
}

startPauseButton.addEventListener('click', () => {
  if (!isRunning) {
    isRunning = true;
    startPauseButton.textContent = 'Pause';
    let startTime = Date.now() - elapsedTime;

    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateTimer();
    }, 10);
  } else {
    clearInterval(timerInterval);
    isRunning = false;
    startPauseButton.textContent = 'Start';
  }
});

resetButton.addEventListener('click', () => {
  clearInterval(timerInterval);
  elapsedTime = 0;
  isRunning = false;
  startPauseButton.textContent = 'Start';
  updateTimer();
  lapsList.innerHTML = '';
  lapCounter = 1;
});

lapButton.addEventListener('click', () => {
  if (isRunning) {
    let lapTime = formatTime(elapsedTime);
    let lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapCounter}: ${lapTime}`;
    lapsList.appendChild(lapItem);
    lapCounter++;
  }
});
