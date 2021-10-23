/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import Container from "../components/container";
import Card from "../components/card";
import { Row, Col } from "react-bootstrap";
import Loader from "../components/loader";
import { jsx, css } from "@emotion/react";
import Pagination from "../components/pagination";

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
  const localStorageKey = process.env.REACT_APP_LOCAL_KEY;
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

  let dataOwnedPokemon = [];
  if (typeof Storage !== "undefined") {
    if (localStorage.getItem(localStorageKey) === null) {
      localStorage.setItem(
        localStorageKey,
        JSON.stringify({ owned_pokemon: [] })
      );
    }
    dataOwnedPokemon = JSON.parse(localStorage.getItem(localStorageKey));
  } else {
    alert("Browser yang Anda gunakan tidak mendukung Web Storage");
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
          <Row>
            {dataAllPokemon.pokemons.results.map((item, idx) => {
              let totalOwned = dataOwnedPokemon.owned_pokemon?.filter(
                (pokemon) => pokemon.name === item.name
              ).length;

              return (
                <Col sm={12} md={6} lg={4} xl={3}>
                  <Card
                    key={idx}
                    id={item.id}
                    image={item.image}
                    name={item.name}
                    artwork={item.artwork}
                    dreamworld={item.dreamworld}
                    total={totalOwned}
                  />
                </Col>
              );
            })}
          </Row>
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
