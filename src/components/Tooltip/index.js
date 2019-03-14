/* eslint-disable no-param-reassign */
import React, { Component } from "react";
import PropTypes from "prop-types";
import Portal from "../PopOver/PopOverPortal";
import SPACE_FROM_MOUSE from "./constants";
import PopOver from "../PopOver/index";
import { getDimensionsFromEvent, getArrowAdjustmentFromPosition } from './utils';
import {
  DIRECTIONS,
  TOP,
  LEFT,
  RIGHT,
  BOTTOM,
  VARIANTS,
  LIGHT,
  AUTO,
} from "../constants";
import Tooltip from "./Tooltip";

class TooltipContainer extends Component {
  state = {
    actualDirection: this.props.direction,
    arrowAdjustment: 0
  };

  /*
  * Static function that needs to be called from the parent -> Tooltip.getDimensionsFromEvent
  * The parent should pass the click event which will trigger showing the Tooltip.
  * By default the Tooltip is shown withing the view port. If we need to show it inside
  * certain element we should pass the html element as second parameter.
  * The function will return an object that should be provided to the Tooltip as props.
  */
  static getDimensionsFromEvent = getDimensionsFromEvent;

  getPositionAndUpdateDirection = ({
    position,
    width,
    height,
    spaceFromMouse,
    reduce
  }) => {
    const { windowScroll, windowWidth, windowHeight } = position;
    const result = PopOver.calculatePosition({
      position,
      dimensions: {
        width,
        height,
        windowScroll,
        windowWidth,
        windowHeight
      },
      spaceFromMouse,
      reduce
    });
    const { actualDirection, arrowAdjustment } = this.state;
    
    const adjustment = getArrowAdjustmentFromPosition({
      coords: { x: result.x, width },
      position
    });
    console.log('on enter'); // eslint-disable-line

    if (
      result.y < position.elTop + windowScroll &&
      (actualDirection !== TOP || arrowAdjustment !== adjustment)
    ) {
      this.setState({ actualDirection: TOP, arrowAdjustment: adjustment });
    } else if (
      result.y > position.elTop + windowScroll &&
      (actualDirection !== BOTTOM || arrowAdjustment !== adjustment)
    ) {
      this.setState({ actualDirection: BOTTOM, arrowAdjustment: adjustment });
    }
    return result;
  };


  /*
   * Function that determines Tooltip position.
   * @position(object) - top and bottom position of the elemt that triggers showing Tooltip;
   * Mouse horizontal position on the sreen - so we can center the Tooltip;
   * Additional container position and size
   * @size(object) - Tooltip width and height;
   */
  calculatePosition = ({
    direction,
    position,
    spaceFromMouse,
    reduce,
    height,
    width
  }) => {
    const {
      elBottom,
      elTop,
      elLeft,
      elRight,
      elHorizontalCenter,
      windowScroll
    } = position;

    const bottomPosition = elBottom + SPACE_FROM_MOUSE;
    const topPosition = elTop - SPACE_FROM_MOUSE - height + windowScroll;

    switch (direction) {
      case TOP:
        return {
          x: elHorizontalCenter - width / 2,
          y: topPosition
        };
      case BOTTOM:
        return {
          x: elHorizontalCenter - width / 2,
          y: bottomPosition + windowScroll
        };
      case LEFT:
        return {
          x: elLeft - width - SPACE_FROM_MOUSE,
          y: elTop + windowScroll
        };
      case RIGHT:
        return {
          x: elRight + SPACE_FROM_MOUSE,
          y: elTop + windowScroll
        };
      default:
        return this.getPositionAndUpdateDirection({
          position,
          spaceFromMouse,
          reduce,
          width,
          height
        });
    }
  };

  tooltipEnter = node => {
    const {
      isVisible,
      position,
      direction,
      spaceFromMouse,
      reduceTop,
      reduceBottom
    } = this.props;

    if (!isVisible) {
      return;
    }

    const reduce = { top: reduceTop, bottom: reduceBottom };
    const { clientWidth, clientHeight } = node;

    const { y, x } = this.calculatePosition({
      direction,
      position,
      width: clientWidth,
      height: clientHeight,
      spaceFromMouse,
      reduce
    });

    node.style.top = `${y}px`;
    node.style.left = `${x}px`;
  };

  render() {
    const { direction, children, ...rest } = this.props;
    const { actualDirection, arrowAdjustment } = this.state;

    return (
      <Portal>
        <Tooltip
          {...rest}
          direction={actualDirection}
          arrowAdjustment={arrowAdjustment}
          onEnter={this.tooltipEnter}
        >
          {children}
        </Tooltip>
      </Portal>
    );
  }
}

TooltipContainer.propTypes = {
  children: PropTypes.node.isRequired,
  isVisible: PropTypes.bool,
  direction: PropTypes.oneOf(DIRECTIONS),
  position: PropTypes.shape({
    elHorizontalCenter: PropTypes.number,
    elVerticalCenter: PropTypes.number,
    elTop: PropTypes.number,
    elBottom: PropTypes.number,
    elLeft: PropTypes.number
  }),
  variant: PropTypes.oneOf(VARIANTS),
  spaceFromMouse: PropTypes.number,
  reduceTop: PropTypes.number,
  reduceBottom: PropTypes.number
};

TooltipContainer.defaultProps = {
  isVisible: false,
  direction: AUTO,
  variant: LIGHT,
  position: {
    mouseX: 0,
    elTop: 0,
    elBottom: 0,
    offsetTop: 0,
    clientHeight: 0,
    offsetLeft: 0,
    clientWidth: 0,
    windowScroll: 0,
    windowWidth: 0,
    windowHeight: 0
  },
  spaceFromMouse: SPACE_FROM_MOUSE,
  reduceTop: 0,
  reduceBottom: 0
};

export default TooltipContainer;
