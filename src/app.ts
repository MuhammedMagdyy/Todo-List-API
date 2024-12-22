import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes';
import { errorHandler } from './middlewares';

const { NODE_ENV } = process.env;

const app = express();
const logger =
  NODE_ENV === 'development'
    ? morgan('dev')
    : morgan('combined', {
        skip: (_, res) => res.statusCode < 500,
      });

app.use(logger);
app.use(cors());
app.use(express.json());
app.use('/api/v1', routes);
app.use(errorHandler);

export default app;
