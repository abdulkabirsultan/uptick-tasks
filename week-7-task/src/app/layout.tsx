import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import AuthProvider from '../lib/AuthProvider';
import { Toaster } from 'react-hot-toast';
import Navbar from '../components/ui/Navbar';
import Footer from '../components/ui/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TaskManager - Manage Your Tasks Efficiently',
  description: 'A simple and efficient task management application',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${inter.className} flex flex-col min-h-screen bg-gray-50`}
      >
        <AuthProvider>
          <Navbar />
          <main className='flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8'>
            {children}
          </main>
          <Footer />
          <Toaster position='bottom-right' />
        </AuthProvider>
      </body>
    </html>
  );
}
