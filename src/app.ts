import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import passport from 'passport';
import swaggerUi from 'swagger-ui-express';
import colors from 'colors';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import swaggerDocument from '../swagger.json';
import routes from './routes';
import { errorHandler } from './middlewares';
import { nodeEnv, port, corsConfig } from './config';
import { SERVER, INTERNAL_SERVER_ERROR } from './utils';

const app = express();

const logger =
  nodeEnv === SERVER.DEVELOPMENT
    ? morgan('dev')
    : morgan('combined', {
        skip: (_, res) => res.statusCode < INTERNAL_SERVER_ERROR,
      });

app.use(logger);
app.use(cors(corsConfig));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(cookieParser()); // TODO: Need to check it back
app.use(passport.initialize());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', routes);
app.use(errorHandler);

export function up() {
  return new Promise((resolve, reject) => {
    const server = app.listen(port || SERVER.DEFAULT_PORT_NUMBER);

    server.once('listening', () => {
      console.log(colors.green(`Server is running on port ${port} 🚀`));
      resolve(server);
    });

    server.once('error', (err) => {
      console.error(colors.red(`Error starting server: ${err.message}`));
      reject(err);
    });
  });
}
