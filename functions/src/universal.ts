import * as functions from 'firebase-functions';

// TODO: Check language - redirect if not set.
// Throw 404 if not supported.
const locale = 'es';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const universal = require(`${process.cwd()}/dist/hosting/server/main`).app(locale);
export const ssr = functions.https.onRequest(universal);
