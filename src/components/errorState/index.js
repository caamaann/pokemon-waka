/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import Pikachu from "../../assets/img/pikachu.png";

const Index = () => {
  return (
    <div
      css={css`
        height: calc(100vh - 100px);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      `}
    >
      <img
        css={css`
          max-width: 250px;
        `}
        width="100%"
        src={Pikachu}
        alt="pikachu"
      />
      <span
        css={css`
          text-align: center;
          font-weight: bold;
        `}
      >
        Sorry, I think something wrong
      </span>
    </div>
  );
};

export default Index;
