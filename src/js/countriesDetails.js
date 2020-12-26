import { fetchCountries } from './fetchCountries';
import { debounce } from 'lodash';
import { onNotify } from './pNotify';
import countryQuery from '../template/countryRequest.hbs';
import countryQueryList from '../template/countriesRequestList.hbs';

export class CountriesQuery {
  constructor({ input, section, delay = 500 }) {
    this._refs = {
      input: document.querySelector(input),
      section: document.querySelector(section),
    };
    this._delay = delay;
  }
  init() {
    this._refs.input.focus();
    this._refs.input.addEventListener(
      'input',
      debounce(this.onInput.bind(this), this._delay),
    );
  }

  render(htmlString, delay = 150) {
    setTimeout(() => {
      this._refs.section.innerHTML = htmlString;
    }, delay);
  }

  createCountriesListTemplate(country) {
    this.render(countryQueryList(country));
    onNotify(
      'This is a list of the countries you are looking for',
      'info',
      'You can only choose one!',
    );
  }

  createCountryMarkup(country) {
    this.render(countryQuery(country));
    onNotify(
      'Success! This is the country you were looking for.',
      'info',
      'Congratulations!',
    );
  }
  dataReceived(data) {
    if (data.status === 404) {
      onNotify(`${data.message}`, 'error', data.status);
      return;
    }
    if (data.hasOwnProperty('name')) {
      this.createCountryMarkup(data);
      return;
    }
    if (data.length > 10) {
      onNotify(
        `Too many countries found: ${data.length}. Please enter a more specific request!`,
        'error',
        'ERROR',
      );
      return;
    }
    if (data.length === 1) {
      this.createCountryMarkup(data[0]);
      return;
    }
    this.createCountriesListTemplate(data);
  }
  onInput(event) {
    const countryName = event.target.value.trim();
    if (countryName === '') {
      this._refs.section.innerHTML = '';
      return;
    }
    debugger;
    fetchCountries(countryName)
      .then(this.dataReceived.bind(this))
      .catch(console.log);
  }
}