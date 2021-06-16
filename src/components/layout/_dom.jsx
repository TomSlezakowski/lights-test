import useStore from '@/helpers/store'
// import Head from 'next/head'
import { useRef } from 'react'

// const HeaderRouteTitle = () => {
//   const title = useStore((state) => state.title)
//   return (
//     <Head>
//       <title>{title}</title>
//     </Head>
//   )
// }

const DOM = ({ children }) => {
  const ref = useRef(null)
  useStore.setState({ dom: ref })
  return (
    <div ref={ref}>
      {/* <HeaderRouteTitle /> */}
      {children}
    </div>
  )
}

export default DOM
