import { Router } from 'express';
import { auth } from '../controllers';

const router = Router();

router.get('/', auth.generateAuthUrl);

router.get('/callback', auth.handleGoogleCallback);

export { router as googleRouter };
