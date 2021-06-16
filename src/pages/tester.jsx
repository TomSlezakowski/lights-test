import useStore from '@/helpers/store'
import dynamic from 'next/dynamic'
import Instructions from '@/components/dom/instructions'
import Canvas from '@/components/Canvas/Canvas'
import SocialLinks from '@/components/SocialLinks/SocialLinks'
import copy from '@/utils/copy'

import styles from './index.module.scss'

const TestShader = dynamic(() => import('@/examples/canvas/test_shader'), {
  ssr: false,
})

const Tester = ({ title }) => {
  useStore.setState({ title })
  return (
    <>
      <div className={styles.HomePage}>
        <SocialLinks content={[...copy('social')]} />
      </div>
      <TestShader r3f route='/' />
    </>
  )
}

export default Tester
