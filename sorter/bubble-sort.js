const Util = require('../helper/util');

/**
 * 冒泡排序算法实现
 * 
 * @param  {[number]} data 待排数组
 */
module.exports = data => {

	const len = data.length;
	if (len <= 1) return ;

	let swap;
	for (let i = len - 1; i >= 0; i--) {
		swap = false;
		for (let j = 0; j < i; j++) 
			if (data[j] > data[j + 1]) 
				Util.swap(data, j, j + 1), swap = true;			
		
		if (!swap) break;
	}
};