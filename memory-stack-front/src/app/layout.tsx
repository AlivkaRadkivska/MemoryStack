import './globals.css'
import type { Metadata } from 'next'
import NotebookContainer from '@/components/notebook-container'
import { nunito } from '@/fonts/nunito'
import { getCookie } from '@/utils/cookies-factory'

export const metadata: Metadata = {
  title: 'Memory stack app',
  description: 'Our little silly application for your precious memories',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const token = await getCookie('token');

  return (
    <html lang='en'>
      <body className={nunito.className}>
        <main className='flex min-h-screen flex-col items-center justify-center bg-green'>
          <NotebookContainer authenticated={token != null}>
            {children}
          </NotebookContainer>
        </main>
      </body>
    </html>
  )
}
