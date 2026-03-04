// taken from here, because I'm so darn lazy:
// https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
const shuffle = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

const TEAM = shuffle(["Jaime ☀️", "Silvina 🐣", "Sena 👨‍🍳", "Bao 🕺", " 😆 Parul 🛵", "Pam 🏔🥾", "🏃‍♂️ Brandon 🍞", "Ken 👋"]);

const TOTAL_TIME = 120;

let index = 0;
let timer = TOTAL_TIME;
let interval;

const nameEl = document.getElementById("name");
const timerEl = document.getElementById("timer");
const startButton = document.getElementById("start");

const formatTime = time => {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  if (seconds === 0) {
    seconds = "00";
  }

  return `${minutes}:${seconds}`;
};

const cancelTimer = () => {
  if (interval) {
    clearInterval(interval);
  }

  startButton.classList.remove("hide");
};

const advance = () => {
  cancelTimer();
  timer = TOTAL_TIME;
  index += 1;

  if (index >= TEAM.length) {
    index = 0;
  }

  timerEl.innerText = formatTime(timer);
  nameEl.innerText = TEAM[index];
};

nameEl.innerText = TEAM[0];
timerEl.innerText = formatTime(timer);

const startTimer = () => {
  cancelTimer();
  interval = setInterval(() => {
    timerEl.innerText = formatTime(timer);
    timer -= 1;
    if (timer < 0) {
      advance();
    }
  }, 1000);
};

window.nextPerson = () => {
  advance();
  timerEl.innerText = formatTime(timer);
  nameEl.innerText = TEAM[index];
};

window.start = () => {
  startTimer();
  startButton.classList.add("hide");
};
