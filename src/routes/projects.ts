import { Router } from 'express';
import { projects } from '../controllers';

const router = Router();

router.post('/', projects.createProject);
router.get('/:uuid', projects.getProject);
router.get('/', projects.getAllProjects);
router.get('/last-four', projects.getLastFourProjects);

export { router as projectRouter };
