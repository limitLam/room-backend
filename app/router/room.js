import express from 'express';
let router = express.Router();

import * as Room from '../controllers/room';

//	登录授权
import * as User from '../controllers/User';
router.use(User.signinRequired);

//	新增
router.post('/add', Room.add);

//	删除
router.delete('/del/:code', Room.del);

//	查询
router.get('/item/:code', Room.get);

//	修改
router.put('/update/:code', Room.update);

export default router;