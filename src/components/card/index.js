/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import Loader from "../loader";
import BackgroundImg from "../../assets/img/background.png";

const Index = (props) => {
  const history = useHistory();
  const { id, total = 0 } = props;

  let number = ("000" + id.toString()).slice(-4);
  let background = "#f2f2f2";

  return (
    <div
      css={css`
        margin-top: 12px;
        margin-bottom: 12px;
        cursor: pointer;
        transition: transform 0.5s;
        &:hover {
          transform: scale(1.05);
        }
        border-radius: 10px;
        background-image: url("${BackgroundImg}");
      `}
      onClick={() =>
        history.push(`/${props.name}`, { image_pokemon: props.artwork })
      }
    >
      <div
        css={css`
          border: 1px solid #f2f2f2;
          border-radius: 12px;
          width: 100%;
          height: 100%;
        `}
      >
        <img width="100%" src={props.artwork} alt={props.name} />
        <div
          css={css`
            display: flex;
            flex-direction: column;
            padding: 12px;
          `}
        >
          <div
            css={css`
              display: flex;
              justify-content: space-between;
              color: #919191;
              font-size: 12px;
              @media (max-width: 960px) {
                font-size: 1rem;
              }
            `}
          >
            <span>#{number}</span>
            <span
              css={css`
                text-align: right;
              `}
            >
              Total Owned
            </span>
          </div>
          <div
            css={css`
              display: flex;
              justify-content: space-between;
              font-size: 20px;
              font-weight: 600;
              @media (max-width: 960px) {
                font-size: 1.5rem;
              }
            `}
          >
            <span>
              {props.name.charAt(0).toUpperCase() + props.name.slice(1)}
            </span>
            <span
              css={css`
                text-align: right;
              `}
            >
              {total}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
