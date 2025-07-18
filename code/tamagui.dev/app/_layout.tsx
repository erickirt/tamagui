import '@tamagui/core/reset.css'
import '~/app.css'
import '~/tamagui.css'

import { LoadProgressBar, Slot, Stack, usePathname } from 'one'
import { isWeb, setupPopper } from 'tamagui'
import { HeadInfo } from '~/components/HeadInfo'
import { Providers } from '../components/Providers'

// for navigation container props
//           theme: {
//             dark: true,
//             colors: {
//               primary: 'rgb(0, 122, 255)',
//               background: 'transparent',
//               card: 'rgb(255, 255, 255)',
//               text: 'rgb(28, 28, 30)',
//               border: 'rgb(216, 216, 216)',
//               notification: 'rgb(255, 59, 48)',
//             },
//           },
//         } as any

setupPopper({
  // prevents a reflow on mount
  disableRTL: true,
})

export default function Layout() {
  const pathname = usePathname()

  return (
    <html lang="en-US">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />

        <link rel="icon" href="/favicon.png" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="docsearch:language" content="en" />
        <meta name="docsearch:version" content="1.0.0,latest" />
        <meta id="theme-color" name="theme-color" />
        <meta name="color-scheme" content="light dark" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@tamagui_js" />
        <meta name="twitter:creator" content="@natebirdman" />
        <meta name="robots" content="index,follow" />

        <link crossOrigin="anonymous" href="/fonts/berkeley.css" rel="stylesheet" />
        <link
          rel="stylesheet preload prefetch"
          href="/fonts/berkeley.woff2"
          as="font"
          crossOrigin="anonymous"
          type="font/woff2"
          // @ts-ignore
          precedence="default"
        />

        <link crossOrigin="anonymous" href="/fonts/inter-700.css" rel="stylesheet" />
        <link
          rel="stylesheet preload prefetch"
          href="/fonts/Inter-ExtraBold.woff2"
          as="font"
          crossOrigin="anonymous"
          type="font/woff2"
          // @ts-ignore
          precedence="default"
        />

        <link
          crossOrigin="anonymous"
          href="/fonts/inter-400.css"
          rel="stylesheet" // @ts-ignore
          precedence="default"
        />
        <link
          crossOrigin="anonymous"
          rel="stylesheet preload prefetch"
          href="/fonts/Inter-Regular.woff2"
          as="font"
          type="font/woff2"
          // @ts-ignore
          precedence="default"
        />

        <link
          crossOrigin="anonymous"
          href="/fonts/silkscreen.css"
          rel="stylesheet" // @ts-ignore
          precedence="default"
        />
        <link
          crossOrigin="anonymous"
          rel="stylesheet preload prefetch"
          href="/fonts/slkscr.woff2"
          as="font"
          type="font/woff2"
          // @ts-ignore
          precedence="default"
        />
        {!pathname.startsWith('/theme/') && (
          <HeadInfo
            openGraph={{
              type: 'website',
              locale: 'en_US',
              url: 'https://tamagui.dev',
              siteName: 'Tamagui',
              images: [
                {
                  url: 'https://tamagui.dev/social.png',
                },
              ],
            }}
          />
        )}
      </head>

      <body
      // className={isIndex ? 'transition' : ''}
      >
        <LoadProgressBar />

        <Providers>
          {isWeb ? (
            <Slot />
          ) : (
            <Stack
              screenOptions={
                isWeb
                  ? {
                      header() {
                        return null
                      },

                      contentStyle: {
                        position: 'relative',
                        backgroundColor: 'red',
                      },
                    }
                  : {}
              }
            />
          )}
        </Providers>
      </body>
    </html>
  )
}
