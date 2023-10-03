import express from 'express';

import { signin, signup, oauth } from '../controllers/user.js'

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.post('/oauth', oauth);

export default router;
