import React, { useContext } from 'react';
import Countdown, { CountdownRenderProps } from 'react-countdown';
import { formatDistance } from 'date-fns';
import { useHotkeys } from '@mantine/hooks';
import { ThatContext } from '@/providers/That';

interface P {
	data: That;
	changeData: React.Dispatch<React.SetStateAction<That | undefined>>;
}

const renderer = ({ days, hours, minutes, seconds, completed }: CountdownRenderProps) => {
	if (completed) {
		return <h1>Your done!</h1>;
	} else {
		return (
			<h1 className='leading-normal text-5xl sm:text-6xl md:text-7xl xl:text-8xl'>
				{days > 1 && days + (days === 1 ? ' day' : ' days')}
				{days === 1 && '1 day'} {hours > 0 && hours + (hours === 1 ? ' hour' : ' hours')}{' '}
				{days <= 10 &&
					minutes + (minutes === 1 ? ' minute ' : ' minutes ') + seconds + (seconds === 1 ? ' second' : ' seconds')}
			</h1>
		);
	}
};

const When: React.FC<P> = ({ data, changeData }) => {
	const { deleteThat } = useContext(ThatContext);
	useHotkeys([['escape', () => changeData(undefined)]]);

	const handleDelete = () => {
		deleteThat(data.id);
		changeData(undefined);
	};

	return (
		<>
			<button className='top-0 left-0 m-[5%] absolute icon z-10' onClick={() => changeData(undefined)} aria-label='Go back'>
				<svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px'>
					<path d='m368-417 157 157q19 19 19 45t-19 45q-19 18-45 18t-45-19L171-435q-9-9-14-21t-5-24q0-12 5-24t14-21l265-265q19-19 44.5-19t44.5 19q19 19 19 45t-19 45L368-543h403q26 0 44.5 18.5T834-480q0 26-18.5 44.5T771-417H368Z' />
				</svg>
			</button>
			<button className='top-0 right-0 m-[5%] absolute icon z-10' onClick={handleDelete} aria-label='Delete'>
				<svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px'>
					<path d='M269-86q-53 0-89.5-36.5T143-212v-497q-26 0-44.5-18.5T80-772q0-26 18.5-44.5T143-835h194q0-26 18.5-44.5T400-898h158q26 0 44.5 18.5T621-835h196q26 0 44.5 18.5T880-772q0 26-18.5 44.5T817-709v497q0 53-36.5 89.5T691-86H269Zm125-195q21 0 36-15t15-36v-258q0-21-15-36t-36-15q-21 0-36.5 15T342-590v258q0 21 15.5 36t36.5 15Zm173 0q21 0 36-15t15-36v-258q0-21-15-36t-36-15q-21 0-36.5 15T515-590v258q0 21 15.5 36t36.5 15Z' />
				</svg>
			</button>
			<div className='h-full w-[95%] center'>
				<div className='text-center flex justify-center items-center gap-5 flex-col'>
					{data.dates.start ? (
						<h3 className='text-[var(--text-low)]'>
							You started <span className='capitalize select-none'>{data.name}</span>{' '}
							{formatDistance(data.dates.start, new Date(), { addSuffix: true })} with
						</h3>
					) : (
						<h3>
							<span className='capitalize select-none'>{data.name}</span> will end in
						</h3>
					)}
					{data.dates.end && <Countdown date={data.dates.end} renderer={renderer} />}
					{data.dates.start && <h3 className='text-[var(--text-low)]'>left to go!</h3>}
				</div>
			</div>
		</>
	);
};

export default When;
