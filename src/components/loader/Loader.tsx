'use client';

import React, { useEffect, useState } from 'react';
import styles from './loader.module.css';

const Loader: React.FC = () => {
	const [status, setStatus] = useState<'loading' | 'question' | 'snapped'>('loading');

	useEffect(() => {
		const question = setTimeout(() => {
			setStatus('question');
		}, 3000);

		const snapped = setTimeout(() => {
			setStatus('snapped');
		}, 10000);

		return () => {
			clearTimeout(question);
			clearTimeout(snapped);
		};
	}, []);

	return (
		<div className='full center'>
			{status === 'snapped' && (
				<div className={styles.status}>
					<p className='Error'>We&apos;re sorry! It&apos;s been a while.</p>
					<button className='link' aria-label='Refresh Page' onClick={() => window?.location?.reload()}>
						Refresh Page?
					</button>
				</div>
			)}
			{status === 'question' && (
				<div className={styles.status}>
					<p className='label'>It&apos;s taking a long time to load.</p>
					<p>Maybe check your connection</p>
				</div>
			)}
			<div className={styles.loader}>
				<div />
				<div />
				<div />
				<div />
			</div>
		</div>
	);
};

export default Loader;
