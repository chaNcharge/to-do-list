import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'To-Do List',
    description: 'A to-do list written in React and Next.js',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={`dark:bg-black ${inter.className}`}>
                <Providers>{children}</Providers>
            </body>
        </html>
    )
}
