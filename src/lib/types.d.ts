namespace Theme {
	type Values = 'light' | 'dark';
	type Schemes = Values | 'system';

	interface Themes {
		scheme: Schemes;
		readonly value: Values;
	}
}

interface That {
	name: string;
	dates: {
		start?: Date;
		end: Date;
	};
	id: number;
}
