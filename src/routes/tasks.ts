import { Router } from 'express';
import { tasks } from '../controllers';

const router = Router();

router.post('/', tasks.createTask);
router.get('/:uuid', tasks.getTask);
router.get('/', tasks.getAllTasks);
router.get('/last-four', tasks.getLastFourTasks);

export { router as taskRouter };
