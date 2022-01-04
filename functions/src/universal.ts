import * as functions from 'firebase-functions';

// TODO: Check language - redirect if not set.
// Throw 404 if not supported.

// eslint-disable-next-line @typescript-eslint/no-var-requires
const universal = require(`${process.cwd()}/dist/hosting/server/main`).app('es');
export const ssr = functions.https.onRequest(universal);
