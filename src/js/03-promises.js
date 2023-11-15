import Notiflix from 'notiflix';
// import 'notiflix/dist/notiflix-3.2.6.min.css';

  document.getElementById('promiseForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const delay = parseInt(this.querySelector('[name="delay"]').value);
    const step = parseInt(this.querySelector('[name="step"]').value);
    const amount = parseInt(this.querySelector('[name="amount"]').value);

    for (let i = 1; i <= amount; i++) {
      const position = i;
      const currentDelay = delay + (i - 1) * step;

      createPromise(position, currentDelay)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    }
  });

  function createPromise(position, delay) {
    return new Promise((resolve, reject) => {
      const shouldResolve = Math.random() > 0.3;

      setTimeout(() => {
        if (shouldResolve) {
          resolve({ position, delay });
        } else {
          reject({ position, delay });
        }
      }, delay);
    });
  };
