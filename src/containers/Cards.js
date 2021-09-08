// Packages
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import shuffle from 'lodash.shuffle';
import random from 'lodash.random';
import { Stack, Direction } from 'swing';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import Analytics from 'react-ga';
// Components
import CareCard from '../components/Card';
import Icon from '../components/icon';
// Utils
import { fade } from '../utils/keyframes';
// Data
import CARDS from '../Data/cards.json';
import COLORS from '../Data/colors.json';

const InfoLink = styled(Link)`
  position: fixed;
  top: 5%;
  right: 10%;
  @media (min-width: 1000px) {
    right: 5%;
  }
`;

const CareStack = styled.div`
  width: 78.666666667vw;
  height: 62.686567164vh;
  position: relative;
  max-width: 300px;
  max-height: 360px;
  animation: ${fade} 1s ease;
  position: relative;
  top: -40px;
  @media (max-width: 767px) {
    max-width: 250px;
    max-height: 400px;
    left: -20px;
  }
`;

const Viewport = styled.main`
  overflow: hidden;
  width: 100%;
  height: 100vh;
  position: relative;
  transition: background 0.2s ease;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Instruction = styled.p`
  position: fixed;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255, 255, 255, 0.3);
  animation: ${fade} 1s ease both 0.25s;
  @media (max-width: 1200px) {
    display: none;
  }
`;

const Spacebar = styled(Icon)`
  margin-left: 10px;
  height: 16px;
  vertical-align: middle;
`;

const InfoIcon = styled(Icon)`
  height: 20px;
`;

class Cards extends Component {
  constructor(props, context) {
    super(props, context);
    this.config = {
      throwOutDistance: () => Math.max(window.innerWidth, window.innerHeight),
      throwOutConfidence: () => 1,
      allowedDirections: [Direction.DOWN, Direction.LEFT, Direction.RIGHT, Direction.UP],
    };
    this.cardRefs = new Map();
    this.state = {
      currentCard: CARDS.length - 1,
      currentColors: 0,
      colors: shuffle(COLORS),
      cards: shuffle(CARDS),
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onSpacebar);
    this.stack = Stack(this.config);
    this.cardRefs.forEach((ref, i) => {
      const el = ReactDOM.findDOMNode(this.cardRefs.get(i));
      this.stack.createCard(el);
    });
    this.stack.on('dragstart', () => this.setState({ dragging: true }));
    this.stack.on('dragend', () => this.setState({ dragging: false }));
    this.stack.on('throwout', this.onThrowOut.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onSpacebar);
    this.cardRefs.forEach((ref, i) => {
      const el = ReactDOM.findDOMNode(this.cardRefs.get(i));
      const card = this.stack.getCard(el);
      card.destroy();
    });
  }

  onThrowOut() {
    if (this.state.currentCard === 0) {
      this.setState({ currentCard: this.state.cards.length });
      this.resetDeck();
    }
    const getColor = () => {
      if (this.state.currentColors === this.state.colors.length - 1) return 0;
      return this.state.currentColors + 1;
    };
    this.setState({
      currentCard: this.state.currentCard - 1,
      currentColors: getColor(),
    });
    Analytics.event({
      category: 'Cards',
      action: 'Card swiped',
    });
  }

  onSpacebar = (e) => {
    if (e.keyCode === 32) {
      const el = ReactDOM.findDOMNode(this.cardRefs.get(this.state.currentCard));
      const card = this.stack.getCard(el);
      card && card.throwOut(random(-10, 10), random(-10, 0));
    }
  };

  resetDeck() {
    this.setState({
      resetting: true,
    });
    this.cardRefs.forEach((ref, i) => {
      const el = ReactDOM.findDOMNode(this.cardRefs.get(i));
      const card = this.stack.getCard(el);
      card.throwIn(0, 0);
    });
    this.setState({
      resetting: false,
    });
  }

  render() {
    return (
      <Viewport
        style={{
          background: this.state.colors[this.state.currentColors].background,
        }}
      >
        <CareStack>
          {this.state.cards.map((card, i) => (
            <CareCard
              key={i}
              ref={(c) => this.cardRefs.set(i, c)}
              title={card.title}
              text={card.text}
              color={this.state.colors[this.state.currentColors].card}
              active={i === this.state.currentCard}
              next={i === this.state.currentCard - 1}
              previous={i > this.state.currentCard}
              dragging={(i === this.state.currentCard && this.state.dragging) || this.state.resetting}
            />
          ))}
        </CareStack>
        <Instruction>
          <span>Press space to swipe</span>
        </Instruction>
      </Viewport>
    );
  }
}
export default withRouter(Cards);

// WEBPACK FOOTER //
// ./src/containers/Cards.js
