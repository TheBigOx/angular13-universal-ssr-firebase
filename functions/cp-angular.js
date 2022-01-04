// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs-extra');

(async () => {
  /**
   * Move the filename from index.html to index.original.html, 
   * otherwise firebase will see that index.html exists and it 
   * will serve that insead of passing the request to the ssr function, 
   * in which case no SSR will occur on base href '/' - only on routes.
   * e.g /test
   */
  await fs.move(
    '../hosting/dist/hosting/browser/index.html',
    '../hosting/dist/hosting/browser/index.original.html');
  const src = '../hosting/dist';
  const dest = './dist';
  await fs.remove(dest);
  await fs.copy(src, dest);
})();
