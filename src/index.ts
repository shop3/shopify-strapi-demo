import path from 'path';
import webpack from 'webpack';
import TerserPlugin from 'terser-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

let compiler: webpack.Compiler;

export default {
  register() {
    compiler = webpack({
      mode: 'development',
      devtool: 'cheap-module-source-map',
      entry: path.resolve(process.cwd(), './src/client/index.tsx'),
      output: {
        filename: 'index.js',
        path: path.resolve(process.cwd(), './public/client'),
      },
      module: {
        rules: [
          {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader'],
          },
          {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
                plugins: ['@babel/plugin-transform-runtime'],
              },
            },
          },
        ],
      },
      resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        fallback: {
          path: false,
        },
      },
      plugins: [
        new webpack.EnvironmentPlugin(['SHOPIFY_API_KEY', 'SHOPIFY_APP_NAME']),
        new MiniCssExtractPlugin({ filename: 'index.css' }),
      ],
      optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({ extractComments: false })],
      },
    });
  },

  async bootstrap({ strapi }) {
    await new Promise<void>((resolve, reject) => {
      compiler.run((err, stats) => {
        if (err) {
          strapi.log.error(err.message);
          reject();
        } else {
          const { errors, warnings } = stats.toJson('minimal');
          if (errors && errors.length > 0) {
            for (const error of errors) {
              strapi.log.error(error.message);
            }
          }
          if (warnings && warnings.length > 0) {
            for (const warning of warnings) {
              strapi.log.warn(warning.message);
            }
          }
          resolve();
        }
      });
    });
  },

  async destroy({ strapi }) {
    await new Promise<void>((resolve) => {
      compiler.close((err) => {
        if (err) {
          strapi.log.error(err.message);
        }
        resolve();
      });
    });
  },
};
