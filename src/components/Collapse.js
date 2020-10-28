import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import * as PropTypes from 'prop-types';

import { Collapsible } from './Collapsible';

// Assets
import ArrowDown from '../assets/ArrowDown.icon';

export const Collapse = (props) => {
  const [open, setOpen] = useState(false);
  const { children, className, label } = props;

  const toggleOpen = useCallback(() => setOpen((open) => !open), []);

  return (
    <Container className={className}>
      <Header onClick={toggleOpen}>
        <StyledArrow open={open} />
        {label}
      </Header>
      <Collapsible open={open} toggleOpen={toggleOpen}>
        {children}
      </Collapsible>
    </Container>
  );
};

Collapse.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  label: PropTypes.string,
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  width: 100%;
  height: 34px;
  background: ${({ theme }) => theme.p0};
  box-sizing: border-box;
  padding: 0 10px;
  display: flex;
  align-items: center;
  ${({ theme }) => theme.text.smBold};
  line-height: 12px;
  cursor: pointer;
`;

const StyledArrow = styled(ArrowDown)`
  width: 10px;
  height: 10px;
  margin-right: 10px;
  transition: all 300ms;
  transform: rotate(${({ open }) => (open ? '0deg' : '-90deg')});

  * {
    fill: ${({ theme }) => theme.p300};
  }
`;
