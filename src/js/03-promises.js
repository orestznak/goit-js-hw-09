import Notiflix from 'notiflix';

const refs = {
  inputDelay: document.querySelector('[name="delay"]'),
  inputStep: document.querySelector('[name="step"]'),
  inputAmount: document.querySelector('[name="amount"]'),
  btnSubmit: document.querySelector('button'),
  form: document.querySelector('form')
}



refs.form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  let delayUser = parseInt(refs.inputDelay.value);
  const amountUser = parseInt(refs.inputAmount.value);
  const stepUser = parseInt(refs.inputStep.value);

  for(let position = 1; position <= amountUser; position += 1) {
    createPromise (position, delayUser)
      .then(value => {
        Notiflix.Notify.success(value);;
      })
      .catch(error => {
        Notiflix.Notify.warning(error);
      });
    delayUser +=stepUser;
  }

});

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

    return new Promise((resolve, reject) =>{
      setTimeout(() => {
        if (shouldResolve) {
          resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);          
        } else {
          reject(`❌ Rejected promise ${position} in ${delay}ms`);
        }
      }, delay);
    });
}
