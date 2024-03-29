import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');
formEl.addEventListener('submit', onFormSubmit);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onFormSubmit(evt) {
  evt.preventDefault();
  let {
    elements: { delay, step, amount },
  } = evt.currentTarget;
  let elementsArray = [Number(delay.value), Number(step.value), Number(amount.value)];

  const hasElements = elementsArray.includes(0);
  if (hasElements) {
  alert('Date must be positive');
    return;
}
 
  for (let position = 1; position <= elemAmount; position++) {
    createPromise(position, elemDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
    elemDelay += elemStep;
  }
}
