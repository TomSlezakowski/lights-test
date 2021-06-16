import useStore from '@/helpers/store'
import dynamic from 'next/dynamic'
import SocialLinks from '@/components/SocialLinks/SocialLinks'
import copy from '@/utils/copy'

import styles from './index.module.scss'
import routes from '@/data/routes'

const HomeScene = dynamic(() => import('@/scenes/Home'), {
  ssr: false,
})

const Page = ({ title }) => {
  useStore.setState({ title })
  return (
    <>
      <div className={styles.HomePage}>
        <SocialLinks content={[...copy('social')]} />
      </div>
      <HomeScene r3f />
    </>
  )
}

export default Page
