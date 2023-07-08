import { Router } from 'express';
import { getTodos, getTodo } from '../controllers/todo';

const router: Router = Router();

router.get('/todos', getTodos);
router.get('/todos/:id', getTodo);

export default router;
