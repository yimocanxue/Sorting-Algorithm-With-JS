const insertionSort = require('./insertion-sort');

module.exports = bucketSort;


function bucketSort (data) {
	const len = data.length;
	if (len <= 1) return;

	const min = Math.min.apply(Math, data); // 最大元素值
	const max = Math.max.apply(Math, data); // 最小元素值

	// 桶个数
	const bucketCount = max - min + 1; 

	// 初始化桶为一个二维数组
	const buckets = new Array(bucketCount).fill(0);
	buckets.forEach((v, i, a) => a[i] = []);

	// 把元素都放入桶中
	data.forEach((v, i) => buckets[v - min].push(v));

	// 对桶中的元素做插入排序
	buckets.forEach(b => insertionSort(b));

	// 将桶中元素拷贝回原数组
	let count = 0;
	for (let i = 0; i < bucketCount; i++) {
		if (buckets[i].length === 0) continue;
		for (let j = 0; j < buckets[i].length; j++) 
			data[count++] = buckets[i][j];
	}
}