import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import Footer from '../components/Footer'
import Header, { MobileHeader } from '../components/Header'

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'
import { formDevtoolsPlugin } from '@tanstack/react-form-devtools'

import appCss from '../styles.css?url'

import { useEffect } from 'react'
import type { QueryClient } from '@tanstack/react-query'
import type { CartContext, UserContext, NoticeContext } from '../integrations/tanstack-query/root-provider'
import { syncLoggedInUserFromStorage, useNotice } from '../integrations/tanstack-query/root-provider'

import { AnimatePresence } from 'framer-motion';
import Notice from '../components/Notice';

interface MyRouterContext {
  queryClient: QueryClient
  userContext: UserContext
  cartContext: CartContext
  noticeContext: NoticeContext
}

const THEME_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem('theme');var mode=(stored==='light'||stored==='dark'||stored==='auto')?stored:'auto';var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var resolved=mode==='auto'?(prefersDark?'dark':'light'):mode;var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(resolved);if(mode==='auto'){root.removeAttribute('data-theme')}else{root.setAttribute('data-theme',mode)}root.style.colorScheme=resolved;}catch(e){}})();`

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    syncLoggedInUserFromStorage()
  }, [])
  const notice = useNotice()
  const thisWindow = typeof window !== 'undefined' ? window : null;
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <HeadContent />
      </head>
      <body className="min-h-screen flex flex-col">
          {/* <Header /> */}
          {thisWindow?.screen.width! > 768 ? <Header /> : <MobileHeader />}
          <AnimatePresence>
            {notice && <Notice notice={notice} />}
          </AnimatePresence>
                {children}
          <Footer />
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
            formDevtoolsPlugin(),
            TanStackQueryDevtools,
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
