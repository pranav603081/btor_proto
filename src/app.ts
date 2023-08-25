import _ from 'lodash';
import HapiPino from 'hapi-pino';
import common, { mongo } from 'cloudport-nodelib';
import {userRoutes } from './routes';

const server = common.app.server;
const logger = common.log.logger;
const hapiPinoOptions = common.log.hapiPinoOptions;

export const hapiRegisters = async () => {
  await server.register({
    plugin: HapiPino,
    options: hapiPinoOptions
  });

  const baseRout = process.env.API_PREFIX as string;
  server.realm.modifiers.route.prefix = baseRout;

  server.route({
    method: 'GET',
    path: '/healthcheck',
    handler: function () {
      const data = { uptime: process.uptime(), message: 'Ok', service: process.env.SERVICE, date: new Date() };
      return data;
    }
  });

//   server.route();

//   server.ext('onPreHandler', );
//   server.ext('onPreResponse', );

  const dbNames = [process.env.MONGO_DATABASENAME];
  await Promise.all(_.filter(dbNames).map((dbName) => mongo.getConnection(dbName)));

  server.start();
  logger.info('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  logger.error(err);
});

hapiRegisters();
