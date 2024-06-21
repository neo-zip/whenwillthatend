'use client';

import { createContext, useState } from 'react';

const data: That[] = [
	{
		name: 'school',
		dates: {
			end: new Date(2025, 5, 2, 14, 5),
		},
	},
	{
		name: 'summer break',
		dates: {
			start: new Date(2024, 5, 1),
			end: new Date(2024, 7, 12),
		},
	},
	{
		name: 'Today',
		dates: {
			start: new Date(2024, 5, 21),
			end: new Date(2024, 5, 22),
		},
	},
	{
		name: 'Tomorrow',
		dates: {
			end: new Date(2024, 5, 23),
		},
	},
];

interface ThatValues {
	changeThat: (to: That[]) => void;
	that: That[];
}

export const ThatContext = createContext<ThatValues>({
	changeThat: () => {},
	that: data,
});

export const ThatProvider = ({ children }: { children: React.ReactNode }) => {
	const [that, setThat] = useState<That[]>(data);

	const changeThat = (to: That[]): void => {
		setThat(to);
	};

	return <ThatContext.Provider value={{ changeThat, that }}>{children}</ThatContext.Provider>;
};
