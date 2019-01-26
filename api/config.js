require('dotenv').config({ path: '../.env' });
const env = process.env.APP_ENV || 'development';
const config = {
  env,
  development: {
    db: {
      connection: process.env.CONNECTION_STRING,
      seedDirectory: './seeds/dev',
      migrationDirectory: './database/migrations',
      debug: process.env.DEBUG,
    },
  },
  production: {
    db: {
      connection: process.env.CONNECTION_STRING,
      seedDirectory: './seeds/prod',
      migrationDirectory: './database/migrations',
      debug: false,
    },
  },
};

module.exports = config;
