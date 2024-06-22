import { ThatContext } from '@/providers/That';
import React, { useContext } from 'react';

const Add: React.FC = () => {
	const { addThat } = useContext(ThatContext);

	return (
		<button
			className='a p-5 link font-bold capitalize text-2xl'
			aria-label='Add Event'
			onClick={() =>
				addThat({
					name: 'test',
					dates: {
						end: new Date(2024, 5, 23),
					},
				})
			}>
			Add An Event
		</button>
	);
};

export default Add;
