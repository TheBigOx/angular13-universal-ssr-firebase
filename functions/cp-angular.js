// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs-extra')

const getDirectories = source =>
  fs.readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

(async () => {
  const src = '../hosting/dist';
  const dest = './dist';
  await fs.remove(dest);
  await fs.copy(src, dest);

  /**
  * Remove the hosting/dist/hosting/browser/{lang}/index.html
  * but only after it's been copied into functions.
  * This is so firebase will use the ssr function
  * and not serve the index.html file
  */
  const baseDir = '../hosting/dist/hosting/browser/';
  const directories = getDirectories(baseDir);
  console.log(directories);
  const promises = [];
  directories.forEach(dir => {
    promises.push(fs.remove(`${baseDir}${dir}/index.html`));
  });
  await Promise.all(promises);
})();
