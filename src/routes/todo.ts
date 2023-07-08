import { Router } from 'express';
import { getTodos, getTodo, createTodo } from '../controllers/todo';

const router: Router = Router();

router.get('/todos', getTodos);
router.get('/todos/:id', getTodo);
router.post('/todos', createTodo);

export default router;
