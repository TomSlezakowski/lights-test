/* eslint-disable react/forbid-foreign-prop-types */
import React, { forwardRef, memo } from 'react';
import noop from 'no-op';

const REACT_MEMO_TYPE = memo(noop).$$typeof;
const REACT_FORWARD_REF_TYPE = forwardRef(noop).$$typeof;

const BASE_IGNORE_LIST = [
  'staticContext',
  'routeParams',
  'children',
  'location',
  'history',
  'context',
  'params',
  'routes',
  'route',
  'match',
  'slug',
  'fn'
];

function check(Component, props, ignoreData) {
  const ignoreList = BASE_IGNORE_LIST.concat(ignoreData);
  const unspecifiedProps = Object.keys(props).filter(
    (prop) => !Component.propTypes.hasOwnProperty(prop) && ignoreList.indexOf(prop) === -1
  );
  if (unspecifiedProps.length) {
    console.warn(`Component ${Component.name} has unspecified props: ${unspecifiedProps.join(', ')}`);
  }
}

function withCheckProps(Component, ignoreData = []) {
  if (process.env.NODE_ENV === 'production') return Component;

  if (
    Component.$$typeof === REACT_FORWARD_REF_TYPE ||
    (Component.$$typeof === REACT_MEMO_TYPE && Component.type.$$typeof === REACT_FORWARD_REF_TYPE)
  ) {
    return forwardRef(function (props, ref) {
      check(Component, props, ignoreData);
      return <Component {...props} ref={ref} />;
    });
  }

  return function (props) {
    check(Component, props, ignoreData);
    return <Component {...props} />;
  };
}

export default withCheckProps;
