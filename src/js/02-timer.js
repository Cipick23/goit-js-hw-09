import flatpickr from 'flatpickr';
// import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
// import 'notiflix/dist/notiflix-3.2.6.min.css';

const dateInput = document.getElementById('datetime-picker');
const dateBtn = document.getElementsByClassName('startBtn')[0];
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');
let intervalId;

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');
const currentDay = currentDate.getDate().toString().padStart(2, '0');
const currentHour = currentDate.getHours().toString().padStart(2, '0');
const currentMinute = currentDate.getMinutes().toString().padStart(2, '0');

const currentDatetime = `${currentYear}-${currentMonth}-${currentDay} ${currentHour}:${currentMinute}`;

dateInput.value = currentDatetime;

// Funcție pentru a calcula timpul rămas între două date
function calculateTimeLeft(targetDate) {
  const now = new Date();
  const target = new Date(targetDate);
  const diff = target - now;

  if (diff <= 0) {
    return { days: '00', hours: '00', minutes: '00', seconds: '00', total: 0 };
  }

  const seconds = Math.floor(diff / 1000) % 60;
  const minutes = Math.floor(diff / (1000 * 60)) % 60;
  const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  return {
    days: days.toString().padStart(2, '0'),
    hours: hours.toString().padStart(2, '0'),
    minutes: minutes.toString().padStart(2, '0'),
    seconds: seconds.toString().padStart(2, '0'),
    total: diff,
  };
}

dateInput.addEventListener('click', () => {
  flatpickr(dateInput, {
    enableTime: true,
    time_24hr: true,
    onClose(selectedDates) {
      const currentDate = new Date();
      const selectedDate = selectedDates && selectedDates[0];

      if (selectedDate && selectedDate > currentDate) {
        dateBtn.disabled = false;
      } else {
        dateBtn.disabled = true;
        Notiflix.Notify.warning('Please choose a date in the future!');
      }
    },
  });
});

dateBtn.addEventListener('click', () => {
  const selectedDate = new Date(dateInput.value);

  if (selectedDate && selectedDate > currentDate) {
    // Calculați timpul rămas
    const timeLeft = calculateTimeLeft(selectedDate);

    // Actualizați conținutul elementelor HTML
    daysElement.textContent = timeLeft.days.toString().padStart(2, '0');
    hoursElement.textContent = timeLeft.hours.toString().padStart(2, '0');
    minutesElement.textContent = timeLeft.minutes.toString().padStart(2, '0');
    secondsElement.textContent = timeLeft.seconds.toString().padStart(2, '0');

    // Oprește numărătoarea inversă dacă a ajuns la 00:00:00:00
    if (timeLeft.total <= 0) {
      clearInterval(intervalId);
    } else {
      // Inițiați numărătoarea inversă dacă nu este deja pornită
      if (!intervalId) {
        intervalId = setInterval(() => {
          const timeLeft = calculateTimeLeft(selectedDate);

          // Actualizați conținutul elementelor HTML
          daysElement.textContent = timeLeft.days.toString().padStart(2, '0');
          hoursElement.textContent = timeLeft.hours.toString().padStart(2, '0');
          minutesElement.textContent = timeLeft.minutes.toString().padStart(2, '0');
          secondsElement.textContent = timeLeft.seconds.toString().padStart(2, '0');

          // Oprește numărătoarea inversă dacă a ajuns la 00:00:00:00
          if (timeLeft.total <= 0) {
            clearInterval(intervalId);
          }
        }, 1000);
      }
    }
  }
});