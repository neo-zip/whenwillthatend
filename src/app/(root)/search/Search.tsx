'use client';

import React, { useContext, useState } from 'react';
import Dropdown from './Dropdown';
import { AnimatePresence } from 'framer-motion';
import { ThatContext } from '@/providers/That';

interface P {
	setResult: React.Dispatch<React.SetStateAction<That | undefined>>;
}

const Search: React.FC<P> = ({ setResult }) => {
	const { that } = useContext(ThatContext);
	const [focused, setFocused] = useState(false);
	const [queried, setQueried] = useState<string>();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!queried || queried.length < 1) {
			return;
		}

		getResults();
	};

	const getResults = (input?: string) => {
		const found = that.findIndex((item) => (item.name === input ? input : queried));

		if (found === -1) {
			return;
		}

		setResult(that[found]);
	};

	return (
		<div className='size-full center'>
			<form onSubmit={handleSubmit} className='text-center flex justify-center items-center gap-5 flex-col sm:flex-row'>
				<h2>When will</h2>
				<div>
					<input
						onFocus={() => setFocused(true)}
						onBlur={() => setFocused(false)}
						onChange={(e) => {
							setQueried(e.target.value);
						}}
						type='text'
						placeholder='that...'
						className='w-[90vw] sm:w-[25vw] bg-[var(--bg-normal)] text-[var(--link)] h-full text-5xl font-bold -mb-1 border-b-4 border-solid border-[var(--bg-high)] placeholder:text-[var(--bg-high)] focus:border-[var(--link)] focus:border-0 focus:border-b-4 focus:border-solid'
					/>
					<AnimatePresence>{focused && <Dropdown getResults={getResults} />}</AnimatePresence>
				</div>
				<h2>end?</h2>
			</form>
		</div>
	);
};

export default Search;
