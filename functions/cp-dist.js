// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs-extra');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const angular = require('../hosting/angular.json');
const locales = angular.projects.hosting.architect.server.options.localize;

const getDirectories = source =>
  fs.readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

(async () => {
  const src = '../hosting/dist';
  const dest = './dist';
  await fs.remove(dest);
  await fs.copy(src, dest);
  await fs.remove('./dist/locales.json');
  await fs.writeFile('./dist/locales.json', JSON.stringify(locales));

  /**
  * Remove the hosting/dist/hosting/browser/{lang}/index.html
  * but only after it's been copied into functions.
  * This is so firebase will use the ssr function
  * and not serve the static index.html file
  */
  const baseDir = '../hosting/dist/hosting/browser/';
  const directories = getDirectories(baseDir);
  const promises = [];
  directories.forEach(dir => {
    promises.push(fs.remove(`${baseDir}${dir}/index.html`));
  });
  await Promise.all(promises);
})();
