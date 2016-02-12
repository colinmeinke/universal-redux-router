import { countries } from '../config';

const UPDATE_COUNTRY = 'UPDATE_COUNTRY';

const updateCountry = ( country = countries[ 0 ]) => ({ type: UPDATE_COUNTRY, country });

export { UPDATE_COUNTRY, updateCountry };
