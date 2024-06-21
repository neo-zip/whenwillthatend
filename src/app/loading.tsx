import Loader from '@/components/loader/Loader';
import React from 'react';

const Loading: React.FC = () => {
	return (
		<div className='overlay center'>
			<Loader />
		</div>
	);
};

export default Loading;
