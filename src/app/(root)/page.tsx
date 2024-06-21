'use client';

import React, { useState } from 'react';
import Search from './search/Search';
import When from './when/When';

const Page: React.FC = () => {
	const [loaded, setLoaded] = useState<That>();

	return <>{loaded ? <When data={loaded} changeData={setLoaded} /> : <Search setResult={setLoaded} />}</>;
};

export default Page;
