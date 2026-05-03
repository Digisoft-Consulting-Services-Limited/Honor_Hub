import './global.css';

import { Providers } from './providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
<html lang="en">
  <head>
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Honor Hub - A digital memorial platform to celebrate and preserve the legacy of your loved ones." />
    <meta name="keywords" content="memorial, tribute, legacy, honor, remembrance" />
    <meta name="author" content="Honor Hub" />
    <meta property="og:title" content="Honor Hub" />
    <meta property="og:description" content="A digital memorial platform to celebrate and preserve the legacy of your loved ones." />
    <meta property="og:type" content="website" />
    <title>Honor Hub</title>
  </head>
  <body>
    <Providers>{children}</Providers>
  </body>
</html>
  )
}
