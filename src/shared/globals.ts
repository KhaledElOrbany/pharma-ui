const currencyCodes = {
  EGY: 'EGP',
  KSA: 'SAR',
  USA: 'USD',
  EU: 'EUR',
  TUR: 'TRY',
  UK: 'GBP',
};

const countryLocales = {
  EGY: 'en-EG',
  KSA: 'en-SA',
  USA: 'en-US',
  EU: 'en-EU',
  TUR: 'tr-TR',
  UK: 'en-GB',
};

const env = process.env.REACT_APP_ENV;
const envs = {
  DEV: 'development',
  STG: 'staging',
  PROD: 'production',
};

export { currencyCodes, countryLocales, env, envs };
