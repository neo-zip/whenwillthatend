import Link from 'next/link';

export default function NotFound() {
	return (
		<div className='size-full center'>
			<div className='h-full w-[90%] center'>
				<h1 className='text-[50vw] leading-[50vh] absolute opacity-10 z-10 font-black select-none'>404</h1>
				<div className='flex items-center flex-col gap-5 z-20'>
					<h2 className='text-2xl md:max-w-[60%] text-center'>We couldn&apos;t find the page you&apos;re looking for.</h2>
					<Link aria-label='Go to home' className='button' href='/'>
						Return Home
					</Link>
				</div>
			</div>
		</div>
	);
}
