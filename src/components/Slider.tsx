import React from "react";
import ReactSlider, { Settings } from "react-slick";
import styled from "@emotion/styled";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { css } from "@emotion/react";

const CommonButton = css`
  padding: 16px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  z-index: 1;
  top: 50%;
  background-color: #fff;
  &:before {
    content: initial;
  }
  > svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 10px;
    height: 10px;
    color: #222;
  }
`;

const PrevButton = styled.button`
  ${CommonButton}
  transform: translate(-50%, -50%);
`;

const NextButton = styled.button`
  ${CommonButton}
  transform: translate(50%, -50%);
`;

const DEFAULT_SETTINGS: Settings = {
  dots: false,
  arrows: true,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 5,
  swipe: true,
  draggable: true,
  prevArrow: (
    <PrevButton>
      <MdArrowBackIos />
    </PrevButton>
  ),
  nextArrow: (
    <NextButton>
      <MdArrowForwardIos />
    </NextButton>
  ),
};

interface Props {
  settings?: Settings;
  children: any;
}

const Slider: React.FC<Props> = ({ settings = DEFAULT_SETTINGS, children }) => {
  return <ReactSlider {...settings}>{children}</ReactSlider>;
};

export default Slider;
