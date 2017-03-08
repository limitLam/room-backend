import mongoose from 'mongoose';
let Room = mongoose.model('Room');

export const add = (req, res) => {
	res.json({
		status: 'success'
	})
}