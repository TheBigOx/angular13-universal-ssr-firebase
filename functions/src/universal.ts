import * as functions from 'firebase-functions';
import * as express from 'express';
import { join } from 'path';
const server = express();
// eslint-disable-next-line @typescript-eslint/no-var-requires
const locales = require(join(process.cwd(), '/dist/locales.json'));

server.get('/', (req, res) => {
  const lang = req.acceptsLanguages(locales);
  if (lang) {
    return res.redirect(`/${lang}`);
  }

  res.redirect('/en'); // Default to english.
});

locales.forEach((locale: string) => {
  /**
   * Use localized main server otherwise 
   * it won't render in the language server side, rather
   * it will render in the default which is English.
   */
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const universal = require(
    join(process.cwd(), '/dist/hosting/server/', locale, '/main')
  ).app(locale);
  server.use(`/${locale}`, universal);
});

export const ssr = functions.https.onRequest(server);
