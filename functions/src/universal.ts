import * as functions from 'firebase-functions';
import * as express from 'express';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const universal = require(`${process.cwd()}/dist/hosting/server/main`);
// const universalEN = universal.app('en');
// const universalES = universal.app('es');

const server = express();
server.get('/', (req, res) => {
  res.redirect('/en'); // Default to english.
});
const locales = ['en', 'es'];
locales.forEach((locale: string) => {
  server.use(`/${locale}`, universal.app(locale));
});

export const ssr = functions.https.onRequest(server);
