import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const SALT_WORK_FACTOR = 10;

let UserSchema = new mongoose.Schema({
	name: {
		unique: true,
		type: String
	},
	password: String,
	// 0: nomal user
	// 1: verified user
	// 2: professonal user
	// >10: admin
	// >50: super admin
	role: {
		type: Number,
		default: 0
	},
	createAt: {
		type: Date,
		default: Date.now()
	},
	updateAt: {
		type: Date,
		default: Date.now()
	}
});

UserSchema.pre('save', function(next) {
	let user = this;

	this.createAt = this.updateAt = Date.now();

	bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
		if (err) {
			return next(err);
		}

		bcrypt.hash(user.password, salt, (err, hash) => {
			if (err) {
				return next(err);
			}

			user.password = hash;
			next();
		})
	})
});

UserSchema.methods = {
	comparePassword: function(_password, cb) {
		bcrypt.compare(_password, this.password, function(err, isMatch) {
			if (err) return cb(err)

			cb(null, isMatch)
		})
	}
}

UserSchema.statics = {
	fetch: function(cb) {
		return this
			.find({})
			.sort('updateAt')
			.exec(cb)
	},
	findById: function(id, cb) {
		return this
			.findOne({
				_id: id
			})
			.exec(cb)
	}
}

export default UserSchema;