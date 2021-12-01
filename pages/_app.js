import React, {useEffect, useState} from 'react'
import { Layout } from '../components'

//dark theme
import {ThemeProvider} from 'next-themes'

import 'tailwindcss/tailwind.css'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  return(
    <ThemeProvider enableSystem={true} attribute="class">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}

export default MyApp
