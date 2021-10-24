/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import BackgroundImg from "../../assets/img/background.png";

const Index = (props) => {
  const [isErrorImg, setIsErrorImg] = useState(false);
  const [isLoadImg, setIsLoadImg] = useState(false);
  const history = useHistory();
  const { id, total = 0 } = props;

  let number = ("000" + id.toString()).slice(-4);

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
        ${!isErrorImg
          ? `background-image: url("${BackgroundImg}");
          background-size: contain;
          background-repeat: no-repeat;`
          : ""}
      `}
      onClick={() =>
        history.push(`/detail-pokemon/${props.name}`, {
          image_pokemon: props.image,
        })
      }
      data-testid="clickToDetail"
    >
      <div
        css={css`
          border: 2px solid #dfdfdf;
          border-radius: 12px;
          width: 100%;
          height: 100%;
        `}
      >
        <div
          css={css`
            width: 170px;
            height: 170px;
          `}
        >
          <img
            css={css`
              ${isLoadImg ? "" : "visibility: hidden;"}
            `}
            width="170px"
            height="170px"
            src={props.image}
            alt={props.name}
            onLoad={() => setIsLoadImg(true)}
            onError={(e) => {
              setIsErrorImg(true);
              e.target.onerror = null;
              e.target.src = BackgroundImg;
              e.target.style = `object-fit: contain;`;
            }}
          />
        </div>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            padding: 12px;
          `}
        >
          <div
            css={css`
              text-align: center;
              font-weight: 600;
              font-size: 1.25rem;
              @media (min-width: 960px) {
                font-size: 1rem;
              }
            `}
          >
            <span>
              {props.name.charAt(0).toUpperCase() + props.name.slice(1)}
            </span>
          </div>
          <div
            css={css`
              color: #919191;
              font-size: 0.75rem;
              text-align: center;
            `}
          >
            <span>Total Owned: {total}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
