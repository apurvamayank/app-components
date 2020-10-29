import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import * as PropTypes from 'prop-types';

const DEF_RADIUS = 54;

export const RadialProgress = ({
  isDisabled,
  color,
  percentage,
  radius,
  className,
}) => {
  const progress = percentage / 100;
  const rad = radius || DEF_RADIUS;
  const circumference = 2 * Math.PI * rad;
  const dashoffset = circumference - progress * circumference;
  const outerRadius = rad + 6;

  return (
    <Svg
      width={2 * outerRadius}
      height={2 * outerRadius}
      viewBox={`0 0 ${2 * outerRadius} ${2 * outerRadius}`}
      className={className}
      isDisabled={isDisabled}
    >
      <Group>
        <Meter cx={outerRadius} cy={outerRadius} r={rad} strokeWidth={2} />
        <Value
          cx={outerRadius}
          cy={outerRadius}
          r={rad}
          strokeWidth={5}
          dashoffset={dashoffset}
          circumference={circumference}
          color={color}
        />
      </Group>
      <Text y="50%" x="50%" dy={2}>
        {`${percentage}%`}
      </Text>
    </Svg>
  );
};

RadialProgress.propTypes = {
  color: PropTypes.string,
  percentage: PropTypes.number.isRequired,
  radius: PropTypes.number,
  className: PropTypes.string,
  isDisabled: PropTypes.bool,
};

const animate = (dashoffset) => keyframes`
  to {
    stroke-dashoffset: ${dashoffset};
  }
`;

const Svg = styled.svg`
  ${({ isDisabled }) =>
    isDisabled &&
    `
    pointer-events: none;
    opacity: 0.5;
  `};
`;

const Group = styled.g`
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
`;

const Circle = styled.circle`
  stroke-width: ${({ strokeWidth }) => `${strokeWidth}px`};
  fill: none;
`;

const Meter = styled(Circle)`
  stroke: ${({ theme }) => theme.p200};
`;

const Value = styled(Circle)`
  stroke: ${({ theme, color }) => color || theme.a400};
  stroke-linecap: round;
  stroke-dashoffset: ${({ circumference }) => circumference};
  stroke-dasharray: ${({ circumference }) => circumference};

  ${({ dashoffset }) => css`
    animation: ${animate(dashoffset)} 1s linear forwards;
  `};
`;

const Text = styled.text`
  ${({ theme }) => theme.text.sm};
  fill: ${({ theme }) => theme.p300};
  text-anchor: middle;
  alignment-baseline: middle;
`;
