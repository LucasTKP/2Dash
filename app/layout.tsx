import './globals.css'
import { Inter, Jost, Poiret_One } from '@next/font/google';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import FacebookPixel from '@/components/FacebookPixel';

const inter = Inter({
  variable: '--font-inter',
  display: 'optional',
  weight: ['100', '200', '300', '400', '500', '600',],
  subsets: ['latin',]
});

const jost = Jost({
  variable: '--font-jost',
  display: 'optional',
  weight: ['100', '200', '300', '400', '500', '600'],
  subsets: ['latin']
});

const poiret = Poiret_One({
  variable: '--font-poiret',
  display: 'optional',
  weight: '400',
  subsets: ['latin']
});

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${jost.variable} ${poiret.variable} scroll-smooth`}>
      <head />
      <body className='bg-neutral-800 font-inter text-white'>
          {children}
          <GoogleAnalytics />
          <FacebookPixel />
      </body>
    </html>
  )
}
