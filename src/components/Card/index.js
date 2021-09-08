// Packages
import React, { Component } from 'react';
import styled from 'styled-components';
// Config
import COLORS from '../../config/colors';

const revealSpeed = 0.3;
const throwOutSpeed = 0.2;

const CareCard = styled.article`
  padding: 11.186440678%;
  width: 100%;
  height: 100%;
  min-height: 300px;
  border-radius: 10px;
  position: absolute;
  top: 0;
  left: 0;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.2), 1px 1px 1px rgba(0, 0, 0, 0.2);
  color: ${(props) => (props.next ? 'rgba(255,255,255,0)' : COLORS.white)};
  display: flex;
  flex-direction: column;
  opacity: ${(props) => {
    if (props.active) return 1;
    if (props.next) return 1;
    return 0;
  }};
  z-index: ${(props) => {
    if (props.active) return 10;
    if (props.previous) return 20;
  }};
  transform: ${(props) => (props.next ? 'rotate(11deg) !important' : null)};
  background: ${(props) => (props.next ? 'rgba(255,255,255,0.2) !important' : null)};
  transition: ${(props) => {
    if (props.dragging) return null;
    if (props.active)
      return `transform ${revealSpeed}s ease, background ${revealSpeed}s ease, color ${revealSpeed}s ease`;
    if (props.next) return `transform ${revealSpeed}s ease ${revealSpeed}s, opacity 0.1s ease ${revealSpeed}s`;
    if (props.previous)
      return `background 0.1s ease ${throwOutSpeed}s, transform ${throwOutSpeed}s ease, opacity .1s ease ${throwOutSpeed}s`;
  }};
  cursor: grab;
  &:active {
    cursor: grabbing;
  }
`;

const Title = styled.h1`
  margin-top: 30px;
  line-height: 1.3em;
  @media (max-width: 499px) {
    font-size: 9vw;
  }
  @media (min-width: 500px) {
    font-size: 50px;
  }
`;

const Text = styled.p`
  line-height: 1.5em;
  margin: 70px 0 0;
  @media (min-width: 500px) {
    font-size: 18px;
  }
`;

class Card extends Component {
  render() {
    const { color, title, text, active, next, dragging, previous } = this.props;
    return (
      <CareCard active={active} next={next} dragging={dragging} previous={previous} style={{ background: color }}>
        <Title>{title}</Title>
        <Text>{text}</Text>
      </CareCard>
    );
  }
}

export default Card;
