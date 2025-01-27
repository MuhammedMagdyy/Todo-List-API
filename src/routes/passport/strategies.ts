import { Router } from 'express';
import { googleRouter } from './google';

const router = Router();

router.use('/google', googleRouter);

export { router as passportRouter };
