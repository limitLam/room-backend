import mongoose from 'mongoose';

let RoomSchema = new mongoose.Schema({
	name: {
		unique: true,
		type: String
	},
	code: {
		unique: true,
		type: String
	},
	belong: String,
	createAt: {
		type: Date,
		default: Date.now()
	},
	updateAt: {
		type: Date,
		default: Date.now()
	}
});

RoomSchema.pre('save', function(next) {

	this.createAt = this.updateAt = Date.now();

	next();
});

RoomSchema.pre('update', function(next) {

	this.updateAt = Date.now();

	next();
});

RoomSchema.static('findByCode', function(code, cb) {
	return this
		.findOne({
			code: code
		})
		.exec(cb);
});

export default RoomSchema;