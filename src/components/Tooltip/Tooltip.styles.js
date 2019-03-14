import styled from "styled-components";
import { themes, constants, spacing, typography } from "../../theme";
import { popContainersBoxShadow } from "../../theme/constants";
import {
  TOP,
  LEFT,
  RIGHT,
  BOTTOM,
  LIGHT,
  DARK,
  LARGE,
  ARROW_WIDTH
} from "../constants";

export const StyledTooltip = styled.div`
  background-color: ${({ variant }) =>
    variant === DARK ? themes.global.darkFill : themes.global.white.base};
  border: ${({ variant }) =>
    variant === DARK
      ? `1px solid ${themes.global.darkFill}`
      : `1px solid ${themes.global.gray02}`};
  border-radius: ${constants.borderRadius.large};
  box-shadow: ${popContainersBoxShadow};
  position: absolute;
  max-width: 260px;
  color: ${({ variant }) =>
    variant === DARK ? themes.global.white.base : themes.global.gray01};
  padding: ${spacing.cozy};
  font-size: ${typography.size.uno};
  opacity: 0;

  /* pseudoelement should fade in faster and fade out slower than tooltip */
   :before {
    content: "";
    position: absolute;
    opacity: 0;
    display: inline-block;
    border-right: ${({ variant }) =>
      variant === LIGHT ? `1px solid ${themes.global.gray02}` : ""};
    border-bottom: ${({ variant }) =>
      variant === LIGHT ? `1px solid ${themes.global.gray02}` : ""};
    border-top-left-radius: 100%;
    width: 12px;
    height: 12px;
    transform: translateY(-50%) rotate(-135deg);
    background-color: ${({ variant }) =>
      variant === DARK ? themes.global.darkFill : themes.global.white.base};
  }

  &.open-appear,
  &.open-enter {
    transition: opacity 300ms ${constants.easing.easeOutQuad},
      transform 300ms ${constants.easing.easeOutQuad};
  }

  &.open-appear:before,
  &.open-enter:before {
    transition: opacity 300ms ${constants.easing.easeOutQuad};
  }

  &.open-enter-active,
  &.open-appear-active {
    transition: opacity 300ms ${constants.easing.easeOutQuad},
      transform 300ms ${constants.easing.easeOutQuad};
    opacity: 1;
    ${({ direction }) => {
      switch (direction) {
        case TOP:
          return "transform: translate(0, -10px);";
        case BOTTOM:
          return "transform: translate(0, 10px);";
        case LEFT:
          return "transform: translate(-10px, 0);";
        case RIGHT:
        default:
          return "transform: translate(10px, 0);";
      }
    }};
  }

  &.open-enter-active:before,
  &.open-appear-active:before {
    opacity: 1;
    ${({ direction, arrowAdjustment }) => {
      switch (direction) {
        case TOP:
          return `left: calc(50% - ${ARROW_WIDTH /
            2}px + ${arrowAdjustment}); bottom: -13px; transform: translateY(-50%) rotate(45deg);`;
        case BOTTOM:
          return `left: calc(50% - ${ARROW_WIDTH /
            2}px + ${arrowAdjustment}); top: -1px; transform: translateY(-50%) rotate(-135deg);`;
        case LEFT:
          return `top: 10px; right: -${ARROW_WIDTH / 2 +
            1}px; transform: translateY(0%) rotate(-45deg);`;
        case RIGHT:
          return `top: 10px; left: -${ARROW_WIDTH / 2 +
            1}px; transform: translateY(0%) rotate(135deg);`;
        default:
          return `left: calc(50% - ${ARROW_WIDTH /
            2}px); top: -1px; transform: translateY(-50%) rotate(-135deg);`;
      }
    }};
  }

  &.open-enter-done,
  &.open-appear-done {
    opacity: 1;
    ${({ direction }) => {
      switch (direction) {
        case TOP:
          return "transform: translate(0, -10px);";
        case BOTTOM:
          return "transform: translate(0, 10px);";
        case LEFT:
          return "transform: translate(-10px, 0);";
        case RIGHT:
        default:
          return "transform: translate(10px, 0);";
      }
    }};
  }

  &.open-enter-done:before,
  &.open-appear-done:before {
    opacity: 1;
    ${({ direction, arrowAdjustment }) => {
      switch (direction) {
        case TOP:
          return `left: calc(50% - ${ARROW_WIDTH /
            2}px + ${arrowAdjustment}); bottom: -13px; transform: translateY(-50%) rotate(45deg);`;
        case BOTTOM:
          return `left: calc(50% - ${ARROW_WIDTH /
            2}px + ${arrowAdjustment}); top: -1px; transform: translateY(-50%) rotate(-135deg);`;
        case LEFT:
          return `top: 10px; right: -${ARROW_WIDTH / 2 +
            1}px; transform: translateY(0%) rotate(-45deg);`;
        case RIGHT:
          return `top: 10px; left: -${ARROW_WIDTH / 2 +
            1}px; transform: translateY(0%) rotate(135deg);`;
        default:
          return `left: calc(50% - ${ARROW_WIDTH /
            2}px); top: -1px; transform: translateY(-50%) rotate(-135deg);`;
      }
    }};
  }

  &.open-exit {
    transition: opacity 100ms ${constants.easing.easeOutQuad};
    opacity: 1;
    ${({ direction }) => {
      switch (direction) {
        case TOP:
          return "transform: translate(0, -10px);";
        case BOTTOM:
          return "transform: translate(0, 10px);";
        case LEFT:
          return "transform: translate(-10px, 0);";
        case RIGHT:
        default:
          return "transform: translate(10px, 0);";
      }
    }};
  }

  &.open-exit:before {
    transition: opacity 100ms ${constants.easing.easeOutQuad};
    opacity: 1;
    ${({ direction, arrowAdjustment }) => {
      switch (direction) {
        case TOP:
          return `left: calc(50% - ${ARROW_WIDTH /
            2}px + ${arrowAdjustment}); bottom: -13px; transform: translateY(-50%) rotate(45deg);`;
        case BOTTOM:
          return `left: calc(50% - ${ARROW_WIDTH /
            2}px + ${arrowAdjustment}); top: -1px; transform: translateY(-50%) rotate(-135deg);`;
        case LEFT:
          return `top: 10px; right: -${ARROW_WIDTH / 2 +
            1}px; transform: translateY(0%) rotate(-45deg);`;
        case RIGHT:
          return `top: 10px; left: -${ARROW_WIDTH / 2 +
            1}px; transform: translateY(0%) rotate(135deg);`;
        default:
          return `left: calc(50% - ${ARROW_WIDTH /
            2}px); top: -1px; transform: translateY(-50%) rotate(-135deg);`;
      }
    }};
  }

  &.open-exit-active,
  &.open-exit-done,
  &.open-exit-active:before,
  &.open-exit-done:before {
    opacity: 0;
  }
`;

