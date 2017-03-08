import User from './user';

export {
	User,
}

const router = (app) => {
	//	账户模块
	app.use('/api/user', User);

	//	测试模块
	app.get('/', (req, res) => {
		// console.log(req.session.user);
		res.json({
			limit: '456'
		})
	});
}

export default router;