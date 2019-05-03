const Util = require('../helper/util');

module.exports = heapSort

/**
 * 将size个元素的数组中以data[root]为顶堆调整为最大堆
 * 
 * @param  {[Number]} data 待排序数组
 * @param  {Number} root 堆顶索引
 * @param  {Number} size 堆大小
 */
function percDown (data, root, size) {

	let parent;
	let child, tmp;

	tmp = data[root];
	for (parent = root; 2 * parent + 1 < size; parent = child) {
		// 找到最大子结点
		child = 2 * parent + 1;
		if (child != size - 1 && data[child + 1] > data[child])
			child++;

		if (tmp < data[child]) // 结点下滤
			data[parent] = data[child]
		else // 找到合适的位置，退出循环
			break;
	}
	// 根结点放在合适的位置
	data[parent] = tmp;
}

function heapSort (data) {
	const len = data.length;
	if (len <= 1) return;

	// 调整成一个最大堆
	for (let i = Math.floor(len / 2); i >= 0; i--)
		percDown(data, i, len);

	for (let j = len - 1; j > 0; j--) {
		Util.swap(data, 0, j);	// 删除对顶元素(最大值)、交换到当前堆的最后一个位置j
		percDown(data, 0, j); 	// 调整最后的堆为最大堆
	}
}