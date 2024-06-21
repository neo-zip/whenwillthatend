'use client';

import { ThatContext } from '@/providers/That';
import React, { useContext } from 'react';
import Marquee from 'react-fast-marquee';
import { m } from 'framer-motion';

interface P {
	getResults: (input: string) => void;
	active: boolean;
}

const Suggestions: React.FC<P> = ({ getResults, active }) => {
	const { that } = useContext(ThatContext);

	return (
		<div className='w-[100vw] max-w-full'>
			<Marquee
				autoFill
				pauseOnHover
				style={{
					maskImage:
						'linear-gradient(to right, rgba(0, 0, 0, 0) 15%, rgb(0, 0, 0) 50%, rgb(0, 0, 0) 50%, rgba(0, 0, 0, 0) 85%)',
				}}>
				{that.map((item, i) => {
					return (
						<button
							role='button'
							className={`mx-1 md:mx-5 p-5 link font-bold capitalize text-2xl ${active && 'underline'}`}
							onClick={() => getResults(item.name)}
							key={i}>
							{item.name}
						</button>
					);
				})}
			</Marquee>
		</div>
	);
};

export default Suggestions;
