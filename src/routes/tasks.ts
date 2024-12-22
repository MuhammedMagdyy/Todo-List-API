import { Router } from 'express';
import { tasks } from '../controllers';

const router = Router();

router.post('/', tasks.createTask);
router.get('/:uuid', tasks.getTask);
router.get('/', tasks.getAllTasks);

export { router as taskRouter };
