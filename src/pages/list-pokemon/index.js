/** @jsxRuntime classic */
/** @jsx jsx */
// eslint-disable-next-line
import React, { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import Container from "../../components/container";
import Card from "../../components/card";
import Loader from "../../components/loader";
import { jsx, css } from "@emotion/react";
import Pagination from "../../components/pagination";
import { getMyPokemon } from "../../utils/myPokemon";
import ErrorState from "../../components/errorState";
import { Button } from "react-bootstrap";

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
  const [listPokemon, setListPokemon] = useState([]);
  const dataOwnedPokemon = getMyPokemon();
  const length = 12;
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
    // setListPokemon([...listPokemon, ...dataAllPokemon.pokemons.results]);
  }

  useEffect(() => {
    if (dataAllPokemon?.pokemons?.results) {
      setListPokemon([...listPokemon, ...dataAllPokemon.pokemons.results]);
    }
  }, [dataAllPokemon?.pokemons?.results]);

  return (
    <Container>
      {loading && page === 1 && (
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
      )}
      {error && <ErrorState />}
      {listPokemon.length > 0 && (
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
              margin: 10px auto;
              grid-template-columns: repeat(auto-fit, minmax(120px, 170px));
              justify-content: space-around;
              grid-gap: 10px;
              font-size: 1.5rem;
              @media (min-width: 960px) {
                font-size: 20px;
              }
            `}
          >
            {listPokemon.map((item, idx) => {
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
            <Button
              type="button"
              variant="primary"
              onClick={() => {
                setPage(page + 1);
              }}
              disabled={loading}
              data-testid="btnLoadMore"
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>{" "}
                  Loading
                </>
              ) : (
                "Load More"
              )}
            </Button>
          </div>
        </>
      )}
    </Container>
  );
};

export default Index;
