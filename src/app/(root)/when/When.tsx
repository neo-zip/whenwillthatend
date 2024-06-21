import React from 'react';
import Countdown, { CountdownRenderProps } from 'react-countdown';

interface P {
	data: That;
	changeData: React.Dispatch<React.SetStateAction<That | undefined>>;
}

const renderer = ({ days, hours, minutes, seconds, completed }: CountdownRenderProps) => {
	if (completed) {
		return <h1>Your done!</h1>;
	} else {
		return (
			<h1>
				{days > 1 && days + (days === 1 ? ' day' : ' days')}
				{days === 1 && '1 day'} {days >= 1 || (hours > 0 && hours + (hours === 1 ? ' hour' : ' hours'))}{' '}
				{days <= 10 &&
					minutes + (minutes === 1 ? ' minute ' : ' minutes ') + seconds + (seconds === 1 ? ' second' : ' seconds')}
			</h1>
		);
	}
};

const When: React.FC<P> = ({ data, changeData }) => {
	return (
		<div className='size-full center'>
			<button className='top-0 left-0 p-[2%] absolute link' onClick={() => changeData(undefined)}>
				return
			</button>
			<div className='text-center flex justify-center items-center gap-5 flex-col'>
				<h3>
					<span className='capitalize select-none'>{data.name}</span> will end in
				</h3>
				{data.dates.start && <h1>{data.dates.start.getDate()}</h1>}
				{data.dates.end && <Countdown date={data.dates.end} renderer={renderer} />}
			</div>
		</div>
	);
};

export default When;
