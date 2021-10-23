/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import Container from "../components/container";
import { jsx, css } from "@emotion/react";
import Loader from "../components/loader";
import { color } from "../utils/constant";
import UUID from "../utils/uuid";
import Probability from "../utils/randomProbability";
import BackgroundImg from "../assets/img/background-white.png";
import Button from "../components/button";
import { toastSuccess, toastError } from "../components/toast";
import Modal from "../components/modal";

const GET_POKEMON = gql`
  query pokemon($name: String!) {
    pokemon(name: $name) {
      abilities {
        ability {
          name
        }
      }
      base_experience
      forms {
        name
      }
      height
      held_items {
        item {
          name
        }
      }
      id
      is_default
      location_area_encounters
      moves {
        move {
          name
        }
      }
      name
      order
      species {
        name
      }
      sprites {
        back_default
        back_female
        back_shiny
        back_shiny_female
        front_default
        front_female
        front_shiny
        front_shiny_female
      }
      stats {
        effort
        base_stat
        stat {
          name
        }
      }
      types {
        type {
          name
        }
      }
      weight
      status
      message
    }
  }
`;

const Index = ({ location }) => {
  const [catching, setCatching] = useState(false);
  const [isErrorImg, setIsErrorImg] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const image_pokemon = location.state?.image_pokemon;
  let url = window.location.href.split("/");
  const id = url.pop() || url.pop();
  const { loading, error, data } = useQuery(GET_POKEMON, {
    variables: {
      name: id,
    },
  });

  let pokemon, pokemon_name;
  if (data) {
    pokemon = data.pokemon;
    pokemon_name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    console.log("Data: ", data);
  }

  const catchPokemon = async (name) => {
    setCatching(true);
    let isSuccess = Probability() === 0;
    console.log(isSuccess, name);
    await delay(2000);
    setCatching(false);
    if (isSuccess) {
      toastError("Pokemon Escape, ");
    } else {
      toastSuccess(`All right! ${name} was caught!, give name your Pokemon!`);
      setModalShow(true);
    }
  };

  const delay = async (ms = 1000) => {
    return await new Promise((resolve) => setTimeout(resolve, ms));
  };

  const Type = ({ title }) => {
    return (
      <div
        css={css`
          background-color: ${color[title]};
          border-radius: 12px;
          width: 100%;
          max-width: 100px;
          color: white;
          text-align: center;
          font-size: 1rem;
          padding: 10px;
        `}
      >
        {title.charAt(0).toUpperCase() + title.slice(1)}
      </div>
    );
  };

  return (
    <Container>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        title="Give Pokemon Nickname"
      >
        Beri Nama Pokemon
      </Modal>
      {loading ? (
        <div
          css={css`
            height: calc(100vh - 80px);
            display: flex;
            justify-content: center;
            align-items: center;
          `}
        >
          <Loader />
        </div>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          <div
            css={css`
              display: flex;
              justify-content: center;
              align-items: end;
              font-size: 20px;
              font-weight: 600;
              text-align: center;
              margin-right: 20px;
              @media (max-width: 960px) {
                font-size: 1.5rem;
              }
            `}
          >
            <span
              css={css`
                margin-right: 20px;
              `}
            >
              {pokemon_name}
            </span>
            <span
              css={css`
                color: #919191;
                font-weight: 500;
              `}
            >
              #{("000" + pokemon.id.toString()).slice(-4)}
            </span>
          </div>
          <div
            css={css`
              width: 100%;
              display: grid;
              margin: 20px auto;
              grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
              grid-gap: 20px;
              @media (max-width: 960px) {
                font-size: 1.5rem;
              }
            `}
          >
            <div
              css={css`
                ${!isErrorImg
                  ? `background-image: url("${BackgroundImg}");`
                  : ""}
                background-color: ${color[pokemon.types[0].type.name]};
                border-radius: 12px;
                margin-bottom: 1rem;
              `}
            >
              <img
                width="100%"
                src={image_pokemon}
                alt={pokemon_name}
                onError={(e) => {
                  setIsErrorImg(true);
                  e.target.onerror = null;
                  e.target.src = BackgroundImg;
                  e.target.style = `object-fit: contain;`;
                }}
              />
            </div>
            <div>
              <Button
                onClick={() => catchPokemon(pokemon_name)}
                disabled={catching}
              >
                Catch Pokemon {pokemon_name}
              </Button>
              <div
                css={css`
                  display: flex;
                  flex-direction: column;
                  margin-top: 20px;
                `}
              >
                <span>Type</span>
                <div
                  css={css`
                    width: 100%;
                    display: grid;
                    margin: 10px auto;
                    grid-template-columns: repeat(
                      auto-fit,
                      minmax(60px, 100px)
                    );
                    grid-gap: 20px;
                  `}
                >
                  {pokemon.types.map((item, idx) => (
                    <Type title={item.type.name} key={idx} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Container>
  );
};

export default Index;
