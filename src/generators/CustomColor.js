import React, { Component } from 'react';
import styled from 'styled-components';
import { SketchPicker } from 'react-color';
import ClickOut from '../components/base/ClickOut';

const Color = ({ label, color, onClick }) => (
  <ColorCard onClick={onClick}>
    <ColorPreview color={color}>
      <PaintIcon />
    </ColorPreview>

    <ColorCardInfo>
      <Info>{label}</Info>
      <Info>{color}</Info>
    </ColorCardInfo>
  </ColorCard>
);

class CustomColor extends Component {
  state = {
    active: null
  };

  handleChangeComplete = (id, color) => {
    const { updateTheme } = this.props;
    const { rgb } = color;

    updateTheme({
      [id]: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`
    });
  };

  handleClick = () => {
    if (this.state.active) {
      this.setState({ active: null });
    }
  };

  render() {
    const { open, theme, light } = this.props;
    const { active } = this.state;
    const colors = [
      'a100',
      'a200',
      'a300',
      'a350',
      'a400',
      'a500',
      'a600',
      'a700',
      'a800'
    ];

    return (
      <ClickOut onClick={this.handleClick}>
        <Strip active={open} light={light}>
          {colors.map(color => (
            <ColorContainer key={color}>
              <Color
                label={color}
                color={theme[color]}
                onClick={() => this.setState({ active: color })}
              />
              <ColorPop>
                {color === active && (
                  <SketchPicker
                    color={theme[color]}
                    onChangeComplete={data =>
                      this.handleChangeComplete(color, data)
                    }
                  />
                )}
              </ColorPop>
            </ColorContainer>
          ))}
        </Strip>
      </ClickOut>
    );
  }
}

export default CustomColor;

const Strip = styled.div`
  width: 100vw;
  height: 200px;
  background: ${({ light }) => (light ? '#fff' : '#272727')};
  transition: margin 500ms;
  margin-top: ${({ active }) => (active ? 0 : -200)}px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ColorContainer = styled.div`
  width: calc(100vw / 9 - 30px);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const ColorPop = styled.div`
  position: absolute;
  top: calc(100% + 20px);
  left: 50%;
  z-index: 10;
  transform: translateX(-50%);
`;

const ColorCard = styled.div`
  width: 100%;
  max-width: 120px;
  cursor: pointer;
  height: 140px;
  position: relative;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: all 300ms;

  &:hover {
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  }

  &:last-child {
    margin-right: 0;
  }
`;

const ColorPreview = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 90px;
  background: ${({ color }) => color};
  display: flex;
  align-items: center;
  justify-content: center;

  div {
    opacity: 0;
  }

  &:hover {
    div {
      opacity: 1;
    }
  }
`;

const ColorCardInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background: ${({ theme }) => theme.p0};
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  justify-content: center;
  padding: 10px;
`;

const Info = styled.div`
  font-size: 12px;
  margin: 2px 0;
  text-transform: uppercase;
  color: ${({ theme }) => theme.p600};
`;

const PaintIcon = styled.div`
  width: 25px;
  height: 32px;
  background: url(${require('../docs/assets/paint.svg')}) no-repeat;
  background-size: contain;
  transition: all 300ms;
`;