/**
 * 插入排序算法实现【对比抓扑克牌】
 * 
 * @param  {[Number]} data  待排序数组
 */
module.exports = data => {
	const len = data.length;
	if (len <= 1) return;

	let i, j, tmp;
	// 初始情况，相当于手上有一张牌data[0]是有序的
	// 然后从第二张data[1]开始摸牌，然后和手上的牌对比
	for (i = 1; i < len; i++) {
		tmp = data[i]; // 摸到的牌，先缓存下
		// 内存循环，把摸到的牌和手上的牌逐张对比
		// 找到适合插入刚摸的牌的位置j
		for (j = i; j > 0 && data[j - 1] > tmp; j--) 
			data[j] = data[j - 1];

		// 插入扑克牌
		data[j] = tmp;
	}
};