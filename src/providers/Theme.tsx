'use client';

import { useColorScheme } from '@mantine/hooks';
import { createContext, useEffect, useState } from 'react';

interface ThemeValues {
	changeTheme: (to: Theme.Schemes) => void;
	theme: Theme.Themes;
}

interface P {
	children: React.ReactNode;
	font: string;
}

const initial: Theme.Themes = {
	scheme: 'system',
	value: 'dark',
};

export const ThemeContext = createContext<ThemeValues>({
	changeTheme: () => {},
	theme: initial,
});

export const ThemeProvider: React.FC<P> = ({ children, font }) => {
	const systemScheme = useColorScheme();

	const [theme, setTheme] = useState<Theme.Themes>(initial);

	useEffect(() => {
		changeTheme(systemScheme);
	}, [systemScheme]);

	const changeTheme = (to: Theme.Schemes): void => {
		if (to === 'system') {
			setTheme({ ...theme, scheme: to, value: systemScheme });
			return;
		}

		setTheme({ ...theme, scheme: to, value: to });
	};

	return (
		<ThemeContext.Provider value={{ changeTheme, theme }}>
			<body className={`mount ${theme.value} ${font}`}>{children}</body>
		</ThemeContext.Provider>
	);
};
