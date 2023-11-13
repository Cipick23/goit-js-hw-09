import flatpickr from "/node_modules/flatpickr";
import "/node_modules/flatpickr/dist/flatpickr.min.css";
import Notiflix from '/node_modules/notiflix';
import "/node_modules/notiflix/dist/notiflix-3.2.6.min.css";

const dateInput = document.getElementById('datetime-picker');
const dateValue = document.getElementsByClassName('value');
const dateLabel = document.getElementsByClassName('label');
const dateBtn = document.getElementsByClassName('startBtn');

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
    },
  };

    console.log(new Date())

  let isTimerRunning = true;
    
dateInput.addEventListener('click', () => {
  setTimeout(() => {
      flatpickr(dateInput, options);
      if (new Date() <= options.defaultDate) {
          Notiflix.Notify.warning('Please choose a date in the future!');
      };
      if (!selectedDates[0]) {
        isTimerRunning = true;
      }
  }, 0); // Adăugați un timp de întârziere, de exemplu, 0
});


//   dateBtn.addEventListener('click', () => {

//   })

// dateValue.addEventListener('input', () => {
//     if (options) {
//         options(); // folosește variabila options în funcție
//     }
// });

//   dateLabel.addEventListener('input', () => {
//     options();
//   });

//   function WindowAlert() {
//     console.info("Please choose a date in the future!");
//   };


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
  };
  
  console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
  console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
  console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

  function addLeadingZero(_value) {
    padStart();
  };
