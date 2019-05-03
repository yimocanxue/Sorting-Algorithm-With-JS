module.exports = data => {
	mSort (data, [], 0, data.length - 1);
};

/**
 * 合并两个有序的子区间[left, right - 1]、[right, rightEnd]
 *
 * 合并时借助tmpArray
 *
 * @param  {[Number]} data     	待排序数组
 * @param  {[Number]} tmpArray 	归并辅助临时数组
 * @param  {Number} left     	归并左区间起点
 * @param  {Number} right    	归并右区间起点
 * @param  {Number} rightEnd	归并右区间重点
 */
function merge (data, tmpArray, left, right, rightEnd) {
	let leftEnd = right - 1;
	const nums = rightEnd - left + 1;
	let tmp = left;

	// 按照从大到小的顺序把元素拷贝到tmpArray
	while (left <= leftEnd && right <= rightEnd) 
		tmpArray[tmp++] = data[left] < data[right] ? data[left++] : data[right++];

	// 把[left, leftEnd]内剩余的元素都拷贝到tmpArray
	while (left <= leftEnd)
		tmpArray[tmp++] = data[left++];
	// 把[right, rightEnd]内的剩余元素拷贝到tmpArray
	while (right <= rightEnd)
		tmpArray[tmp++] = data[right++];

	// 把归并好的元素拷贝回data中
	for (let i = 0; i < nums; i++, rightEnd--)
		data[rightEnd] = tmpArray[rightEnd];
}

/**
 * 递归从中点切分待排元素为左右两个子区间，然后再归并
 * 
 * @param  {[Number]} data     	待排数组
 * @param  {[Number]} tmpArray 	归并辅助临时数组
 * @param  {Number} start    	排序元素起点
 * @param  {Number} end     	排序元素终点
 */
function mSort (data, tmpArray, start, end) {
	if (start < end) {
		const center = Math.floor((start + end) / 2);
		mSort (data, tmpArray, start, center);
		mSort (data, tmpArray, center + 1, end);
		merge (data, tmpArray, start, center + 1, end);
	}
}

