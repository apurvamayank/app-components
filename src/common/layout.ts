import styled from 'styled-components';

const gutter = 10; // half the size

export const Container = styled.div<{ padding?: number }>`
  display: flex;
  width: 100%;
  flex-direction: column;
  box-sizing: border-box;
  padding: ${({padding}) =>
  padding ? `${padding - gutter}px` : `${30 - gutter}px`};
`;

export const Row = styled.div<{ align?: string, justify?: string }>`
  display: flex;
  width: 100%;
  align-items: ${({align}) => align || 'flex-start'};
  justify-content: ${({justify}) => justify || 'flex-start'};
  min-height: 40px;
  flex-wrap: wrap;
`;

type colTypes = {
  direction?: string,
  align?: string,
  justify?: string,
  size?: number,
  padding?: number,
  offset?: number,
  noPadding?: boolean,
  xl?: number,
  lg?: number,
  md?: number,
  sm?: number,
  xs?: number
};

export const Col = styled.div<colTypes>`
  display: flex;
  flex-direction: ${({direction}) => direction || 'column'};
  align-items: ${({align}) => align || 'flex-start'};
  justify-content: ${({justify}) => justify || 'center'};
  flex: ${({size}) => size || 1};
  max-width: ${({size}) => size ? `calc(100% * ${size / 12})` : '100%'};
  padding: ${({padding}) => padding || gutter}px;
  min-height: 40px;
  box-sizing: border-box;

  ${({offset}) =>
  offset && `
      margin-left: calc(100% * ${offset / 12});
    `};

  ${({noPadding}) =>
  noPadding && `
      padding: 0;
    `};

  @media only screen and (min-width: 1200px) {
    ${({xl}) =>
  xl && `
        flex: none;
        flex-basis: ${(100 / 12) * xl}%;
        max-width: ${(100 / 12) * xl}%;
      `};
  }

  @media only screen and (max-width: 1200px) {
    ${({lg}) =>
  lg && `
        flex: none;
        flex-basis: ${(100 / 12) * lg}%;
        max-width: ${(100 / 12) * lg}%;
      `};
  }

  @media only screen and (max-width: 992px) {
    ${({md}) =>
  md && `
        flex: none;
        flex-basis: ${(100 / 12) * md}%;
        max-width: ${(100 / 12) * md}%;
      `};
  }

  @media only screen and (max-width: 768px) {
    ${({sm}) =>
  sm && `
        flex: none;
        flex-basis: ${(100 / 12) * sm}%;
        max-width: ${(100 / 12) * sm}%;
      `};
  }

  @media only screen and (max-width: 576px) {
    ${({xs}) =>
  xs && `
        flex: none;
        flex-basis: ${(100 / 12) * xs}%;
        max-width: ${(100 / 12) * xs}%;
      `};
  }
`;
