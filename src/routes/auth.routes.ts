import { Router } from 'express';
import { googleRouter } from './google.routes';
import { users } from '../controllers';
import { isAuth } from '../middlewares';

const router = Router();

router.use('/google', googleRouter);
router.use('/profile', isAuth, users.getUser);

export { router as authRouter };
