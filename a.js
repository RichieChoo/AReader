function isHui(num) {
	const arr = String(num).split('');
	const isJi = arr.length % 2 === 1;
	let result = true;
	const forLen = isJi ? (arr.length - 1) / 2 : arr.length / 2;
	for (let i = 0; i < forLen;i++) {
		if (arr[i] !== arr[arr.length - 1 - i]) {
			result = false;
		}
	}
	return result;
}

console.log(isHui(213123))