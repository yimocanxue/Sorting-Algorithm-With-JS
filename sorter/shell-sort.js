module.exports = shellSort2

/**
 * 采用默认增量序列
 * 
 * @param  {[Number]} data 待排序数组
 */
function shellSort (data) {
	const len = data.length;
	if (len <= 1) return ;

	let d, i, j, tmp;
	for (d = Math.floor(len); d > 0; d = Math.floor(d / 2)) {
		for (i = d; i < len; i++) {
			tmp = data[i];
			for (j = i; j >= d && data[j - d] > tmp; j -= d)
				data[j] = data[j - d];

			data[j] = tmp;
		}
	}
}
/**
 * 采用sedgewick增量序列
 * 
 * @param  {[Number]} data 待排序数组
 */
function shellSort2 (data) {
	const len = data.length;
	if (len <= 1) return ;

	let si, d, i, j, tmp;
	// 这里只列出一小部分增量
	const sedgewick = [929, 505, 209, 109, 42, 19, 5, 1, 0];
	// 求出最大的增量
	for (si = 0; sedgewick[si] >= len; si++) ;

	for (d = sedgewick[si]; d > 0; d = sedgewick[++si]) {
		for (i = d; i < len; i++) {
			tmp = data[i];
			for (j = i; j >= d && data[j - d] > tmp; j -= d) 
				data[j] = data[j - d];
			data[j] = tmp;
		}	
	}
}