'use client';

import React, { useContext, useState } from 'react';
import Search from './(search)/Search';
import When from './(when)/When';
import Add from './(add)/Add';
import { m } from 'framer-motion';
import { ThatContext } from '@/providers/That';
import Loader from '@/components/loader/Loader';

const Page: React.FC = () => {
	const { that } = useContext(ThatContext);
	const [loaded, setLoaded] = useState<That>();
	const [adding, setAdding] = useState(false);

	if (!that) {
		return <Loader />;
	}

	return (
		<>
			{that.length > 0 && (
				<button
					className='top-0 right-0 m-[5%] absolute z-10 icon'
					aria-label='Add'
					onClick={() => setAdding((prev) => !prev)}>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						height='24px'
						viewBox='0 -960 960 960'
						width='24px'
						className={`transition-all ${adding && 'rotate-45'}`}>
						<path d='M417-417H229q-26 0-44.5-18.5T166-480q0-26 18.5-44.5T229-543h188v-188q0-26 18.5-44.5T480-794q26 0 44.5 18.5T543-731v188h188q26 0 44.5 18.5T794-480q0 26-18.5 44.5T731-417H543v188q0 26-18.5 44.5T480-166q-26 0-44.5-18.5T417-229v-188Z' />
					</svg>
				</button>
			)}

			{adding || that.length < 1 ? (
				<div className='size-full center'>
					<Add setup={that.length < 1} />
				</div>
			) : (
				<m.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} className='size-full center'>
					{loaded ? <When data={loaded} changeData={setLoaded} /> : <Search setResult={setLoaded} />}
				</m.div>
			)}
		</>
	);
};

export default Page;
