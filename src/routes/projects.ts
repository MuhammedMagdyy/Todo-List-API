import { Router } from 'express';
import { projects } from '../controllers';

const router = Router();

router.route('/').post(projects.createProject).get(projects.getAllProjects);

router.get('/last-four', projects.getLastFourProjects);

router
  .route('/:uuid')
  .get(projects.getProject)
  .patch(projects.updateProject)
  .delete(projects.deleteProject);

export { router as projectRouter };
