export const returnCodeMap = {
	SUCCESS: {
		code: 0,
		msg: '成功',
	},
	NO_USER: {
		code: -1,
		msg: '没有该注册用户',
	},
	PASSWORD_ERROR: {
		code: -2,
		msg: '密码错误',
	},
	NOT_LOGGED_IN: {
		code: -3,
		msg: '未登录',
	},
	BELONG_EXISTED: {
		code: -4,
		msg: '该所属地已存在'
	},
	NO_BELONG: {
		code: -5,
		msg: '查询不到该所属地'
	},
	ROOM_EXISTED: {
		code: -6,
		msg: '该会议室已存在'
	},
	NO_ROOM: {
		code: -7,
		msg: '查询不到该会议室'
	},
}

const returnCode = (type, data, msg) => {
	let returnInfo = returnCodeMap[type];

	return {
		code: returnInfo.code,
		data: data || {},
		msg: msg || returnInfo.msg
	}
}

export default returnCode;