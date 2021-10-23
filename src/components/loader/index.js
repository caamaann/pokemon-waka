/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import Img from "../../assets/img/loading.png";

const Index = (props) => {
  return (
    <div
    //   css={css`
    //   `}
    >
      <img
        css={css`
          height: 10vh;
          pointer-events: none;
          @media (prefers-reduced-motion: no-preference) {
            animation: App-logo-spin infinite 1s linear;
          }
          @keyframes App-logo-spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}
        src={Img}
        alt="loader"
      />
    </div>
  );
};

export default Index;
