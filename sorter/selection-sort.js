const Util = require('../helper/util');

/**
 * 选择排序
 * @param  {[number]} data 待排数组
 */
module.exports = data => {
	const len = data.length;
	if (len <= 1) return;

	let minPos;
	for (let i = 0; i < len - 1; i++) {
		// 从剩余的序列里找一个最小的值，然后和data[i]对比
		minPos = i;
		for (let j = i + 1; j < len; j++) 
			if (data[j] < data[minPos]) minPos = j;
		
		// 如果找到的数字比当前位置data[i]还小，则交换
		if (minPos > i) 
			Util.swap (data, i, minPos)
	}
};