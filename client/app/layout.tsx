import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { getServerSession } from 'next-auth';
import './globals.css';
import Logout from './logout';
import { NextAuthProvider } from './provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next Directus',
  description:
    'A simple nextjs auth application with Nextjs, Next Auth and Directus',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <NextAuthProvider>
      <html lang="en">
        <body className={inter.className}>
          <nav>{!!session && <Logout />}</nav>
          {children}
        </body>
      </html>
    </NextAuthProvider>
  );
}
