import type { Metadata, Viewport } from 'next'
import { Poppins } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { LeadModalProvider } from '@/components/13-lead-modal'
import './globals.css'

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'RX Digital - Radiologia Odontológica | Marabá - PA',
  description: 'Radiologia odontológica com alta precisão em Marabá e região. Tomografia Cone Beam, radiografias digitais e documentação ortodôntica com tecnologia de ponta e atendimento humanizado.',
  keywords: 'radiologia odontológica, tomografia cone beam, raio x dental, documentação ortodôntica, marabá, pará',
  generator: 'v0.app',
  icons: {
    icon: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/favicon-yiAXINo4xAlQ44byTQMyGhrztsVa2h.png',
    apple: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/favicon-yiAXINo4xAlQ44byTQMyGhrztsVa2h.png',
  },
  openGraph: {
    title: 'RX Digital - Radiologia Odontológica | Marabá - PA',
    description: 'Exames digitais, tomografia (Cone Beam) e documentação ortodôntica com agilidade, tecnologia e atendimento humanizado.',
    type: 'website',
    locale: 'pt_BR',
  },
}

export const viewport: Viewport = {
  themeColor: '#0f172a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5B3C9R5G');`,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body className={`${poppins.variable} font-sans antialiased`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5B3C9R5G"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <LeadModalProvider>
          {children}
        </LeadModalProvider>
        <Analytics />
      </body>
    </html>
  )
}
