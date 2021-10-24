/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";

const Button = ({ leftIcon, rightIcon, children, type, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type || "button"}
      css={css`
        background: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 1) 0%,
          rgba(2, 2, 70, 1) 100%
        );
        position: relative;
        border-radius: 30px;
        display: inline-block;
        cursor: pointer;
        color: #ffffff;
        font-size: 1rem;
        padding: 12px 20px;
        transition: all 0.5s ease;
        border: 1px solid transparent;
        font-family: "Poppins", sans-serif;
        height: 60px;
        &:hover,
        &:disabled {
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.95) 0%,
            rgba(2, 2, 70, 0.95) 100%
          );
        }
      `}
    >
      {leftIcon && (
        <span
          className="material-icons"
          css={css`
            ${children ? "margin-right: 10px;" : ""}
          `}
        >
          {leftIcon}
        </span>
      )}
      {disabled && (
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
      )}
      {children}
      {rightIcon && (
        <span
          className="material-icons"
          css={css`
            margin-left: 10px;
          `}
        >
          {rightIcon}
        </span>
      )}
    </button>
  );
};

export default Button;
