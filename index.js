const fs = require('fs');
const path = require('path');
const Util = require('./helper/util');

// 批量导入排序函数
const sortFunc = loadSorter();


//test('counting');
testAll(50000);

function loadSorter () {
	const sorterPath = path.join(__dirname, './sorter/');
	return fs.readdirSync(sorterPath).reduce((res, cur) => {
		if (/.js$/.test(cur)) {
			let key = cur.substr(0, cur.indexOf('-'));
			res[key] = require(`${sorterPath}${cur}`);
		}
		return res;
	}, {});
}


/**
 * 测试单个排序
 * 
 * @param  {String} func 排序函数名称，排序函数所在文件名称-前的部分
 * @param  {Number} size 测试待排数组大小
 */
function test (func, size = 100) {
	const data = testData(size);
	console.time(`${func} sort ${size} spent`);
	sortFunc[func](data);
	if (!Util.sorted(data)) {
		console.log(`[${data.toString()}]`);
		console.log(`${func} sort fail!`);
		return;
	}
	console.timeEnd(`${func} sort ${size} spent`);
}

/**
 * 测试所有排序函数
 * 
 * @param  {Number} size 测试待排数组大小
 */
function testAll (size = 1000) {
	let data;
	for (let func in sortFunc) {
		if (typeof sortFunc[func] != 'function') 
			continue;
	
		data = testData(size);
		console.time(`${func} sort ${size} spent`);
		sortFunc[func](data);
		if (!Util.sorted(data)) {
			console.log(`[${data.toString()}]`);
			console.log(`${func} sort fail!`);
			return ;
		}
		console.timeEnd(`${func} sort ${size} spent`);
	}
}

// 提供测试数据
function testData (size) {
	return new Array(size).fill(0).map(() => parseInt(Math.random() * 10000) % 999); 
}


