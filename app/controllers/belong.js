import mongoose from 'mongoose';
let Belong = mongoose.model('Belong');

//	返回码
import {
	returnCode,
	tool
} from '../../utils';

export const add = (req, res) => {
	let _belong = req.body;
	let code = _belong.code;

	Belong.findByCode(code, function(err, belong) {
		if (err) {
			console.log(err)
		}

		if (belong) {
			return res.json(returnCode('BELONG_EXISTED'));
		}

		belong = new Belong(_belong)
		belong.save(function(err, belong) {
			if (err) {
				console.log(err)
			}

			return res.json(returnCode('SUCCESS'));
		})
	});

}

export const del = (req, res) => {
	let code = req.params.code;

	Belong.remove({
		code: code
	}, function(err, belong) {
		if (err) {
			console.log(err);
		}
		return res.json(returnCode('SUCCESS'));
	})
}

const FILTER = ['name', 'code'];

export const get = (req, res) => {
	let code = req.params.code;

	Belong.findByCode(code, function(err, belong) {
		if (err) {
			console.log(err);
		}

		if (!belong) {
			return res.json(returnCode('NO_BELONG'));
		}

		belong = tool.filterObj(belong, FILTER);
		return res.json(returnCode('SUCCESS', belong));
	});
}

export const update = (req, res) => {
	let code = req.params.code;
	let _belong = req.body;
	let name = _belong.name;

	Belong.findByCode(code, function(err, belong) {
		if (err) {
			console.log(err);
		}

		if (!belong) {
			return res.json(returnCode('NO_BELONG'));
		}

		belong.update({
			name: name,
			updateAt: Date.now()
		}, function(err, belong) {
			if (err) {
				console.log(err);
			}

			return res.json(returnCode('SUCCESS'));
		})
	});

}

export const list = (req, res) => {
	Belong.fetch((err, list) => {
		if (err) {
			console.log(err);
		}

		list = list.length > 0 ? tool.filterList(list, FILTER) : list;

		return res.json(returnCode('SUCCESS', list));
	});
}