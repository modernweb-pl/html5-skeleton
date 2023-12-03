import handlebars from '@vituum/vite-plugin-handlebars';
import { resolve } from 'path';
import { AppType, defineConfig } from 'vite';
import vituum from 'vituum';

export default defineConfig(() => {
  const rootDir = 'src';
  const pagesDir = 'pages';
  const pagesPath = resolve(__dirname, rootDir, pagesDir);

  return ({
    root: rootDir,
    appType: 'mpa' as AppType,
    server: {
      port: 9000,
    },
    plugins: [
      vituum({
        imports: {
          paths: [],
        },
        pages: {
          root: '',
          dir: pagesDir,
        },
      }),
      handlebars({
        root: pagesPath,
        partials: {
          directory: '',
        },
        data: `${pagesPath}/data/*.json`,
      }),
    ],
  });
});
