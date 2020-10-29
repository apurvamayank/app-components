import React from 'react';
import styled, { css } from 'styled-components';
import * as PropTypes from 'prop-types';

// icons
import SearchIcon from '../../assets/SearchThin.icon';

const SelectSearch = (props) => (
  <Container className="menu-search-container">
    <Input
      placeholder={props.searchPlaceholder || 'Search'}
      onChange={props.onChange}
      value={props.value}
      small={props.small}
      large={props.large}
      onFocus={props.toggleFocus}
      onBlur={props.toggleFocus}
      onKeyDown={props.onKeyDown}
      onKeyUp={props.onKeyUp}
      className="menu-search-input"
    />
    <StyledSearchIcon className="menu-search-icon" />
  </Container>
);

SelectSearch.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  searchPlaceholder: PropTypes.string,
  small: PropTypes.bool,
  large: PropTypes.bool,
  toggleFocus: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
};

export default SelectSearch;

const Container = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  width: calc(100% - 20px);
  margin: 10px 10px 0 10px;
  height: ${({ theme }) => theme.size.MEDIUM};
  border-radius: 2px;
  border: 1px solid ${({ theme }) => theme.p200};
  box-sizing: border-box;
  padding: 0 30px 0 10px;
  font-size: 14px;
  font-weight: 300;
  background: ${({ theme }) => theme.p0};

  ${({ theme, small }) =>
    small &&
    css`
      height: ${theme.size.SMALL};
      ${theme.text.sm};
    `};

  ${({ theme, large }) =>
    large &&
    css`
      height: ${theme.size.LARGE};
    `};

  color: ${({ theme }) => theme.p500};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.a400};
  }

  &::placeholder {
    color: ${({ theme }) => theme.p300};
  }
`;

const StyledSearchIcon = styled(SearchIcon)`
  width: 18px;
  height: 18px;
  position: absolute;
  right: 15px;
  top: calc(50% - 4px);
`;
