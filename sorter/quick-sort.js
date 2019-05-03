/**
 * 快速排序
 *
 * ※ 概述：
 * 	就像名字那样，它是实践中最快的已知排序算法，平均运行时间，
 *  与归并排序类似，采用分而治之的递归策略，因为采用递归的方式，
 *  因此对于数据量比较小的情形，其效率还不如简单排序，因此在递归
 *  到比较小的时候设置一个阈值(cutoff,一般比如设置为100),
 *  到达阈值时采用简单排序(比如插入排序)。
 * 
 * 
 * ※ 基本性质：
 * 	△ 时间复杂度：Tavg = O(NlogN), Twost = O(N²)
 *  △ 空间复杂度：O(logN)
 *  △ 稳定性：不稳定
 *  
 * ※ 基本思路：
 * 	1、集合S元素个数小于2时直接返回；
 * 	2、在数组中选取一个元素作为枢纽元(pivot)
 * 	3、以枢纽元作为界，把S划分成2个不相交的子集S1,S2,其中S1中元素都小于枢纽元，S2中元素都大于枢纽元
 * 	4、递归快排S1,S2,然后合并[...qsort(S1),pivot, ...qsort[S2]]
 * 	
 * @param  {[number]} data 待排数组
 */

const CUTOFF = 5;
const Util = require('../helper/util');
const insertionSort = require('./insertion-sort');

//module.exports = quickSort2;
module.exports = data => quickSort(data, 0, data.length - 1);



/**
 * 三数中值法获取枢纽元素
 *
 *  获取起始、中间、结束三个值中的中间值，并把三个值排序
 *  使得data[start] <= data[mid] <= data[end]
 * 
 * @param  {[number]} data  待排数组
 * @param  {number} start 起始索引
 * @param  {number} end   终点索引
 * @return {number}       枢纽元素值
 */
const median3 = (data, start, end) => {
	// 找到中间索引
	const mid = Math.floor((start + end) / 2); 

	// 给start, mid, end三个元素排序，
	// 使得 data[start] <= data[mid] <= data[right]
	if (data[start] > data[mid])
		Util.swap (data, start, mid);
	if (data[start] > data[end])
		Util.swap (data, start, end);
	if (data[mid] > data[end])
		Util.swap (data, mid, end);

	Util.swap (data, mid, end - 1);

	return data[end - 1];
}

function quickSort (data, start, end) {
	let low, high, pivot;

	if (start + CUTOFF <= end) {
		pivot = median3(data, start, end);
		low = start, high = end - 1;
		while (true) {
			// 小于枢纽元，直接右移
			while (data[++low] < pivot) ;
			// 大于枢纽元，左移
			while (data[--high] > pivot) ;

			// 到这里相当于左右两个指针都停下来了，需要交换两个值
			if (low < high)
				Util.swap(data, low, high);
			else // 否则相当于越界了(即完成了子集的划分)，退出循环
				break;
		}
		// 把枢纽元复位, 索引i处变成枢纽元素
		Util.swap (data, low, end - 1);

		// 枢纽元素两边的子集递归快排
		quickSort (data, start, low - 1);
		quickSort (data, low + 1, end);	
	} else {
		// 对[start, end]进行简单排序【这里用插入排序】
		let i, j, tmp;
		for (i = start + 1; i <= end; i++) {
			tmp = data[i];
			for (j = i; j > start && data[j - 1] > tmp; j--)
				data[j] = data[j - 1];
			data[j] = tmp;
		}
	}
}



/**
 * 返回已排序的数组副本
 * 
 * @param  {[number]} data 待排数组
 * @return {[number]}      已排序数组
 */
function qSort (data) {
	const len = data.length;
	if (len <= 1) return [...data];

	/**
	 * 选取枢纽元索引
	 * 
	 * @param  {[number]} data 待排数组
	 * @return {[number]}      枢纽元索引值
	 */
	const pickPivot = data => {
		const len = data.length;
		if (len < 3) return 0;

		let pivot;
		// 取中间一个索引
		const mid = Math.floor(len / 2);
		if ((data[0] - data[mid]) * (data[mid] - data[len - 1]) >= 0)	
			pivot = mid;
		else if ((data[mid] - data[0]) * (data[0] - data[len - 1]) >= 0)
			pivot = 0;
		else
			pivot = len - 1;
		return pivot;
	};

	// 1、选取枢纽元
	const pivot = pickPivot(data);
	const subLeft = [];
	const subRight = [];

	// 用于存放和枢纽元一样大的元素
	// 当某个元素和枢纽元一样大时，没有
	// 必要进入下一轮的快排。
	const pivotVal = [data[pivot]]; 
	for (let i = 0; i < len; i++) {
		// 跳过枢纽元元素
		if (i === pivot) continue;
		if (data[i] < data[pivot]) 
			subLeft.push(data[i]);
		else if(data[i] > data[pivot])
			subRight.push(data[i]);
		else
			pivotVal.push(data[i]);
	}
	return [...qSort(subLeft), ...pivotVal, ...qSort(subRight)];
}

/**
 * 这个实现借助了额外的数组来存放划分的子集
 * 空间效率和时间效率都不好，但是对于理解快排原理有帮助
 * 
 * @param  {[number]} data 待排数组
 */
function quickSort2 (data) {
	const newData = qSort(data);
	// 把排序后的数组副本拷贝回去
	data.forEach((v, i, a) => (a[i] = newData[i]));
}