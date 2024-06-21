import React, { useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';

interface P {
	children: React.ReactNode;
	content: React.ReactNode;
}

const Tooltip: React.FC<P> = ({ children, content }) => {
	const [open, setOpen] = useState(false);
	const uuid = Math.random();

	return (
		<div onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
			<AnimatePresence>
				{open && (
					<m.div
						key={uuid}
						initial={{ opacity: 0, y: 25 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0 }}
						className='tooltip'>
						{content}
					</m.div>
				)}
				{children}
			</AnimatePresence>
		</div>
	);
};

export default Tooltip;
