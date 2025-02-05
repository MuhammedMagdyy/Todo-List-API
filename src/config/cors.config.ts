import { frontendUrl } from './frontend.env';
import { SERVER } from '../utils';
import { CorsOptions } from 'cors';
import { nodeEnv } from './server.env';

export const corsConfig: CorsOptions = {
  origin: nodeEnv === SERVER.DEVELOPMENT ? SERVER.LOCALHOST_URLS : frontendUrl,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
