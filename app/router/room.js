import express from 'express';
let router = express.Router();

import * as Room from '../controllers/room';

//	新增
router.get('/add', Room.add);

export default router;