'use client';

import React, { useContext, useState } from 'react';
import Suggestions from './Suggestions';
import { ThatContext } from '@/providers/That';
import { AnimatePresence, m } from 'framer-motion';
import Loader from '@/components/loader/Loader';
import Add from '../(add)/Add';
import Link from 'next/link';

interface P {
	setResult: React.Dispatch<React.SetStateAction<That | undefined>>;
}

const Search: React.FC<P> = ({ setResult }) => {
	const { that } = useContext(ThatContext);
	const [focused, setFocused] = useState(false);
	const [notfound, setNotfound] = useState(false);
	const [queried, setQueried] = useState<string>();

	if (!that) {
		return <Loader />;
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!queried || queried.length < 1) {
			return;
		}

		getResults(queried);
	};

	const getResults = (input: string) => {
		const found = that.findIndex((item) => item.name.toLowerCase() === input.toLowerCase());

		if (found === -1) {
			setNotfound(true);

			const timer = setTimeout(() => {
				setNotfound(false);
			}, 3000);

			return () => clearTimeout(timer);
		}

		setResult(that[found]);
	};

	return (
		<div className='flex flex-col gap-5 items-center'>
			<form onSubmit={handleSubmit} className='text-center flex justify-center items-center gap-5 flex-col sm:flex-row my-5'>
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
						className={`w-[90vw] sm:w-[25vw] bg-[var(--bg-normal)] text-[var(--link)] h-full text-5xl font-bold -mb-1 border-b-4 border-solid border-[var(--bg-high)] placeholder:text-[var(--bg-high)] focus:border-[var(--link)] focus:border-0 focus:border-b-4 focus:border-solid rounded-none ${
							notfound && '!border-red-500 !text-red-500'
						}`}
					/>
					<AnimatePresence>
						{notfound && (
							<m.p
								initial={{ opacity: 0, y: 50 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -50 }}
								className='text-red-500 text-center w-full absolute -top-1/4'>
								We couldn&apos;t find that one.
							</m.p>
						)}
					</AnimatePresence>
				</div>
				<h2>end?</h2>
			</form>
			{that.length < 1 ? (
				<Link href='/add' className='a p-5 link font-bold capitalize text-2xl'>
					Add An Event
				</Link>
			) : (
				<Suggestions getResults={getResults} active={focused} />
			)}
		</div>
	);
};

export default Search;
