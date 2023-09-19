import { State } from "country-state-city";
import countries from "world-countries";

const formattedCountries = countries.flatMap((country) => {
  const states = State.getStatesOfCountry(country.cca2);

  return states.map((state) => ({
    label: `${state.name}, ${country.name.common}`,
    value: `${state.name}-${country.name.common}`,
    flag: country.flag,
    latlng:
      state?.latitude && state?.longitude
        ? [+state.latitude, +state.longitude]
        : country.latlng,
    region: country.region,
  }));
});

export const useCountries = () => {
  const cities = formattedCountries;

  const getAll = () => cities;

  const getByValue = (value: string) =>
    cities.find((item) => item.value === value);

  return {
    getAll,
    getByValue,
  };
};
