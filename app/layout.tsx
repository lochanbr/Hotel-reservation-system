import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'StayEase | Premium Hotel Booking',
  description: 'Find your perfect stay with StayEase, the elegant hotel booking experience.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
