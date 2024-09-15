import './styles.scss';
import 'bootstrap';

const invalidRSS = () => {
  const form = document.querySelector('.rss-form.text-body');
  const exampleText = document.querySelector('.mt-2.mb-0.text-muted');
  const p = document.createElement('p');
  const pClassList = ['feedback', 'm-o', 'position-absolute', 'small', 'text-success', 'text-danger'];
  p.classList.add(...pClassList);
  p.textContent = 'Ссылка должна быть валидным URL';
  form.appendChild(p);
  exampleText.classList.add('invisible');
};

const alreadyExistsRSS = () => {
  const form = document.querySelector('.rss-form.text-body');
  const exampleText = document.querySelector('.mt-2.mb-0.text-muted');
  const p = document.createElement('p');
  const pClassList = ['feedback', 'm-o', 'position-absolute', 'small', 'text-success', 'text-danger'];
  p.classList.add(...pClassList);
  p.textContent = 'RSS уже существует';
  form.appendChild(p);
  exampleText.classList.add('invisible');
};
// eventualy validation via yup library
const tempRegex = /^[a-z][^\s]/;

const form = document.querySelector('.rss-form.text-body');
const input = document.querySelector('.form-control.w-100');
const submit = document.querySelector('.h-100.btn.btn-lg.btn-primary');

const state = {
  validationForm: {
    valid: null,
    errors: [],
    rssFeedsUrls: [],
  },
};

const validateScheme = () => {
  submit.addEventListener('click', (e) => {
    e.preventDefault();
    form.reset();
    input.focus();
    const inputValue = input.value;
    state.validationForm.value = inputValue;
    state.validationForm.rssFeedsUrls.push(inputValue);
    // check validity of URL
    if (inputValue.match(tempRegex)) {
      state.validationForm.valid = true;
      state.validationForm.errors = [];
      state.validationForm.rssFeedsUrls.push(inputValue);
    } else {
      state.validationForm.valid = false;
      state.validationForm.errors.push('Ссылка должна быть валидным URL');
    }
    // check dublicates
    const rssFeedsUrlsArray = state.validationForm.rssFeedsUrls;
    const filteredArr = rssFeedsUrlsArray.filter((current, index) => rssFeedsUrlsArray.indexOf(current) == index);
    if (filteredArr.length === rssFeedsUrlsArray.length) {
      state.validationForm.valid = true;
      state.validationForm.errors = [];
    } else {
      state.validationForm.valid = false;
      state.validationForm.errors.push('RSS уже существует');
    }
    if (state.validationForm.errors.includes('Ссылка должна быть валидным URL')) {
      invalidRSS();
    }
    if (state.validationForm.errors.includes('RSS уже существует')) {
      alreadyExistsRSS();
    }
    console.log(state.validationForm.errors);
  });
};

validateScheme();
