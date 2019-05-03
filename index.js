const fs = require('fs');
const path = require('path');
const Util = require('./helper/util');

const sortFunc = loadSorter();


//test('radix');
testAll(100000);

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


