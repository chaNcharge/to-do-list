import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import Link from 'next/link'

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
        <html lang="en" suppressHydrationWarning>
            <body className={`dark:bg-black ${inter.className}`}>
                <Providers>{children}</Providers>
                <div
                    id="storage-info"
                    className="flex flex-col border p-6 text-left text-2xl space-y-6"
                >
                    <h1 className='text-5xl text-center mb-4'>Task synchronization</h1>
                    <p>
                        You can sync your tasks across different devices. This is powered by
                        the <Link href={"https://remotestorage.io/"}>remoteStorage</Link> protocol
                        and uses a third-party data storage service (which you can also host yourself to have full control over your data).
                    </p>
                    <p>
                        To get started, create an account with any remotestorage provider. <Link href={"https://5apps.com/storage"}>5apps</Link> is
                        recommended since it&apos;s free.
                    </p>
                    <p>
                        Once you&apos;ve created an account (eg. user@5apps.com), log in below:
                    </p>
                    <div id='storage-login' className='flex justify-center'></div>
                </div>
            </body>
        </html>
    )
}
