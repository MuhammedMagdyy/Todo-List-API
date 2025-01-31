import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import passport from 'passport';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import colors from 'colors';
import swaggerDocument from '../swagger.json';
import routes from './routes';
import { errorHandler } from './middlewares';
import { nodeEnv, sessionSecret, port } from './config';
import { DEFAULT_PORT_NUMBER, INTERNAL_SERVER_ERROR, ONE_DAY } from './utils';

const app = express();

const logger =
  nodeEnv === 'development'
    ? morgan('dev')
    : morgan('combined', {
        skip: (_, res) => res.statusCode < INTERNAL_SERVER_ERROR,
      });

const cookieConfig = {
  secure: nodeEnv === 'development' ? false : true,
  httpOnly: true,
  maxAge: ONE_DAY,
};

const sessionsConfig = {
  secret: sessionSecret,
  resave: false,
  saveUninitialized: true,
  cookie: cookieConfig,
};

app.use(logger);
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(session(sessionsConfig));
app.use(passport.initialize());
app.use(passport.session());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', routes);
app.use(errorHandler);

export function up() {
  return new Promise((resolve, reject) => {
    const server = app.listen(port);

    server.once('listening', () => {
      console.log(
        colors.green(
          `Server is running on port ${port || DEFAULT_PORT_NUMBER} 🚀`
        )
      );
      resolve(server);
    });

    server.once('error', (err) => {
      console.error(colors.red(`Error starting server: ${err.message}`));
      reject(err);
    });
  });
}
