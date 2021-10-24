/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import MenuItems from "./menuItem";
import NavLink from "../navLink";
import { useClickaway } from "../hooks/ClickawayHooks";

const Navbar = () => {
  const history = useHistory();
  const navBarRef = useRef();
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  useClickaway(navBarRef, () => {
    setClicked(false);
  });

  return (
    <nav
      // className="NavbarItems"
      ref={navBarRef}
      css={css`
        background: linear-gradient(
          90deg,
          rgba(0, 0, 0, 1) 0%,
          rgba(2, 2, 70, 1) 100%
        );
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.2rem;
        margin-bottom: 1rem;
        position: relative;
        @media (min-width: 960px) {
          position: static;
        }
      `}
    >
      <h4
        // className="navbar-logo"
        css={css`
          color: #fff;
          justify-self: start;
          margin-left: 20px;
          cursor: pointer;
          transition: all 0.5s ease;
          &:hover {
            color: #d5a94e;
          }
        `}
        onClick={() => {
          history.push("/");
          setClicked(false);
        }}
      >
        Pokemon <span className="material-icons">catching_pokemon</span>
      </h4>
      <div
        // className="menu-icon"
        css={css`
          color: #fff;
          cursor: pointer;
          display: block;
          position: absolute;
          top: -6px;
          left: 45px;
          transform: translate(-100%, 60%);
          font-size: 1.8rem;
          transition: all 0.5s ease;
          &:hover {
            color: #d5a94e;
          }
          @media (min-width: 960px) {
            display: none;
          }
        `}
        onClick={() => handleClick()}
      >
        <span className="material-icons">{clicked ? "close" : "menu"}</span>
      </div>
      <ul
        // className="nav-menu active"
        css={css`
          display: grid;
          grid-template-columns: repeat(1, auto);
          list-style: none;
          text-align: center;
          width: 70vw;
          justify-content: end;
          margin-right: 2rem;
          transition: all 0.5s ease;
          @media (max-width: 960px) {
            background: linear-gradient(
              90deg,
              rgba(0, 0, 0, 1) 0%,
              rgba(2, 2, 70, 1) 100%
            );
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100px;
            position: absolute;
            top: 80px;
            opacity: 1;
            ${clicked
              ? `
              left: 0;
              z-index: 1`
              : "left: -100%;"}
          }
        `}
      >
        {MenuItems.map((item, idx) => {
          return (
            <li key={idx} onClick={() => setClicked(false)}>
              <NavLink
                // className="navlinks"
                to={item.url}
              >
                {item.title}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
