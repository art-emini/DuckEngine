const __debugStack_duckengine: string[] = [];

class Error {
	constructor(message: string) {
		console.error('DuckEngine Error : ' + message);
		__debugStack_duckengine.push(message);
	}
}

class Warn {
	constructor(message: string) {
		console.warn('DuckEngine Warning : ' + message);
		__debugStack_duckengine.push(message);
	}
}

class Log {
	constructor(message: string) {
		console.log('DuckEngine : ' + message);
		__debugStack_duckengine.push(message);
	}
}

const Debug = {
	stack: () => {
		return __debugStack_duckengine;
	},
	Error: Error,
	Warn: Warn,
	Log: Log,
};

export default Debug;
