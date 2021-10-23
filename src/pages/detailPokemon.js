/** @jsxRuntime classic */
/** @jsx jsx */
import React from "react";
import { useQuery, gql } from "@apollo/client";
import Container from "../components/container";
import { jsx, css } from "@emotion/react";
import Loader from "../components/loader";
import { color } from "../utils/constant";
import UUID from "../utils/uuid";
import BackgroundImg from "../assets/img/background-white.png";

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
  const image_pokemon = location.state.image_pokemon;
  let url = window.location.href.split("/");
  const id = url.pop() || url.pop();
  const { loading, error, data } = useQuery(GET_POKEMON, {
    variables: {
      name: id,
    },
  });

  const uuidv4 = () => {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  };

  let pokemon;
  if (data) {
    pokemon = data.pokemon;
    console.log("Data: ", data);
  }

  return (
    <Container>
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
          <div>
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
                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
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
                background-image: url("${BackgroundImg}");
                background-color: ${color[pokemon.types[0].type.name]};
                border-radius: 12px;
              `}
            >
              <img width="100%" src={image_pokemon} alt={pokemon.name} />
            </div>
          </div>
        </>
      )}
    </Container>
  );
};

export default Index;
