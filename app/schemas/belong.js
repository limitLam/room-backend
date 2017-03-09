import mongoose from 'mongoose';

let BelongSchema = new mongoose.Schema({
	name: {
		unique: true,
		type: String
	},
	code: {
		unique: true,
		type: String
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

BelongSchema.pre('save', function(next) {

	this.createAt = this.updateAt = Date.now();

	next();
});

BelongSchema.static('findByCode', function(code, cb) {
	return this
		.findOne({
			code: code
		})
		.exec(cb)
});

BelongSchema.static('fetch', function(cb) {
	return this
		.find({})
		.sort('updateAt')
		.exec(cb)
});

export default BelongSchema;