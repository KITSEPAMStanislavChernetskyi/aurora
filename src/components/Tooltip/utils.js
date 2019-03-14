import { ARROW_WIDTH } from "../constants";

const getWindowDimensions = () => {
  const {
    clientWidth,
    clientHeight
  } = global.window.document.documentElement;

  const scrollTop = Math.max(
    global.window.pageYOffset,
    global.document.documentElement.scrollTop,
    global.document.body.scrollTop
  );

  return {
    windowScroll: scrollTop,
    windowWidth: clientWidth,
    windowHeight: clientHeight
  };
};

export const getDimensionsFromEvent = (e, parent) => {
  const {
    y: elTop,
    height: elHeight,
    x: elLeft,
    width: elWidth
  } = e.target.getBoundingClientRect();
  const {
    y: offsetTop = 0,
    height: clientHeight = 100000,
    x: offsetLeft = 0,
    width: clientWidth = 100000
  } =
    parent && parent.getBoundingClientRect
      ? parent.getBoundingClientRect()
      : {};

  return {
    elTop,
    elLeft,
    elWidth,
    elBottom: elTop + elHeight,
    elRight: elLeft + elWidth,
    offsetTop,
    clientHeight,
    offsetLeft,
    clientWidth,
    elHorizontalCenter: elLeft + elWidth / 2,
    elVerticalCenter: elTop + elHeight / 2,
    ...getWindowDimensions()
  };
}

export const getArrowAdjustmentFromPosition = ({ coords, position }) => {
  const reqCenter = position.elHorizontalCenter;
  const currentCenter = coords.x + coords.width / 2;
  const mostLeft = coords.x + ARROW_WIDTH / 2;
  const mostRight = coords.x + coords.width + ARROW_WIDTH / 2;
  const center = Math.min(Math.max(mostLeft, reqCenter), mostRight);

  return center - currentCenter;
};