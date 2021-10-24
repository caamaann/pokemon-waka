/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { Link } from "react-router-dom";

const NavLink = (props) => {
  let isActive = window.location.pathname === props.to;
  return (
    <Link
      css={css`
        color: white;
        text-decoration: none;
        transition: all 0.5s ease;
        &:hover {
          color: #d5a94e;
          border-bottom: 5px solid #d5a94e;
        }
        text-align: center;
        padding: 2rem;
        width: 100%;
        display: table;
        @media (min-width: 960px) {
          padding: 0.5rem 1rem;
          text-align: left;
          width: border-box;
          display: inline;
        }
        ${isActive
          ? `
          color: #d5a94e;
          border-bottom: 5px solid #d5a94e;`
          : "border-bottom: 0px solid transparent;"}
      `}
      {...props}
    >
      {props.children}
    </Link>
  );
};

export default NavLink;
