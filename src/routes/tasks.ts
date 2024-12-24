import { Router } from 'express';
import { tasks } from '../controllers';

const router = Router();

router.post('/', tasks.createTask);
router.get('/', tasks.getAllTasks);
router.get('/last-four', tasks.getLastFourTasks);
router.get('/:uuid', tasks.getTask);

export { router as taskRouter };
