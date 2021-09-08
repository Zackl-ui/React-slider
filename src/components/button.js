// Dependencies
import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
// Config
import COLORS from "../config/colors";

const LeButton = styled.button`
  appearance: none;
  border-radius: 6px;
  display: inline-block;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;
  -webkit-touch-callout: none;
  line-height: 50px;
  font-weight: 900;
  height: 50px;
  min-width: 150px;
  padding: 0 20px;
  border: 0;
  color: white;
  background: ${(props) => {
    if (props.color === "mauve") {
      return COLORS.mauve;
    }
    if (props.color === "pink") {
      return COLORS.pink;
    }
  }};
`;

export default function Button({
  color,
  children,
  isLoading,
  className,
  href,
  disabled,
  to,
  type = "button",
  onClick,
  ...props
}) {
  const CustomTag = (() => {
    if (to) return Link;
    if (href) return "a";
    return "button";
  })();
  const ButtonWithCustomTag = LeButton.withComponent(CustomTag);
  return (
    <ButtonWithCustomTag
      to={to}
      href={href}
      color={color}
      disabled={disabled || isLoading}
      type={href || to ? false.toString() : type}
      onClick={onClick}
      {...props}
    >
      {children}
    </ButtonWithCustomTag>
  );
}

Button.propTypes = {
  color: PropTypes.string.isRequired,
};

// WEBPACK FOOTER //
// ./src/components/Button.js
