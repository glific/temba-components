import merge from 'deepmerge';
// use createSpaConfig for bundling a Single Page App
import { createSpaConfig } from '@open-wc/building-rollup';
// import copy from 'rollup-plugin-copy';
// import commonjs from '@rollup/plugin-commonjs';
// import json from '@rollup/plugin-json';
import packageJson from './package.json';

// use createBasicConfig to do regular JS to JS bundling
// import { createBasicConfig } from '@open-wc/building-rollup';
// import inject from '@rollup/plugin-inject';

const baseConfig = createSpaConfig({
  // use the outputdir option to modify where files are output
  outputDir: 'dist',
  
  // if you need to support older browsers, such as IE11, set the legacyBuild
  // option to generate an additional build just for this browser
  // legacyBuild: true,

  // development mode creates a non-minified build for debugging or development
  developmentMode: process.env.ROLLUP_WATCH === 'true',

  // set to true to inject the service worker registration into your index.html
  injectServiceWorker: false,

  html: {
    files: ["./templates/components-head.html", "./templates/components-body.html"],
    flatten: false,
    transform: [
      
      // inject app version
      (html, args) => {
        if (args.htmlFileName === 'templates/components-body.html') {
          html = html.replace(
            '</body>',
            `<script>window.TEMBA_COMPONENTS_VERSION = "${packageJson.version}";</script></body>`,
          );
          html = html.replace(/(.*<body>)/is, "");
          html = html.replace(/(<\/body>.*)/is, "");
        }

        if (args.htmlFileName === 'templates/components-head.html') {
          html = html.replace(/(.*<head>)/is, "");
          html = html.replace(/(<\/head>.*)/is, "");
        }

        html = html.replace('="../', '="{{STATIC_URL}}@nyaruka/temba-components/dist/');

        return html;
      }
    ],
  },
});

const rollupConfig = merge(baseConfig, {
  // if you use createSpaConfig, you can use your index.html as entrypoint,
  // any <script type="module"> inside will be bundled by rollup
  // input: './index.html',
  // alternatively, you can use your JS as entrypoint for rollup and
  // optionally set a HTML template manually
  // input: './app.js',

  // output: {
    // entryFileNames: "temba-components.js"
  // },

  /* 
  plugins: [
    html({
      name: 'components-body.html',
      inject: false,
      template({ bundle }) {
        return `
        <html>
          <head>
            ${bundle.entrypoints.map(bundle => e =>
              `<script type="module" src="${e.importPath}"></script>`,
            )}
          </head>
        </html>
      `;
      },
    }),
  ], */
  /*
  plugins: [
    commonjs({
      include: 'node_modules/**'
    }), 
    // json(),
    copy({
      targets: [{ src: 'node_modules/@fortawesome/*', dest: './dist/static' }],
      // set flatten to false to preserve folder structure
      flatten: false,
    }),
  ],*/
});

export default rollupConfig;