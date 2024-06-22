'use client';

import { ThatContext } from '@/providers/That';
import React, { useContext, useState } from 'react';
import { m } from 'framer-motion';

const animations = {
	visible: { opacity: 1, x: 0 },
	hidden: { opacity: 0, x: 500 },
};

interface P {
	setup: boolean;
}

const Add: React.FC<P> = ({ setup }) => {
	const { addThat } = useContext(ThatContext);
	const [slide, setSlide] = useState(0);
	const [data, setData] = useState<Partial<That>>();
	const [value, setValue] = useState<Date | null>(null);

	const handleContinue = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setSlide((self) => self + 1);
	};

	console.log(data);

	const slides = [
		<form onSubmit={(e) => handleContinue(e)}>
			<m.div
				initial='hidden'
				animate='visible'
				variants={animations}
				className='flex flex-col gap-5'
				transition={{ ease: 'anticipate', duration: 0.5 }}>
				<h2 className='space-m'>
					{setup ? 'Name your first event' : "What's the name?"}
					<span className='text-red-500'>*</span>
				</h2>
				<input
					className='input'
					type='text'
					maxLength={50}
					placeholder='Lovely Summer Break...'
					defaultValue={data?.name}
					onChange={(e) => setData({ ...data, name: e.currentTarget.value })}
				/>
			</m.div>
		</form>,
		<m.form
			initial='hidden'
			animate='visible'
			variants={animations}
			transition={{ ease: 'anticipate', duration: 0.5 }}
			onSubmit={(e) => handleContinue(e)}>
			<div className='flex flex-col gap-5'>
				<h2 className='space-m'>When does it start?</h2>
				<div className='flex gap-5 justify-between'>
					<input
						className='w-full'
						type='datetime-local'
						onChange={(e) => setData({ ...data, dates: { start: new Date(e.currentTarget.value) } })}
					/>
					<button className='button'>{data?.dates?.start ? 'Okay' : 'Skip'}</button>
				</div>
			</div>
		</m.form>,
		<form onSubmit={(e) => handleContinue(e)}>
			<m.div
				initial='hidden'
				animate='visible'
				variants={animations}
				transition={{ ease: 'anticipate', duration: 0.5 }}
				className='flex flex-col gap-5'>
				<h2 className='space-m'>
					When does it end?<span className='text-red-500'>*</span>
				</h2>
				<div className='flex gap-5 justify-between'>
					<input
						className='w-full'
						type='datetime-local'
						onChange={(e) => setData({ ...data, dates: { end: new Date(e.currentTarget.value) } })}
					/>
					<button className={`button ${!data?.dates?.end && 'disabled'}`} disabled={!data?.dates?.end}>
						Okay
					</button>
				</div>
			</m.div>
		</form>,
	];

	return (
		<m.div
			initial={{ opacity: 0, scale: 0.5 }}
			animate={{ opacity: 1, scale: 1 }}
			className='w-[95%] lg:w-1/2 md:h-1/4 p-10 bg-[var(--bg-low)] rounded-xl overflow-hidden'>
			<p className='label mb-5'>{setup ? "Let's set you up" : "You're adding an event"}</p>
			{slide >= 1 && (
				<button className='icon absolute z-20 top-0 right-0 m-[5%]' onClick={() => setSlide((self) => self - 1)}>
					<svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px'>
						<path d='m368-417 157 157q19 19 19 45t-19 45q-19 18-45 18t-45-19L171-435q-9-9-14-21t-5-24q0-12 5-24t14-21l265-265q19-19 44.5-19t44.5 19q19 19 19 45t-19 45L368-543h403q26 0 44.5 18.5T834-480q0 26-18.5 44.5T771-417H368Z' />
					</svg>
				</button>
			)}
			{slides[slide]}
		</m.div>
	);
};

export default Add;
