import React, { memo } from 'react'
import PropTypes from 'prop-types'
import BaseLink from '@/components/BaseLink/BaseLink'
import withCheckProps from '@/utils/hoc/with-check-props'

import styles from './SocialLinks.module.scss'

const SocialLinks = ({ content }) => {
  const renderIcon = (Icon) => {
    return typeof Icon === 'function' ? <Icon /> : Icon
  }
  return (
    <div className={styles.SocialLinks}>
      {content.map(({ href, title, icon }, index) => (
        <BaseLink key={index} link={href} title={title}>
          {renderIcon(icon)}
        </BaseLink>
      ))}
    </div>
  )
}

SocialLinks.propTypes = {
  content: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string,
      title: PropTypes.string,
      icon: PropTypes.oneOf(PropTypes.string, PropTypes.func),
    })
  ),
}

export default memo(withCheckProps(SocialLinks))
