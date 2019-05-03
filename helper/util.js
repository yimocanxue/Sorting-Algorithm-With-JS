module.exports.swap = (data, s, e) => { 
	let tmp = data[s]; 
	data[s] = data[e];
	data[e] = tmp;
};


/**
 * 判断一个数组是否有序
 * @param  {[Number]} data 要判断的数组
 * @return {Boolean}       是否有序
 */
module.exports.sorted = data => {
	let prev = data[0];
	for (let index in data) {
		if (data[index] >= prev)
			prev = data[index];
		else
			return false;
	}
	return true;
}