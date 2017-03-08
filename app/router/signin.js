import express from 'express';
let router = express.Router();

import * as User from '../controllers/user';

router.post('/', User.signin);

export default router;