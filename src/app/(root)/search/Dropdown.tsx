'use client';

import { ThatContext } from '@/providers/That';
import React, { useContext } from 'react';
import { m } from 'framer-motion';

interface P {
	getResults: (input?: string) => void;
}

const Dropdown: React.FC<P> = ({ getResults }) => {
	const { that } = useContext(ThatContext);

	return (
		<m.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className='top-[125%] transition-opacity absolute w-full bg-[var(--bg-low)] p-5 rounded-xl flex flex-col gap-5 z-10'>
			{that.map((item, i) => {
				return (
					<button onClick={() => getResults(item.name)} key={i}>
						{item.name}
					</button>
				);
			})}
		</m.div>
	);
};

export default Dropdown;
