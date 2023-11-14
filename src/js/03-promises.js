import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

  // Asigurați-vă că Notiflix este încărcat înainte de a utiliza funcționalitatea
  // Notiflix.Notify este folosit pentru a afișa notificări către utilizator
  // Scripturile Notiflix pot fi incluse prin adăugarea unor script-uri precum cele de mai sus

  document.getElementById('promiseForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Preveniți comportamentul implicit de trimitere a formularului

    // Obțineți valorile din câmpurile formularului
    const delay = parseInt(this.querySelector('[name="delay"]').value);
    const step = parseInt(this.querySelector('[name="step"]').value);
    const amount = parseInt(this.querySelector('[name="amount"]').value);

    // Apelează funcția createPromise pentru fiecare promisiune și afișează notificări către utilizator
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
    // Returnați un promise care va fi executat sau respins după un delay
    return new Promise((resolve, reject) => {
      const shouldResolve = Math.random() > 0.3;

      // Utilizați setTimeout pentru a întârzia executarea sau respingerea promise-ului
      setTimeout(() => {
        if (shouldResolve) {
          resolve({ position, delay });
        } else {
          reject({ position, delay });
        }
      }, delay);
    });
  };
