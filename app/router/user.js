import express from 'express';
let router = express.Router();

import * as User from '../controllers/user';


//	登录
router.post('/signin', User.signin);
//	登出
router.post('/logout', User.logout);

export default router;