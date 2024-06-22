'use client';

import { createContext, useEffect, useState } from 'react';

interface ThatValues {
	addThat: (newThat: Omit<That, 'id'>) => void;
	getThat: (id: number) => That | undefined;
	editThat: (id: number, updatedIdea: That) => void;
	deleteThat: (id: number) => void;
	that?: That[];
}

export const ThatContext = createContext<ThatValues>({
	addThat: () => {},
	getThat: () => undefined,
	editThat: () => {},
	deleteThat: () => {},
	that: undefined,
});

export const ThatProvider = ({ children }: { children: React.ReactNode }) => {
	const [that, setThat] = useState<That[]>();

	console.log(that);

	useEffect(() => {
		if (typeof window === 'undefined') {
			return;
		}

		if (!that) {
			setThat(JSON.parse(window.localStorage.getItem('that') ?? '[]'));
			console.log('Loaded That');
			return;
		}

		window.localStorage.setItem('that', JSON.stringify(that));
		console.log('Saved That');
	}, [that]);

	const addThat = (newThat: Omit<That, 'id'>) => {
		if (!that) {
			return;
		}

		setThat([...that, { ...newThat, id: that.length + 1 }]);
	};

	const getThat = (id: number) => {
		if (!that) {
			return;
		}

		return that.find((self) => self.id === id);
	};

	const editThat = (id: number, updatedThat: That) => {
		if (!that) {
			return;
		}

		setThat(that.map((self) => (self.id === id ? updatedThat : self)));
	};

	const deleteThat = (id: number) => {
		if (!that) {
			return;
		}

		setThat(that.filter((self) => self.id != id));
	};

	return <ThatContext.Provider value={{ addThat, getThat, editThat, deleteThat, that }}>{children}</ThatContext.Provider>;
};
