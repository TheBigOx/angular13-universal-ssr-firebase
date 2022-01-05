import * as functions from 'firebase-functions';
import * as express from 'express';
const server = express();
// eslint-disable-next-line @typescript-eslint/no-var-requires
const universal = require(`${process.cwd()}/dist/hosting/server/main`);
const locales = ['en', 'es', 'en-AU'];

server.get('/', (req, res) => {
  /**
   * TODO - use the Accept-Language request HTTP header
   * to determin what route to redirect to.
   * However, ensure that it's a supported language
   * as defined in locales array above / or default
   * to english.
   */
  res.redirect('/en'); // Default to english.
});

locales.forEach((locale: string) => {
  server.use(`/${locale}`, universal.app(locale));
});

export const ssr = functions.https.onRequest(server);
