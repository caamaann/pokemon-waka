/** @jsxRuntime classic */
/** @jsx jsx */
// eslint-disable-next-line
import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import Container from "../../components/container";
import { jsx, css } from "@emotion/react";
import Loader from "../../components/loader";
import { color } from "../../utils/constant";
import Probability from "../../utils/randomProbability";
import BackgroundImg from "../../assets/img/background-white.png";
import Button from "../../components/button";
import { toastSuccess, toastError } from "../../components/toast";
import Modal from "./modalNickname";
import { Table } from "react-bootstrap";
import Pagination from "../../components/pagination";
import ErrorState from "../../components/errorState";
import { Accordion } from "react-bootstrap";

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
  const [page, setPage] = useState(1);
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
    pokemon = {
      ...data.pokemon,
      image_pokemon: image_pokemon,
    };
    pokemon_name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    console.log("Data: ", data);
  }

  const catchPokemon = async (name) => {
    setCatching(true);
    let isFailed = Probability();
    await delay();
    if (isFailed) {
      toastError("Pokemon Escape, Try Again!");
    } else {
      toastSuccess(`All right! ${name} was caught!, give name your Pokemon!`);
      setModalShow(true);
    }
    setCatching(false);
  };

  const delay = (delayInms = 2000) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(2);
      }, delayInms);
    });
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

  const Ability = ({ title }) => {
    return (
      <div
        css={css`
          border-radius: 12px;
          border: 2px solid #dfdfdf;
          width: 100%;
          text-align: center;
          font-size: 1rem;
          padding: 10px;
        `}
      >
        {title.charAt(0).toUpperCase() + title.slice(1)}
      </div>
    );
  };

  const Move = ({ title }) => {
    return (
      <div
        css={css`
          border-radius: 12px;
          border: 2px solid #dfdfdf;
          width: fit-content;
          text-align: center;
          font-size: 1rem;
          padding: 10px;
          margin: 10px;
        `}
      >
        {title.charAt(0).toUpperCase() + title.slice(1)}
      </div>
    );
  };

  function customData(data) {
    let newData = data.map((item, idx) => {
      return {
        no: idx + 1,
        move: item.move.name,
      };
    });
    return newData;
  }

  const createTable = (datas) => {
    let pageSize = 10;
    let newData = customData(datas);
    return (
      <>
        <Table
          css={css`
            font-size: 1rem;
          `}
        >
          <thead>
            <tr>
              <th>No</th>
              <th>Move</th>
            </tr>
          </thead>
          <tbody>
            {newData
              .slice((page - 1) * pageSize, page * pageSize)
              .map((data, idx) => (
                <tr key={idx}>
                  <td>{data.no}</td>
                  <td>{data.move}</td>
                </tr>
              ))}
          </tbody>
        </Table>
        <div
          css={css`
            margin-top: 20px;
            margin-bottom: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
          `}
        >
          <Pagination
            page={page}
            length={pageSize}
            total={Math.ceil(datas.length / pageSize)}
            togglePage={setPage}
          />
        </div>
      </>
    );
  };

  return (
    <Container>
      <Modal
        show={modalShow}
        toogle={setModalShow}
        title="Give Pokemon Nickname"
        data={pokemon}
      />
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
        <ErrorState />
      ) : (
        <>
          <div
            css={css`
              font-weight: 600;
              text-align: center;
              margin-right: 20px;
              font-size: 1.5rem;
              @media (min-width: 960px) {
                font-size: 20px;
              }
            `}
          >
            <span
              css={css`
                color: #919191;
                font-weight: 500;
              `}
            >
              #{("000" + pokemon.id.toString()).slice(-4)}
            </span>
            <br />
            <span>{pokemon_name}</span>
          </div>
          <div
            css={css`
              width: 100%;
              display: flex;
              flex-direction: column;
              justify-content: center;
              font-size: 1.5rem;
              @media (min-width: 960px) {
                font-size: 20px;
              }
            `}
          >
            <div
              css={css`
                ${!isErrorImg
                  ? `background-image: url("${BackgroundImg}");
                  background-size: contain;
                  background-repeat: no-repeat;
                  background-position: right;`
                  : ""}
                background-color: ${color[pokemon.types[0].type.name]};
                border-radius: 12px;
                margin-bottom: 1rem;
                height: fit-content;
                width: 100%;
                text-align: center;
                margin-top: 20px;
              `}
            >
              <img
                width="250px"
                height="250px"
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
              <div
                css={css`
                  display: flex;
                  justify-content: space-around;
                  margin-top: 20px;
                  padding: 0 20px;
                  @media (min-width: 960px) {
                    padding: 0 35%;
                  }
                `}
              >
                <div
                  css={css`
                    text-align: center;
                  `}
                >
                  <span>Height</span>
                  <p
                    css={css`
                      font-size: 1.25rem;
                      @media (min-width: 960px) {
                        font-size: 1rem;
                      }
                    `}
                  >
                    {pokemon.height / 10} m
                  </p>
                </div>
                <div
                  css={css`
                    text-align: center;
                  `}
                >
                  <span>Weight</span>
                  <p
                    css={css`
                      font-size: 1.25rem;
                      @media (min-width: 960px) {
                        font-size: 1rem;
                      }
                    `}
                  >
                    {pokemon.weight / 10} kg
                  </p>
                </div>
              </div>
              <div
                css={css`
                  @media (min-width: 960px) {
                    display: flex;
                    justify-content: space-around;
                  }
                `}
              >
                <div
                  css={css`
                    display: flex;
                    flex-direction: column;
                    text-align: center;
                    margin-top: 20px;
                    width: 100%;
                    @media (min-width: 960px) {
                      border-right: 1px solid #dfdfdf;
                    }
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
                      justify-content: center;
                    `}
                  >
                    {pokemon.types.map((item, idx) => (
                      <Type title={item.type.name} key={idx} />
                    ))}
                  </div>
                </div>
                <div
                  css={css`
                    display: flex;
                    flex-direction: column;
                    text-align: center;
                    margin-top: 20px;
                    width: 100%;
                  `}
                >
                  <span>Ability</span>
                  <div
                    css={css`
                      width: 100%;
                      display: grid;
                      margin: 10px auto;
                      grid-template-columns: repeat(
                        auto-fit,
                        minmax(60px, 150px)
                      );
                      grid-gap: 20px;
                      justify-content: center;
                    `}
                  >
                    {pokemon.abilities.map((item, idx) => (
                      <Ability title={item.ability.name} key={idx} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div
              css={css`
                display: flex;
                flex-direction: column;
                margin-top: 20px;
                margin-bottom: 30px;
                text-align: center;
              `}
            >
              <span>Moves</span>
              <div
                css={css`
                  width: 100%;
                `}
              >
                <Accordion>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Show Moves</Accordion.Header>
                    <Accordion.Body
                      css={css`
                        text-align: left;
                        font-size: 1rem;
                      `}
                    >
                      {pokemon.moves.map((item) => (
                        <p
                          css={css`
                            border-bottom: 1px solid #dfdfdf;
                          `}
                        >
                          {item.move.name}
                        </p>
                      ))}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            </div>
          </div>
          <div
            css={css`
              position: sticky;
              bottom: 20px;
              text-align: center;
              z-index: 99;
            `}
          >
            <Button
              onClick={() => catchPokemon(pokemon_name)}
              disabled={catching}
              data-testid="btnCatchPokemon"
            >
              {catching ? " Catching..." : `Catch ${pokemon_name}`}
            </Button>
          </div>
        </>
      )}
    </Container>
  );
};

export default Index;