export const SeatDataStyled = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${({ size }) => (size === LARGE ? spacing.moderate : spacing.cozy)};
  border-bottom: ${({ isLast }) =>
    isLast ? `1px solid ${themes.global.gray02}` : "none"};
  line-height: 1;
`;

export const SeatDataColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  text-align: center;

  &:first-child {
    text-align: left;
  }

  &:last-child {
    text-align: right;
  }
`;

export const ColumnHeading = styled.div`
  font-size: ${({ size }) =>
    size === LARGE ? typography.size.hecto : typography.size.uno};
  text-transform: uppercase;
  margin-bottom: ${({ size }) =>
    size === LARGE ? spacing.cozy : spacing.cozy};
  color: ${themes.global.gray02};
`;

export const ColumnText = styled.div`
  font-size: ${({ size }) =>
    size === LARGE ? typography.size.kilo : typography.size.hecto};
  font-weight: ${typography.weight.semiBold};
  color: ${({ variant }) =>
    variant === DARK ? themes.global.white.base : themes.global.gray01};
`;

export const AdditionalData = styled.div`
  padding: ${({ size }) => (size === LARGE ? spacing.moderate : spacing.cozy)};
  font-size: ${({ size }) =>
    size === LARGE ? typography.size.hecto : typography.size.uno};
  color: ${({ variant }) =>
    variant === DARK ? themes.global.white.base : themes.global.gray01};
`;
