import { Router } from 'express';
import { tasks } from '../controllers';

const router = Router();

router.route('/').post(tasks.createTask).get(tasks.getAllTasks);

router.get('/last-four', tasks.getLastFourTasks);

router
  .route('/:uuid')
  .get(tasks.getTask)
  .put(tasks.updateTask)
  .delete(tasks.deleteTask);

export { router as taskRouter };
