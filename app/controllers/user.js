import mongoose from 'mongoose';
let User = mongoose.model('User');

export const signin = (req, res) => {
	let _user = req.body;
	let name = _user.name;
	let password = _user.password;

	User.findOne({
		name: name
	}, (err, user) => {
		if (err) {
			console.log(err);
		}

		if (!user) {
			return res.json({
				code: -1,
				data: {},
				msg: '没有该注册用户'
			});
		}

		user.comparePassword(password, (err, isMatch) => {
			if (err) {
				console.log(err);
			}

			if (isMatch) {
				req.session.user = user

				return res.json({
					code: 0,
					data: {},
					msg: ''
				});
			} else {
				return res.json({
					code: -2,
					data: {},
					msg: '密码错误'
				});
			}
		})
	})
}

export const logout = (req, res) => {
	delete req.session.user;

	res.json({
		code: 0,
		data: {},
		msg: ''
	});
}

export const signinRequired = (req, res, next) => {
	var user = req.session.user;

	if (!user) {
		return res.json({
			code: -3,
			data: {},
			msg: '没有登录'
		});
	}

	next()
}