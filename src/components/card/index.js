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
        ${!isErrorImg ? `background-image: url("${BackgroundImg}");` : ""}
      `}
      onClick={() =>
        history.push(`/detail-pokemon/${props.name}`, {
          image_pokemon: props.artwork,
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
        <img
          css={css`
            ${isLoadImg ? "" : "visibility: hidden;"}
          `}
          width="100%"
          src={props.artwork}
          alt={props.name}
          onLoad={() => setIsLoadImg(true)}
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
              display: flex;
              justify-content: space-between;
              color: #919191;
              font-size: 1rem;
              @media (min-width: 960px) {
                font-size: 12px;
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
              font-weight: 600;
              font-size: 1.5rem;
              @media (min-width: 960px) {
                font-size: 20px;
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
