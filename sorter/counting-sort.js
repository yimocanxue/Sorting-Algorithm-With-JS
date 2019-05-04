module.exports = countingSort;

function countingSort (data) {
	const len = data.length;
	if (len  <= 1) return ;

	// 处理有小于0的情况
	let inc = 0;
	const min = Math.min.apply(Math, data);
	if (min < 0) {
		inc = -min;
		data.forEach((v, i, a) => a[i] += inc);
	}
	const max = Math.max.apply(Math, data);
	const countsNum = max + 1;
	let counts = new Array(countsNum).fill(0);

	// 统计每个元素出现的次数
	for (let i = 0; i < len; i++) 
		counts[data[i]]++;

	let index = 0;
	for (let j = 0; j < countsNum; j++) {
		while (counts[j] > 0) {
			data[index++] = j;
			counts[j]--;
		}
	}

	if (inc > 0)
		data.forEach((v, i, a) => a[i] -= inc);
	
	counts = null;
};