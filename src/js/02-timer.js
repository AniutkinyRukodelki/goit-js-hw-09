import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const btnStartTimer = document.querySelector('button[data-start]');
const dateDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');
const textLabel = document.querySelectorAll('.label');
textLabel.forEach(
  element => (element.textContent = element.textContent.toUpperCase())
);

btnStartTimer.setAttribute('disabled', true);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

btnStartTimer.addEventListener('click', onClickStartTimer);

let userTime = null;
let newTime = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  altInput: true,
  altFormat: 'F j, Y',
  dateFormat: 'Y-m-d',
  onClose(selectedDates) {
    userTime = selectedDates[0];

    onInput(selectedDates);
  },
};

function onClickStartTimer() {
  btnStartTimer.setAttribute('disabled', true);
  const intervalId = setInterval(() => {
    newTime = new Date();

    if (userTime <= newTime) {
      clearInterval(intervalId);
      return;
    }
    const arrDate = convertMs(comparisonDateNum(userTime, newTime));
    const dateUser = name(arrDate);

    setNewDate(dateUser);
  }, 1000);
}

const fp = flatpickr('#datetime-picker', { ...options });

function onInput() {
  btnStartTimer.setAttribute('disabled', true);
  if (userTime > newTime) {
    btnStartTimer.removeAttribute('disabled');
  } else {
    window.alert('Please choose a date in the future');
  }
}

function name(params) {
  params.days = addLeadingZero(params.days);
  params.hours = addLeadingZero(params.hours);
  params.minutes = addLeadingZero(params.minutes);
  params.seconds = addLeadingZero(params.seconds);
  return params;
}

  

function setNewDate(dateUser) {
  dateDays.textContent = dateUser.days;
  dataHours.textContent = dateUser.hours;
  dataMinutes.textContent = dateUser.minutes;
  dataSeconds.textContent = dateUser.seconds;
}

function comparisonDateNum(andTime, now) {
    return andTime - now;
}



