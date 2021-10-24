/** @jsxRuntime classic */
/** @jsx jsx */
// eslint-disable-next-line
import React, { useState, useEffect } from "react";
import Container from "../../components/container";
import Card from "../../components/card/my-card";
import { Row, Col } from "react-bootstrap";
import { jsx, css } from "@emotion/react";
import Pagination from "../../components/pagination";
import { getMyPokemon, updateMyPokemon } from "../../utils/myPokemon";
import Pikachu from "../../assets/img/pikachu.png";
import { toastSuccess, toastError } from "../../components/toast";

const Index = () => {
  const [isRelease, setIsRelease] = useState(false);
  const [dataOwnedPokemon, setDataOwnedPokemon] = useState([]);
  const [page, setPage] = useState(1);
  const length = 8;

  let total = Math.ceil(dataOwnedPokemon.length / length);

  const releasePokemon = (data) => {
    setIsRelease(true);
    let index = dataOwnedPokemon
      .map(function (e) {
        return e.local_id;
      })
      .indexOf(data.local_id);

    if (index > -1) {
      dataOwnedPokemon.splice(index, 1);
      updateMyPokemon(dataOwnedPokemon);
      getData();
      toastSuccess(`${data.nickname} has been released`);
    } else {
      toastError(`Failed to release pokemon`);
    }
    setIsRelease(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = () => setDataOwnedPokemon(getMyPokemon().owned_pokemon);

  return (
    <Container>
      {dataOwnedPokemon.length === 0 ? (
        <div
          css={css`
            height: calc(100vh - 100px);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          `}
        >
          <img
            css={css`
              max-width: 250px;
            `}
            width="100%"
            src={Pikachu}
            alt="pikachu"
          />
          <span
            css={css`
              text-align: center;
              font-weight: bold;
            `}
          >
            You haven't caught any pokemon, <br />
            Try to catch one!
          </span>
        </div>
      ) : (
        <>
          <h2
            css={css`
              text-align: center;
              font-weight: bold;
            `}
          >
            My Pokémon List
          </h2>
          <div
            css={css`
              width: 100%;
              display: grid;
              margin: 10px auto;
              grid-template-columns: repeat(auto-fit, minmax(120px, 170px));
              justify-content: center;
              grid-gap: 10px;
              font-size: 1.5rem;
              @media (min-width: 960px) {
                justify-content: center;
                font-size: 20px;
              }
            `}
          >
            {dataOwnedPokemon
              // .slice((page - 1) * length, page * length)
              .map((item, idx) => {
                return (
                  <Card
                    key={idx}
                    data={item}
                    disabled={isRelease}
                    onClick={() => releasePokemon(item)}
                  />
                );
              })}
          </div>
        </>
      )}
    </Container>
  );
};

export default Index;
