import './styles.css';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import 'material-design-icons/iconfont/material-icons.css';

import { CountriesQuery } from './js/CountriesDetails';

const queryCountry = new CountriesQuery({
  input: '.input',
  section: '.template-wrapper',
});

queryCountry.init();