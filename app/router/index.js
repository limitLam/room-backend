import User from './user';
import Room from './Room';
import Belong from './Belong';

export {
	User,
	Room,
	Belong,
}

const router = (app) => {
	//	账户模块
	app.use('/api/user', User);

	//	会议厅所属模块
	app.use('/api/belong', Belong);

	//	会议厅模块
	app.use('/api/room', Room);

	//	测试模块
	app.get('/', (req, res) => {
		// console.log(req.session.user);
		res.json({
			limit: '456'
		})
	});
}

export default router;