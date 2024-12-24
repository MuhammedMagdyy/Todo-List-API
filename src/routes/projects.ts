import { Router } from 'express';
import { projects } from '../controllers';

const router = Router();

router.post('/', projects.createProject);
router.get('/', projects.getAllProjects);
router.get('/last-four', projects.getLastFourProjects);
router.get('/:uuid', projects.getProject);

export { router as projectRouter };
