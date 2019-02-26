import React from 'react';
import styled, { css } from 'styled-components';
import { isEmpty } from 'lodash/fp';
import PropTypes from 'prop-types';

// components
import { Label } from './Select.common';
import SelectSpinner from './SelectSpinner';
import { optionsType } from './Select.types';

// icons
import ArrowDown from '../../icons/ArrowDown.icon';

const SelectHeader = props => {
  const {
    open,
    placeholder,
    values,
    options,
    headerRenderer,
    toggleOpen,
    placeholderRenderer,
    loading,
    error,
    small,
    large
  } = props;

  if (headerRenderer) {
    return headerRenderer({ values, placeholder, options, open, toggleOpen });
  }

  let label = placeholder;

  if (values.length <= options.length) {
    label = `${values.length} selected`;
  }

  if (values.length === 1) {
    const option = values[0];

    label = option.label;
  }

  if (options.length === values.length && values.length > 1) {
    label = `Select all (${options.length})`;
  }

  if (!values.length) {
    label = placeholder;
  }

  if (placeholderRenderer) {
    const customLabel = placeholderRenderer({
      label,
      allSelected: options.length === values.length && values.length > 1,
      selected: values.length,
      total: options.length
    });

    if (!isEmpty(customLabel)) {
      label = customLabel;
    }
  }

  return (
    <Container
      onClick={toggleOpen}
      open={open}
      className="header"
      title={label}
      error={error}
      small={small}
      large={large}
    >
      <LabelWrapper>
        <Label>{label}</Label>
      </LabelWrapper>

      {!loading && <Arrow rotation={open ? '180deg' : '0deg'} />}
      {loading && <SelectSpinner size="12px" color="#09a0ff" />}
    </Container>
  );
};

SelectHeader.propTypes = {
  open: PropTypes.bool,
  placeholder: PropTypes.string,
  values: optionsType,
  options: optionsType,
  headerRenderer: PropTypes.func,
  toggleOpen: PropTypes.func,
  placeholderRenderer: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  small: PropTypes.bool,
  large: PropTypes.bool
};

export default SelectHeader;

const LabelWrapper = styled.div`
  width: calc(100% - 15px);
`;

const Container = styled.div`
  cursor: pointer;
  width: 170px;
  height: ${({ theme }) => theme.size.MEDIUM};
  box-sizing: border-box;
  padding: 0 10px;
  border: 1px solid ${({ error, theme }) => (error ? theme.r400 : theme.p200)};
  background: ${({ theme }) => theme.p0};
  border-radius: 2px;
  display: flex;
  align-items: center;
  position: relative;
  transition: all 300ms;
  user-select: none;

  ${({ open, theme, error }) =>
    open &&
    css`
      border-color: ${error ? theme.r400 : theme.a400};
    `};

  ${({ small, theme }) =>
    small &&
    css`
      height: ${theme.size.SMALL};
      ${theme.text.sm};
    `};

  ${({ large, theme }) =>
    large &&
    css`
      height: ${theme.size.LARGE};
    `};
`;

export const Arrow = styled(ArrowDown)`
  width: 10px;
  height: 10px;
  transform: rotate(${({ rotation }) => rotation});
  transition: all 300ms;
  * {
    fill: ${({ theme }) => theme.p600};
  }
`;