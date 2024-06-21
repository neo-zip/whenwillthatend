import type { Metadata } from 'next';
import { Mukta } from 'next/font/google';
import { ThemeProvider } from '@/providers/Theme';
import { ThatProvider } from '@/providers/That';
import Animations from '@/lib/animations/lazy';
import '@/styling/globals.css';

export const metadata: Metadata = {
	title: 'When will that end',
	description: 'A countdown for whatever it is that you want.',
	keywords: ['time', 'school', 'timer', 'calendar', 'countdown', 'date'],
};

const font = Mukta({ weight: ['400', '800'], subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<ThemeProvider font={font.className}>
				<ThatProvider>
					<Animations>{children}</Animations>
				</ThatProvider>
			</ThemeProvider>
		</html>
	);
}
