import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { find, orderBy, debounce } from 'lodash/fp';

// components
import ClickOut from '../ClickOut';
import SelectHeader from './SelectHeader';
import SelectMenu from './SelectMenu';
import { optionsType } from './Select.types';
import InlineSearch from './InlineSearch';

export default class Select extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    options: optionsType,
    values: optionsType,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    sortBy: PropTypes.string,
    sortable: PropTypes.bool,
    multi: PropTypes.bool,
    disabled: PropTypes.bool,
    searchable: PropTypes.bool,
    keepOpen: PropTypes.bool,
    searchBy: PropTypes.arrayOf(PropTypes.string),
    loading: PropTypes.bool,
    debounce: PropTypes.number,
    headerRenderer: PropTypes.func,
    optionRenderer: PropTypes.func,
    optionLabelRenderer: PropTypes.func,
    placeholderRenderer: PropTypes.func,
    menuRenderer: PropTypes.func,
    maxItems: PropTypes.number,
    closeOnSelect: PropTypes.bool,
    sortDirection: PropTypes.oneOf(['asc', 'desc']),
    searchPlaceholder: PropTypes.string,
    error: PropTypes.bool,
    small: PropTypes.bool,
    large: PropTypes.bool,
    inlineSearch: PropTypes.bool,
    maxTags: PropTypes.number
  };

  state = {
    open: false,
    searchTerm: '',
    localValues: this.props.values
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.localValues === prevState.localValues &&
      this.props.values !== prevProps.values
    ) {
      this.setState({ localValues: this.props.values });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  checkString = (searchTerm, str) =>
    str
      .toString()
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

  filterOptions() {
    const { searchTerm } = this.state;
    const { searchBy, options, sortable, sortDirection, sortBy } = this.props;

    let sorted = sortable ? orderBy(sortDirection, sortBy, options) : options;

    return sorted.filter(option =>
      searchBy.some(key => this.checkString(searchTerm, option[key]))
    );
  }

  toggleOpen = () => {
    const { keepOpen, inlineSearch } = this.props;
    const { open } = this.state;

    if (keepOpen && open) {
      return;
    }

    this.setState(
      prevState => ({
        open: !prevState.open,
        searchTerm: !prevState.open ? '' : prevState.searchTerm
      }),
      () => {
        const { open } = this.state;
        const { onOpen, onClose } = this.props;

        if (open) {
          window.addEventListener('keydown', this.handleKeyDown);

          if (onOpen) {
            onOpen();
          }
        }

        if (!open) {
          window.removeEventListener('keydown', this.handleKeyDown);

          if (inlineSearch) {
            setTimeout(() => {
              this.setState({ searchTerm: '' });
            }, 300);
          }

          if (onClose) {
            onClose();
          }
        }
      }
    );
  };

  handleKeyDown = ({ key }) => {
    switch (key) {
      case 'Escape':
        this.toggleOpen();
        break;

      default:
        break;
    }
  };

  handleClickOut = () => {
    const { open } = this.state;

    if (open) {
      this.toggleOpen();
    }
  };

  onSelect = option => () => {
    const { multi } = this.props;
    const { localValues } = this.state;

    let result = [];
    if (!multi) {
      result = [option];
    } else {
      if (find(op => op.value === option.value, localValues)) {
        result = localValues.filter(op => op.value !== option.value);
      } else {
        result = [...localValues, option];
      }
    }

    this.applyChanges(result);
  };

  selectAll = () => {
    const { options } = this.props;
    const { localValues } = this.state;

    let result = [];
    if (!localValues.length || localValues.length > options.length) {
      result = [...options];
    }

    this.applyChanges(result);
  };

  onSearch = e => this.setState({ searchTerm: e.target.value });

  debouncedOnChange = debounce(this.props.debounce, values =>
    this.props.onChange(values)
  );

  applyChanges(values) {
    const { closeOnSelect, multi } = this.props;

    this.setState({ localValues: values }, () => {
      this.debouncedOnChange(values);

      if (!multi && closeOnSelect) {
        this.toggleOpen();
      }
    });
  }

  render() {
    const {
      options,
      className,
      disabled,
      searchable,
      placeholder,
      headerRenderer,
      optionRenderer,
      optionLabelRenderer,
      multi,
      placeholderRenderer,
      menuRenderer,
      loading,
      maxItems,
      searchPlaceholder,
      error,
      small,
      large,
      inlineSearch,
      maxTags
    } = this.props;
    const { open, searchTerm, localValues } = this.state;
    const filteredOptions = this.filterOptions();

    return (
      <ClickOut onClick={this.handleClickOut} className={className}>
        <Container disabled={disabled} className={className}>
          {!inlineSearch && (
            <SelectHeader
              open={open}
              placeholder={placeholder}
              values={localValues}
              options={options}
              headerRenderer={headerRenderer}
              toggleOpen={this.toggleOpen}
              placeholderRenderer={placeholderRenderer}
              loading={loading}
              error={error}
              small={small}
              large={large}
            />
          )}

          {inlineSearch && (
            <InlineSearch
              values={localValues}
              open={open}
              placeholder={placeholder}
              toggleOpen={this.toggleOpen}
              error={error}
              small={small}
              large={large}
              onSearch={this.onSearch}
              value={searchTerm}
              maxTags={maxTags}
              onSelect={this.onSelect}
            />
          )}

          <SelectMenu
            open={open}
            searchable={searchable}
            onSearch={this.onSearch}
            options={filteredOptions}
            total={options.length}
            values={localValues}
            multi={multi}
            selectAll={this.selectAll}
            optionRenderer={optionRenderer}
            onSelect={this.onSelect}
            menuRenderer={menuRenderer}
            searchTerm={searchTerm}
            maxItems={maxItems}
            searchPlaceholder={searchPlaceholder}
            optionLabelRenderer={optionLabelRenderer}
            small={small}
            large={large}
            inlineSearch={inlineSearch}
          />
        </Container>
      </ClickOut>
    );
  }
}

Select.defaultProps = {
  maxItems: 5,
  sortable: true,
  multi: false,
  searchable: false,
  sortBy: 'label',
  searchBy: ['label'],
  sortDirection: 'asc',
  closeOnSelect: true, // apply only for single select
  debounce: 0,
  maxTags: 999
};

const Container = styled.div`
  position: relative;

  * {
    line-height: normal;
  }

  ${({ disabled }) =>
    disabled &&
    css`
      pointer-events: none;
      opacity: 0.5;
    `};
`;