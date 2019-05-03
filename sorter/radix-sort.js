const RADIX = 10;

module.exports = radixSort;

/**
 * 获取数字num的倒数第d个数字
 * 
 * @param  {Number} num 待处理的数字
 * @param  {Number} d   从后面数的第几位
 * @return {Number}     num的倒数第d位数字
 */
function getDigit (num, d) {
	let rs = 0;
	for (let i = 1; i <= d; i++) {
		rs = num % RADIX;
		num = Math.floor(num / RADIX);
	}
	return rs;
}

function radixSort (data) {
	let len = data.length;
	if (len <= 1) return ;

	let inc = 0;
	const min = Math.min.apply(Math, data);
	// 如果有负数，则统一处理成正数
	if (min < 0) {
		inc = -min;
		data.forEach((v, i, a) => a[i] += inc);
	}

	const max = Math.max.apply(Math, data);
	// 统一数字的位数
	const count = String(max).length;

	// 初始化一个二维数组
	const buckets = new Array(RADIX).fill(0);
	buckets.forEach((v, i, a) => a[i] = []);

	// 分别针对每一位数字入桶
	for (let i = 1; i <= count; i++) {

		// 元素入桶
		for (let j = 0; j < len; j++)
			buckets[getDigit(data[j], i)].push(data[j]);
		
		// 再收集元素
		let index = 0;
		buckets.forEach((v, i) => {
			if (v.length >= 0) {
				v.forEach((vv, ii) => data[index++] = vv);
				// 清空对应的桶
				v.length = 0;
			} 	 
		});
	}

	// 如果处理过负数，则还原回去
	if (inc > 0) 
		data.forEach((v, i, a) => a[i] -= inc);
}