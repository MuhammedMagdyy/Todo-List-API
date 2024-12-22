import { Router } from 'express';
import { tags } from '../controllers';

const router = Router();

router.post('/', tags.createTag);
router.get('/:uuid', tags.getTag);
router.get('/', tags.getAllTags);

export { router as tagRouter };
