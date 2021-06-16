import useStore from '@/helpers/store'
import dynamic from 'next/dynamic'
import SocialLinks from '@/components/SocialLinks/SocialLinks'
import copy from '@/utils/copy'

import styles from './index.module.scss'
import routes from '@/data/routes'

const TestShader = dynamic(() => import('@/examples/canvas/test_shader'), {
  ssr: false,
})

const Page = ({ title }) => {
  useStore.setState({ title })
  return (
    <>
      <div className={styles.HomePage}>
        <SocialLinks content={[...copy('social')]} />
      </div>
      <TestShader r3f route='/tester' />
    </>
  )
}

export default Page
