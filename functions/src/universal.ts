import * as functions from 'firebase-functions';
import * as express from 'express';
const server = express();
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
  /**
   * Use localized main server otherwise 
   * it won't render in the language server side, rather
   * it will render in the default which is English.
   */
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  server.use(`/${locale}`, require(`${process.cwd()}/dist/hosting/server/${locale}/main`).app(locale));
});

export const ssr = functions.https.onRequest(server);
