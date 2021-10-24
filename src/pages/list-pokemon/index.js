/** @jsxRuntime classic */
/** @jsx jsx */
// eslint-disable-next-line
import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import Container from "../../components/container";
import Card from "../../components/card";
import Loader from "../../components/loader";
import { jsx, css } from "@emotion/react";
import Pagination from "../../components/pagination";
import { getMyPokemon } from "../../utils/myPokemon";
import ErrorState from "../../components/errorState";

const GET_POKEMONS = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      count
      next
      previous
      status
      message
      results {
        url
        id
        name
        image
        artwork
        dreamworld
      }
    }
  }
`;

const Index = () => {
  const [page, setPage] = useState(1);
  const dataOwnedPokemon = getMyPokemon();
  const length = 8;
  const {
    loading,
    error,
    data: dataAllPokemon,
  } = useQuery(GET_POKEMONS, {
    variables: {
      limit: length,
      offset: (page - 1) * length,
    },
  });

  let total = 0;
  if (dataAllPokemon) {
    total = Math.ceil(dataAllPokemon.pokemons.count / length);
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
        <ErrorState />
      ) : (
        <>
          <h2
            css={css`
              text-align: center;
              font-weight: bold;
            `}
          >
            Pokédex
          </h2>
          <div
            css={css`
              width: 100%;
              display: grid;
              margin: 20px auto;
              grid-template-columns: repeat(auto-fit, minmax(250px, 400px));
              grid-gap: 20px;
              font-size: 1.5rem;
              @media (min-width: 960px) {
                grid-template-columns: repeat(auto-fit, minmax(250px, 260px));
                font-size: 20px;
              }
            `}
          >
            {dataAllPokemon.pokemons.results.map((item, idx) => {
              let totalOwned = dataOwnedPokemon.owned_pokemon?.filter(
                (pokemon) => pokemon.name === item.name
              ).length;

              return (
                <Card
                  key={idx}
                  id={item.id}
                  image={item.image}
                  name={item.name}
                  artwork={item.artwork}
                  dreamworld={item.dreamworld}
                  total={totalOwned}
                />
              );
            })}
          </div>
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
              length={length}
              total={total}
              togglePage={setPage}
            />
          </div>
        </>
      )}
    </Container>
  );
};

export default Index;
