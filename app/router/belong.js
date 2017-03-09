import express from 'express';
let router = express.Router();

import * as Belong from '../controllers/Belong';

//	登录授权
import * as User from '../controllers/User';
router.use(User.signinRequired);

//	新增
router.post('/add', Belong.add);

//	删除
router.delete('/del/:code', Belong.del);

//	查询
router.get('/item/:code', Belong.get);

//	修改
router.put('/update/:code', Belong.update);

//	查询列表
router.get('/list', Belong.list);

export default router;