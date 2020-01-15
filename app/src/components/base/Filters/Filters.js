import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { uuid } from '../../utils';

// COMPONENTS
import Filter from './Filter';

const emptyState = () => ({
  dimension: [],
  operator: [],
  value: '',
  id: uuid()
});

const FilterOperator = () => (
  <OperatorContainer>
    <OperatorDivider />
    <Operator>AND</Operator>
    <OperatorDivider />
  </OperatorContainer>
);

const FooterInfo = ({ max }) => (
  <Info>
    <InfoIcon />
    There is a max of {max} filters
  </Info>
);

const Filters = ({ dimensions, onChange, min, max }) => {
  const [state, setState] = useState({
    rows: [emptyState()],
    exiting: null
  });

  const addFilter = useCallback(() => {
    setState({
      ...state,
      rows: [
        ...state.rows,
        {
          ...emptyState(),
          id: uuid()
        }
      ]
    });
  }, [state]);

  const handleRemove = useCallback(
    index => {
      if (state.rows.length > min) {
        setState({ ...state, exiting: index });
      } else {
        setState({
          ...state,
          rows: state.rows.map((row, i) => (i === index ? emptyState() : row))
        });
      }
    },
    [min, state]
  );

  const handleFilterChange = useCallback(
    ({ key, value, index }) => {
      setState({
        ...state,
        rows: state.rows.map((row, i) => ({
          ...row,
          [key]: i === index ? value : row[key]
        }))
      });
    },
    [state]
  );

  useEffect(() => {
    if (typeof state.exiting === 'number') {
      setTimeout(() => {
        setState({
          ...state,
          rows: state.rows.filter(
            (_, filterIndex) => filterIndex !== state.exiting
          ),
          exiting: null
        });
      }, 300);
    } else {
      if (onChange) {
        onChange(state.rows);
      }
    }
  }, [onChange, state]);

  return (
    <Container height={74 + (state.rows.length - 1) * 84}>
      {state.rows.map((row, index) => {
        const showOperator = state.rows[index] && state.rows[index - 1];

        return (
          <Column
            animation={state.exiting === index ? 'exit' : 'enter'}
            key={row.id}
            top={index === 0 ? 0 : 42 + (index - 1) * 84}
          >
            {showOperator && <FilterOperator />}

            <Filter
              index={index}
              total={state.rows.length}
              dimensions={dimensions}
              onRemove={handleRemove}
              onChange={handleFilterChange}
              rowData={row}
            />
          </Column>
        );
      })}

      <Footer top={42 + (state.rows.length - 1) * 84}>
        {state.rows.length < max && (
          <AddButton onClick={addFilter}>+ Add Filter</AddButton>
        )}
        {state.rows.length >= max && <FooterInfo max={max} />}
      </Footer>
    </Container>
  );
};

Filters.propTypes = {
  dimensions: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func,
  min: PropTypes.number,
  max: PropTypes.number
};

export default Filters;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  user-select: none;
  position: relative;
  transition: all 300ms;
  height: ${({ height }) => height}px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  transition: all 300ms;
  opacity: ${({ animation }) => (animation === 'exit' ? 0 : 1)};
  position: absolute;
  top: ${({ top }) => top}px;
`;

const Footer = styled.div`
  height: 32px;
  display: flex;
  width: 510px;
  align-items: center;
  justify-content: center;
  position: absolute;
  transition: all 300ms;
  left: 0;
  top: ${({ top }) => top}px;
`;

const AddButton = styled.div`
  color: ${({ theme }) => theme.p600};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 300ms;

  &:hover {
    color: ${({ theme }) => theme.a400};
  }
`;

const Info = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 12px;
  color: ${({ theme }) => theme.p400};
`;

const OperatorContainer = styled.div`
  width: 510px;
  display: flex;
  height: 32px;
  justify-content: center;
  align-items: center;
  margin: 5px 0;
  opacity: 0;
  visibility: hidden;
  animation: 500ms ease-out 0s 1 fade forwards;

  @keyframes fade {
    100% {
      opacity: 1;
      visibility: visible;
    }
  }
`;

const Operator = styled.div`
  color: ${({ theme }) => theme.p600};
  font-size: 12px;
  font-weight: 500;
  margin: 0 5px;
`;

const OperatorDivider = styled.div`
  width: 30px;
  height: 1px;
  background: ${({ theme }) => theme.p200};
`;

const InfoIcon = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: ${({ theme }) => theme.p200};
  margin-right: 5px;
`;
