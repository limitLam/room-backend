import mongoose from 'mongoose';
let User = mongoose.model('User');

//	返回码
import {
	returnCode
} from '../../utils';

export const signin = (req, res) => {
	let _user = req.body;
	let name = _user.name;
	let password = _user.password;

	// let user = new User(_user)
	// user.save(function(err, user) {
	// 	if (err) {
	// 		console.log(err)
	// 	}

	// 	return res.json(returnCode('SUCCESS'));
	// })

	User.findOne({
		name: name
	}, (err, user) => {
		if (err) {
			console.log(err);
		}

		if (!user) {
			return res.json(returnCode('NO_USER'));
		}

		user.comparePassword(password, (err, isMatch) => {
			if (err) {
				console.log(err);
			}

			if (isMatch) {
				req.session.user = user

				return res.json(returnCode('SUCCESS'));
			} else {
				return res.json(returnCode('PASSWORD_ERROR'));
			}
		})
	})
}

export const logout = (req, res) => {
	delete req.session.user;

	res.json(returnCode('SUCCESS', null, '退出成功'));
}

export const signinRequired = (req, res, next) => {
	let user = req.session.user;

	if (!user) {
		return res.json(returnCode('NOT_LOGGED_IN'));
	}

	next()
}