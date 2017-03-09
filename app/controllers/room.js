import mongoose from 'mongoose';
let Room = mongoose.model('Room');

//	返回码
import {
	returnCode,
	tool
} from '../../utils';

export const add = (req, res) => {
	let _room = req.body;
	let code = _room.code;

	Room.findByCode(code, function(err, room) {
		if (err) {
			console.log(err);
		}

		if (room) {
			return res.json(returnCode('ROOM_EXISTED'));
		}

		room = new Room(_room);
		room.save(function(err, room) {
			if (err) {
				console.log(err)
			}

			return res.json(returnCode('SUCCESS'));
		});
	});
}

export const del = (req, res) => {
	let code = req.params.code;

	Room.remove({
		code: code
	}, function(err, room) {
		if (err) {
			console.log(err);
		}
		return res.json(returnCode('SUCCESS'));
	})
}

const FILTER = ['name', 'code', 'belong'];

export const get = (req, res) => {
	let code = req.params.code;

	Room.findByCode(code, function(err, room) {
		if (err) {
			console.log(err);
		}

		if (!room) {
			return res.json(returnCode('NO_ROOM'));
		}

		room = tool.filterObj(room, FILTER);
		return res.json(returnCode('SUCCESS', room));
	});
}

export const update = (req, res) => {
	let code = req.params.code;
	let _room = req.body;
	let name = _room.name;

	Room.findByCode(code, function(err, room) {
		if (err) {
			console.log(err);
		}

		if (!room) {
			return res.json(returnCode('NO_ROOM'));
		}

		room.update({
			name: name,
			updateAt: Date.now()
		}, function(err, room) {
			if (err) {
				console.log(err);
			}

			return res.json(returnCode('SUCCESS'));
		})
	});

}