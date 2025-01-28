import { Router } from 'express';
import { tasks } from '../controllers';

const router = Router();

router.route('/').post(tasks.createTask).get(tasks.getAllTasks);

router
  .route('/:uuid')
  .get(tasks.getTask)
  .patch(tasks.updateTask)
  .delete(tasks.deleteTask);

export { router as taskRouter };
