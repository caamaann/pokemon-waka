/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { useState } from "react";
import BackgroundImg from "../../../assets/img/background.png";
import { Button } from "react-bootstrap";

const Index = ({ data, onClick, disabled }) => {
  const [isErrorImg, setIsErrorImg] = useState(false);
  return (
    <div
      css={css`
        margin-top: 12px;
        margin-bottom: 12px;
        transition: transform 0.5s;
        &:hover {
          transform: scale(1.05);
        }
        border-radius: 10px;
        ${!isErrorImg ? `background-image: url("${BackgroundImg}");` : ""}
      `}
    >
      <div
        css={css`
          border: 2px solid #dfdfdf;
          border-radius: 12px;
          width: 100%;
          height: 100%;
        `}
      >
        <img
          width="100%"
          src={data.image_pokemon}
          alt={data.nickname}
          onError={(e) => {
            setIsErrorImg(true);
            e.target.onerror = null;
            e.target.src = BackgroundImg;
            e.target.style = `object-fit: contain;`;
          }}
        />
        <div
          css={css`
            display: flex;
            flex-direction: column;
            padding: 12px;
          `}
        >
          <div
            css={css`
              display: grid;
              grid-template-columns: 1fr 1fr;
              grid-gap: 20px;
              justify-content: space-between;
              color: #919191;
              font-size: 1rem;
              @media (min-width: 960px) {
                font-size: 12px;
              }
            `}
          >
            <span>Name</span>
            <span
              css={css`
                text-align: right;
              `}
            >
              Nickname
            </span>
          </div>
          <div
            css={css`
              display: grid;
              grid-template-columns: 1fr 1fr;
              grid-gap: 20px;
              justify-content: space-between;
              font-weight: 600;
              margin-bottom: 12px;
              font-size: 1.5rem;
              @media (min-width: 960px) {
                font-size: 20px;
              }
            `}
          >
            <span>
              {data.name.charAt(0).toUpperCase() + data.name.slice(1)}
            </span>
            <span
              css={css`
                text-align: right;
              `}
            >
              {data.nickname}
            </span>
          </div>
          <div>
            <Button
              type="button"
              variant="outline-danger"
              onClick={onClick}
              css={css`
                width: 100%;
              `}
              disabled={disabled}
              data-testid="btnReleasePokemon"
            >
              Release
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
