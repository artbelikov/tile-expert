import type { Metadata } from 'next';
import { Bebas_Neue, Quicksand } from 'next/font/google';
import './globals.css';
import { Providers } from '@/app-layer/providers';
import { CompoundBackground } from '@/shared/ui/CompoundBackground';
import { Footer } from '@/shared/ui/Footer';
import { Header } from '@/widgets/header';

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
});

const quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--font-quicksand',
});

export const metadata: Metadata = {
  title: 'The Artisan Kiln | Ceramic Tile Design & Order',
  description: 'Customize your ceramic tile layouts and purchase artisanal tiles online.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${quicksand.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-ink">
        <Providers>
          <Header />
          <main className="flex-1 max-w-container mx-auto w-full flex flex-col">
            <CompoundBackground>
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex-grow z-0">{children}</div>
                <Footer />
              </div>
            </CompoundBackground>
          </main>
        </Providers>
      </body>
    </html>
  );
}
