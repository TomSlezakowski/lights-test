import { useRouter } from 'next/router'
import useStore from '@/helpers/store'
import { useEffect, Children } from 'react'
import Head from '@/components/head/Head'
import dynamic from 'next/dynamic'
import Dom from '@/components/layout/_dom'

import '../styles/global.scss'

let LCanvas = null
if (process.env.NODE_ENV === 'production') {
  LCanvas = dynamic(() => import('@/components/Canvas/Canvas'), {
    ssr: false,
  })
} else {
  LCanvas = require('@/components/Canvas/Canvas').default
}

function Layout({ dom }) {
  return (
    <>
      <Head />
      {dom && <Dom>{dom}</Dom>}
    </>
  )
}

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  let r3fArr = []
  let compArr = []

  Children.forEach(Component(pageProps).props.children, (child) => {
    if (child.props && child.props.r3f) {
      r3fArr.push(child)
    } else {
      compArr.push(child)
    }
  })

  useEffect(() => {
    useStore.setState({ router })
  }, [router])

  return (
    <>
      {compArr && <Layout dom={compArr} />}
      {r3fArr && <LCanvas>{r3fArr}</LCanvas>}
    </>
  )
}

export default MyApp
