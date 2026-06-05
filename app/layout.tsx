import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Megan Riel-Mehan',
  description: 'Scientific visualization, research & fine art — making the invisible legible.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="app">
          <Nav />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
}
