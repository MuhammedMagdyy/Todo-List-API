import { Router } from 'express';
import { tags } from '../controllers';

const router = Router();

router.route('/').post(tags.createTag).get(tags.getAllTags);

router.route('/:uuid').get(tags.getTag);

export { router as tagRouter };
