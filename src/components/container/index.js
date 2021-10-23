/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";

const Index = (props) => {
  const breakpoints = [576, 768, 992, 1200, 1400];

  const mq = breakpoints.map((bp) => `@media (min-width: ${bp}px)`);

  return (
    <div
      css={css`
        margin-left: auto;
        margin-right: auto;
        padding-left: 12px;
        padding-right: 12px;
        ${mq[0]} {
          max-width: 540px;
        }
        ${mq[1]} {
          max-width: 720px;
        }
        ${mq[2]} {
          max-width: 960px;
        }
        ${mq[3]} {
          max-width: 1140px;
        }
        ${mq[4]} {
          max-width: 1320px;
        }
      `}
      {...props}
    />
  );
};

export default Index;
