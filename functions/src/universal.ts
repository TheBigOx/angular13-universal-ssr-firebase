import * as functions from 'firebase-functions';
import * as express from 'express';
import { join } from 'path';
const server = express();
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const cookieParser = require('cookie-parser');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const locales = require(join(process.cwd(), '/dist/locales.json'));

// TODO: Use cookies to redirect to language.
// server.use(cookieParser());

/**
 * Redirect any call to root to the language path.
 */
server.get('/', (req, res) => {
  const lang = req.acceptsLanguages(locales);
  if (lang) {
    return res.redirect(`/${lang}`);
  }

  res.redirect('/en'); // Default to english.
});

/**
 * Handle deeplinks without a language path.
 */
// server.use(/^\/([^/]*)\/(.*)/, (req, res, next) => {
//   let lang = req.acceptsLanguages(req.params[0]);
//   if (!lang) {
//     lang = req.acceptsLanguages(locales);
//     if (!lang) {
//       lang = 'en';
//     }
//     if (req.params[1]) {
//       return res.redirect(`/${lang}/${req.params[0]}/${req.params[1]}`);
//     } else {
//       return res.redirect(`/${lang}/${req.params[0]}`);
//     }
//   }
//   next();
// });

/**
 * Use localized main server otherwise 
 * it won't render in the language server side, rather
 * it will render in the default which is English.
 */
locales.forEach((locale: string) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const universal = require(
    join(process.cwd(), '/dist/hosting/server/', locale, '/main')
  ).app(locale);
  server.use(`/${locale}`, universal);
});

export const ssr = functions.https.onRequest(server);
