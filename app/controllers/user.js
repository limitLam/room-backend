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
				code: 500,
				data: {},
				msg: '没有该注册用户'
			});
		}

		user.comparePassword(password, (err, isMatch) => {
			if (err) {
				console.log(err);
			}

			if (isMatch) {
				// req.session.user = user

				return res.json({
					code: 200,
					data: {
						_id: user._id
					},
					msg: ''
				});
			} else {
				return res.json({
					code: 500,
					data: {},
					msg: '密码错误'
				});
			}
		})
	})
}