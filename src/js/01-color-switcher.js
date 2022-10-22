const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');

const body = document.querySelector('body');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

btnStart.addEventListener('click', onClickStart);
btnStop.addEventListener('click', onClickStop);

function onClickStart(ev) {
  btnStart.setAttribute('disabled', true);
  btnStop.removeAttribute('disabled');
  const IntervalStartID = setInterval(() => {
    if (!btnStart.attributes.disabled) {
      clearInterval(IntervalStartID);
      return;
    }
    body.style.backgroundColor = getRandomHexColor();
    console.log();
  }, 1000);
  console.log(IntervalStartID);
}

function onClickStop(ev) {
  btnStart.removeAttribute('disabled');
  btnStop.setAttribute('disabled', true);
}