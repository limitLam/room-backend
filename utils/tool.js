const tool = {
	//	列表筛选出返回前端的数据
	filterList: (list, filters) => {
		let newList = [];

		list.map((item, index) => {
			let obj = {};
			filters.map((key, i) => {
				obj[key] = item[key];
			})
			newList.push(obj);
		})

		return newList;
	},
	filterObj: (obj, filters) => {
		let newObj = {};
		filters.map((key, i) => {
			newObj[key] = obj[key];
		});
		return newObj;
	}
}

export default tool;