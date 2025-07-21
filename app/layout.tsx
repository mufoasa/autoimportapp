import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AutoImport',
  description: 'AutoImport — Fast & accurate car import cost calculator for Europe.',
  generator: 'AUTOIMPORT.APP',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
