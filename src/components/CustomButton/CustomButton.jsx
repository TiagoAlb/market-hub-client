import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button } from 'reactstrap';

class CustomButton extends Component {
  render() {
    const { fill, simple, pullRight, round, link, color, block, ...rest } = this.props;

    const btnClasses = cx({
      'btn-fill': fill,
      'btn-simple': simple,
      'pull-right': pullRight,
      'btn-block': block,
      'btn-link': link,
      'btn-round': round
    });

    return <Button color={color} className={btnClasses} {...rest} />;
  }
}

CustomButton.propTypes = {
  active: PropTypes.bool,
  'aria-label': PropTypes.string,
  block: PropTypes.bool,
  color: PropTypes.string, 
  disabled: PropTypes.bool,
  outline: PropTypes.bool,

  tag: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
    PropTypes.shape({ $$typeof: PropTypes.symbol, render: PropTypes.func }),
    PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string,
      PropTypes.shape({ $$typeof: PropTypes.symbol, render: PropTypes.func }),
    ]))
  ]),

  // ref will only get you a reference to the Button component, use innerRef to get a reference to the DOM element (for things like focus management).
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),

  onClick: PropTypes.func,
  size: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  cssModule: PropTypes.object,

  // use close prop for BS4 close icon utility
  close: PropTypes.bool,
}

CustomButton.defaultProps = {
  color: 'secondary',
  tag: 'button',
}

export default CustomButton;
