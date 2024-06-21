'use client';

import React, { useState } from 'react';
import Search from './search/Search';
import When from './when/When';
import { m } from 'framer-motion';

const Page: React.FC = () => {
	const [loaded, setLoaded] = useState<That>();

	return (
		<m.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} className='size-full center'>
			{loaded ? <When data={loaded} changeData={setLoaded} /> : <Search setResult={setLoaded} />}
		</m.div>
	);
};

export default Page;
