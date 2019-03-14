import React from "react";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";
import { StyledTooltip } from "./Tooltip.styles";
import {
  DIRECTIONS,
  VARIANTS,
  LIGHT,
  AUTO,
} from "../constants";

const Tooltip = props => {
  const {
    children,
    isVisible,
    onEnter,
    variant,
    direction,
    arrowAdjustment,
  } = props;
  return (
    <CSSTransition
      in={isVisible}
      key="tooltip-animation"
      timeout={{
        enter: 300,
        exit: 100,
      }}
      classNames="open"
      onEnter={onEnter}
      variant={variant}
      appear={isVisible}
      unmountOnExit
    >
      <StyledTooltip
        direction={direction}
        arrowAdjustment={`${arrowAdjustment}px`}
      >
        {children}
      </StyledTooltip>
    </CSSTransition>
  );
};

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  onEnter: PropTypes.func.isRequired,
  isVisible: PropTypes.bool,
  direction: PropTypes.oneOf(DIRECTIONS),
  variant: PropTypes.oneOf(VARIANTS),
  arrowAdjustment: PropTypes.number,
};

Tooltip.defaultProps = {
  isVisible: false,
  direction: AUTO,
  variant: LIGHT,
  arrowAdjustment: 0,
};

export default Tooltip;
