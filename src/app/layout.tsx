import type { Metadata } from 'next'
import './globals.css'
import LayoutClient from './layoutClient'

export const metadata: Metadata = {
  title: 'GigAgent',
  description: 'The marketplace for the agentic era.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-void text-white selection:bg-primary selection:text-white">
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  )
}
