const webpack = require('webpack');
const pkg = require('./package.json');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { findPages } = require('./src/modules/utils/find');
const path = require('path');

const LANGUAGES = ['en', 'zh', 'ru', 'pt', 'fr', 'es', 'de'];

const workspaceRoot = path.join(__dirname, '../');

module.exports = {
  webpack: (config, options) => {
    const plugins = config.plugins.concat([
      new webpack.DefinePlugin({
        'process.env': {
          LIB_VERSION: JSON.stringify(pkg.version),
        },
      }),
    ]);

    if (process.env.DOCS_STATS_ENABLED) {
      plugins.push(
        // For all options see https://github.com/th0r/webpack-bundle-analyzer#as-plugin
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          generateStatsFile: true,
          // Will be available at `.next/stats.json`
          statsFilename: 'stats.json',
        }),
      );
    }

    config.resolve.alias['react-dom$'] = 'react-dom/profiling';
    config.resolve.alias['scheduler/tracing'] = 'scheduler/tracing-profiling';

    if (options.isServer) {
      config.externals = ['react-dom', 'react'];
    }

    config.resolve.alias['@material-ui/core'] = '@material-ui/core/src';
    config.resolve.alias['@material-ui/docs'] = '@material-ui/docs/src';
    config.resolve.alias['@material-ui/icons'] = '@material-ui/icons/src';
    config.resolve.alias['@material-ui/lab'] = '@material-ui/lab/src';
    config.resolve.alias['@material-ui/styles'] = '@material-ui/styles/src';
    config.resolve.alias['@material-ui/system'] = '@material-ui/system/src';
    config.resolve.alias['@material-ui/types'] = '@material-ui/types/src';
    config.resolve.alias['@material-ui/utils'] = '@material-ui/utils/src';

    return Object.assign({}, config, {
      plugins,
      node: {
        fs: 'empty',
      },
      module: Object.assign({}, config.module, {
        rules: config.module.rules.concat([
          {
            test: /\.(css|md)$/,
            loader: 'emit-file-loader',
            options: {
              name: 'dist/[path][name].[ext]',
            },
          },
          {
            test: /\.(css|md)$/,
            loader: 'raw-loader',
          },
          // required to transpile ../packages/
          {
            test: /\.(js|mjs|jsx)$/,
            include: [workspaceRoot],
            exclude: /node_modules/,
            use: options.defaultLoaders.babel,
          },
        ]),
      }),
    });
  },
  webpackDevMiddleware: config => config,
  // Next.js provides a `defaultPathMap` argument, we could simplify the logic.
  // However, we don't in order to prevent any regression in the `findPages()` method.
  exportPathMap: () => {
    const pages = findPages();
    const map = {};

    function traverse(pages2, userLanguage) {
      const prefix = userLanguage === 'en' ? '' : `/${userLanguage}`;

      pages2.forEach(page => {
        if (!page.children) {
          map[`${prefix}${page.pathname}`] = {
            page: page.pathname,
            query: {
              userLanguage,
            },
          };
          return;
        }

        traverse(page.children, userLanguage);
      });
    }

    // We want to speed-up the build of pull requests.
    if (process.env.PULL_REQUEST === 'true') {
      traverse(pages, 'en');
    } else {
      LANGUAGES.forEach(userLanguage => {
        traverse(pages, userLanguage);
      });
    }

    return map;
  },
  onDemandEntries: {
    // Period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 120 * 1e3, // default 25s
    // Number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 3, // default 2
  },
};
