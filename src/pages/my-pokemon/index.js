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
            You haven't caught any pokemon, try to catch one
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
          <Row>
            {dataOwnedPokemon.map((item, idx) => {
              return (
                <Col sm={12} md={6} lg={4} xl={3}>
                  <Card
                    key={idx}
                    data={item}
                    disabled={isRelease}
                    onClick={() => releasePokemon(item)}
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
