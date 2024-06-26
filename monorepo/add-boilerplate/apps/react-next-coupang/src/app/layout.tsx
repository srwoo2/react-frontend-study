import ToastProvider from '@/components/toastProvider/ToastProvider'
import './globals.css'
import '@monorepo-library/common/style.css'
import { Inter } from 'next/font/google'
import Footer from '@/layouts/footer/Footer'
import Header from '@/layouts/header/Header'
import Provider from '@/redux/provider'
import NavbarProvider from '@/layouts/navbar/NavbarProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Provider>
          <Header />
          <ToastProvider />
          <NavbarProvider>{children}</NavbarProvider>
          <Footer />
        </Provider>
      </body>
    </html>
  )
}
