import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import routes from './routes';
import { errorHandler } from './middlewares';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import { nodeEnv, sessionSecret } from './config';
import { INTERNAL_SERVER_ERROR } from './utils';

const app = express();
const logger =
  nodeEnv === 'development'
    ? morgan('dev')
    : morgan('combined', {
        skip: (_, res) => res.statusCode < INTERNAL_SERVER_ERROR,
      });
const ONE_DAY = 24 * 60 * 60 * 1000;
const cookieConfig = {
  secure: nodeEnv === 'production' ? true : false,
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
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:5174'],
    credentials: true,
  })
);
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(session(sessionsConfig));
app.use(passport.initialize());
app.use(passport.session());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', routes);
app.use(errorHandler);

export default app;
