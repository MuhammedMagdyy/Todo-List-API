import { Router } from 'express';
import { statuses } from '../controllers';

const router = Router();

router.route('/').get(statuses.getAllStatuses);
router.get('/:uuid', statuses.getStatus);

export { router as statusRouter };
