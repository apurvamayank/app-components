import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

// components
import Bullet from './Bullet';

const Stepper = ({ steps = [], currentStep, selectStep }) => {
  return (
    <Container>
      {steps.map(step => (
        <Step
          key={step.id}
          disabled={!step.enabled}
          selected={step.id === currentStep}
          onClick={() => selectStep(step.id)}
        >
          <StyledBullet
            selected={step.id === currentStep}
            disabled={!step.enabled}
          />
          <Label disabled={!step.enabled}>{step.label}</Label>
        </Step>
      ))}
    </Container>
  );
};

Stepper.proptypes = {};

export default Stepper;

export const stepShape = PropTypes.shape({
  id: PropTypes.number,
  enabled: PropTypes.bool,
  label: PropTypes.string
});

Stepper.propTypes = {
  steps: PropTypes.arrayOf(stepShape),
  currentStep: PropTypes.number,
  selectStep: PropTypes.func
};

const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const Step = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 300ms;
  cursor: pointer;

  &:not(:last-child):after {
    content: '';
    width: 30px;
    height: 1px;
    background: ${({ theme }) => theme.p200};
    margin: 0 30px 0 5px;
  }

  ${({ selected }) =>
    selected &&
    css`
      //font-weight: bold;
      color: ${({ theme }) => theme.p600};
    `};

  ${({ disabled }) =>
    disabled &&
    css`
      pointer-events: none;
    `};
`;

const Label = styled.span`
  margin: 0 5px;
  ${({ theme }) => theme.text.p};
  line-height: 12px;

  ${({ disabled }) =>
    disabled &&
    css`
      pointer-events: none;
      color: ${({ theme }) => theme.p200};
    `};
`;

const StyledBullet = styled(Bullet)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: -20px;
`;
