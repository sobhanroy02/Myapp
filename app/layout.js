import './globals.css'
import Providers from '../components/Providers'
import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'
import SWRegister from '../components/SWRegister'
import InstallPrompt from '../components/InstallPrompt'

export const metadata = {
  title: 'CitiZen',
  description: 'Bridging Citizens and Governments for Smarter Living',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icons/icon-192x192.png" />
        <link rel="apple-touch-icon" sizes="192x192" href="/icons/icon-192x192.png" />
        <meta name="theme-color" content="#06b6d4" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        {/* Set initial theme before hydration to avoid flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                try {
                  var ls = localStorage.getItem('theme');
                  var mq = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var theme = ls ? ls : (mq ? 'dark' : 'light');
                  var html = document.documentElement;
                  if (theme === 'dark') { html.classList.add('dark'); }
                  else { html.classList.remove('dark'); }
                  html.setAttribute('data-theme', theme);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-200">
        <Providers>
          <SiteHeader />
          <main className="min-h-[70vh] w-full">{children}</main>
          <SiteFooter />
          <SWRegister />
          <InstallPrompt />
        </Providers>
      </body>
    </html>
  )
}
