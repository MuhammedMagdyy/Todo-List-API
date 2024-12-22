import { Router } from 'express';
import { statuses } from '../controllers';

const router = Router();

router.get('/', statuses.getAllStatuses);

export { router as statusRouter };
