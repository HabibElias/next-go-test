import type { Metadata } from 'next'
import { Header } from '@/components/App'
import Footer from '@/components/App/Footer'
import './globals.css'

export const metadata: Metadata = {
  title: 'Todo App',
  description: 'A next application for inserting your todos',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className="font-[poppins] antialiased container mx-auto p-4"
      >
        <Header />
        <div>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}
