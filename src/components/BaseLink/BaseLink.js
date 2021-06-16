import React, { forwardRef, memo, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types'
import Link from 'next/link'
import noop from 'no-op'

import withCheckProps from '@/utils/hoc/with-check-props';

import routes from '../../data/routes';

import styles from './BaseLink.module.scss'

const excludes = ['children', 'download', 'target', 'rel', 'link', 'onClick']

export const externalLinkRegex = /^(https:\/\/|http:\/\/|tel:|mailto:)/;
const externalSiteRegex = /^(https:\/\/|http:\/\/)/;

const BaseLink = forwardRef((props, ref) => {
  // if link exists on data/routes.js, it will be wrapped in next <Link/> component automatically
  const isRouted = useMemo(() => !!Object.values(routes).find(({ path }) => path === props.link), [props.link]);

  // clean props
  let componentProps = Object.keys(props).reduce(
    (acc, key) => ([...excludes].indexOf(key) > -1 ? acc : { ...acc, [key]: props[key] }),
    {}
  );

  componentProps.download = props.download;
  // set external link attributes
  if (externalSiteRegex.test(props.link) && !props.download) {
    componentProps.target = props.target;
    if (props.target === '_blank') {
      componentProps.rel = props.rel || 'noopener noreferrer';
    }
  }

  const handleClick = useCallback(
    (e) => {
      props.onClick(e);
    },
    [props]
  );

  // Important! If prop.className is defined, styles.BaseLink will be ignored!
  // This is the expected behavior. It allow us to use BaseLink as raw <a> element.

  return isRouted ? (
    <Link href={props.link}>
      <a ref={ref} className={styles.BaseLink} onClick={handleClick} {...componentProps}>
        {props.children}
      </a>
    </Link>
  ) : (
    <a ref={ref} className={styles.BaseLink} href={props.link} onClick={handleClick} {...componentProps}>
      {props.children}
    </a>
  );
});

BaseLink.name = 'BaseLink';

BaseLink.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  rel: PropTypes.string,
  link: PropTypes.string,
  target: PropTypes.oneOf(['_blank', '_self']),
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  download: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
  onMouseMove: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onMouseUp: PropTypes.func,
  onMouseDown: PropTypes.func,
  onTouchEnd: PropTypes.func,
  onTouchMove: PropTypes.func,
  onTouchStart: PropTypes.func,
  onClick: PropTypes.func,
  'aria-label': PropTypes.string,
  'aria-hidden': PropTypes.bool
};

BaseLink.defaultProps = {
  link: '',
  target: '_blank',
  onClick: noop
};

export default memo(withCheckProps(BaseLink));
