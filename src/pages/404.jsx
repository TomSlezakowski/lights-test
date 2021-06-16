import copy from '@/utils/copy'
//import Head from '@/components/head/Head'

import BaseLink from '@/components/BaseLink/BaseLink'

import styles from './404.module.scss'

export default function Error() {
  return (
    <main className={styles.Custom404}>
      {/* <Head title={copy('404.title')} /> */}
      <div className={styles.contentContainer}>
        <h1 className={styles.eyebrow}>{copy('404.title')}</h1>
        <p className={styles.heading}>{copy('404.subtitle')}</p>
        <p className={styles.content}>{copy('404.content')}</p>
        <BaseLink className={styles.link} link={copy('404.cta.link')}>
          {copy('404.cta.text')}
        </BaseLink>
      </div>
    </main>
  )
}
